import FileOps from '../FileOps/FileOps';
import { INumberMap, newMapWithEntry, getKeys } from '../Misc/ObjectMaps';
import RootState, { getStatementsState, getFunctionsState } from '../RootState';
import { StatementState, StatementType, Functions } from '../Statements';
import Target from 'common/Compiler/Target';
import { Type } from '../Types';
import { BuiltInFunctionDefState, UserFunctionDefState, getAllFuncDefs } from '../Statements/Functions';


class Python
{
	sourceLines: string[] = [];
	scopeDepth: number = 0;
	readonly spacesPerIndent: number = 4;

	startScope()
	{
		++this.scopeDepth;
	}

	endScope()
	{
		--this.scopeDepth;
	}

	addLine(line: string)
	{
		const indent = ' '.repeat(this.spacesPerIndent * this.scopeDepth);
		this.sourceLines.push(indent + line);
	}

	addBreak()
	{
		this.sourceLines.push('');
	}

	getSource()
	{
		return this.sourceLines.join('\n');
	}
}

function compile(state: RootState)
{
	var hasErrors = false; // Good old optimism
	var source = new Python();

	// At the top level, everything is a function (until there are type definitions)
	// Compile each one
	const functionsState = getFunctionsState(state);
	let functionDefs = getAllFuncDefs(functionsState);

	// TODO: For now, the only user function is the main function which has all the statements.
	// Add it artificially
	const statementsState = getStatementsState(state);
	const allStatements = StatementState.getAllStatements(statementsState);
	const statementIds = getKeys(allStatements);
	const mainDef = Functions.newUserFunctionDefState(functionsState.nextFunctionCallId,
	                                                  "main",
	                                                  Type.Void,
	                                                  [],
	                                                  statementIds);
	functionDefs = newMapWithEntry(functionDefs, functionsState.nextFunctionCallId, mainDef);

	for (const id in functionDefs)
	{
		if(!compileFunctionDef(source, functionDefs[id], statementsState, functionsState))
		{
			hasErrors = true;
		}
	}

	if (hasErrors)
	{
		console.log("please fix known errors and try compiling again.");
	}
	else
	{
		// Add the entry point of the program
		source.addBreak();
		source.addLine('if __name__ == "__main__":');
		source.startScope();
		source.addLine('main()');
		source.endScope();
		
		FileOps.writeSourceFile(source.getSource(), 'py');
	}

	return !hasErrors;
}

function compileFunctionDef(source: Python,
                            functionDef: Functions.AnyFunctionDefState,
                            statementsState: StatementState.StatementsState,
                            functionsState: Functions.FunctionsState)
{
	let hasErrors = false;

	if (functionDef.isBuiltIn)
	{
		// Some python built-ins don't need to be imported
		if (functionDef.source)
		{
			source.addLine(`from ${functionDef.source} import ${functionDef.builtInName}`);
		}
	}
	// the explicit '== false' is necessary for typescript to differentiate it from other falsey values,
	// which wouldn't ensure that functionDef is of type UserFunctionDefState
	else if (functionDef.isBuiltIn == false)
	{
		source.addBreak();

		const args = Functions.Arguments.getArgumentNames(functionDef.argumentDefs).join(', ');
		const defineLine = `def ${functionDef.name}(${functionDef.argumentDefs}):`;
		source.addLine(defineLine);
		source.startScope();

		for (const id of functionDef.statements)
		{
			const statement = StatementState.getStatement(statementsState, id);
			const type = StatementState.getType(statement);
			switch (type)
			{
				case StatementType.FunctionCall:
				{
					const functionCall = Functions.getFuncCall(functionsState, statement.concreteStatementId);
					if(!compileFunctionCall(source, functionCall, functionsState))
					{
						hasErrors = true;
					}
					break;
				}
				default:
					console.log("compile error: invalid statement type - " + type);
					hasErrors = true;
					break;
			}
		}

		source.endScope();
	}
	else
	{
		console.log("compile error: function def " + functionDef.myId + " was not expclicitly set as built-in or not");
		hasErrors = true;
	}

	return !hasErrors;
}

function compileFunctionCall(source: Python,
                             functionCall: Functions.FunctionCallState,
                             functionsState: Functions.FunctionsState)
{
	const functionDef = Functions.getFuncDef(functionsState, functionCall.funcDefId);
	let name = functionDef.name;
	if (functionDef.isBuiltIn)
	{
		name = functionDef.builtInName;
	}
	const argValueToSource = (arg:string, index: number) => compileArgument(arg, functionDef.argumentDefs[index]);
	let args = functionCall.passedArguments.map(argValueToSource);
	var sourceCall = `${name}(${args})`;
	source.addLine(sourceCall);
	return true;
}

function compileArgument(value: string, def: Functions.Arguments.ArgumentDefState)
{
	if (Functions.Arguments.getArgumentType(def) == Type.String)
	{
		// strings need to be quoted
		return `'${value}'`;
	}
	else
	{
		return value;
	}
}

export default { compile };
