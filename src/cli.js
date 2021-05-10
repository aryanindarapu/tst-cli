import arg from 'arg'
import inquirer from 'inquirer'
import { tstCli } from './main'

/* Some of the code below was taken from a Twilio guide on making a NodeJS 
*  Command Line Interface. None of this code, however, directly affects the 
*  hosted trie data structure. The link for the guide is below:
*  https://www.twilio.com/blog/how-to-build-a-cli-with-node-js
*/

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--install': Boolean,
            '-i': '--install',
        },
        {
            argv: rawArgs.slice(2),
        }
    )

    return {
        funcCall: args._[0],
        funcArg: args._[1],
        runInstall: args['--install'] || false,
    };
}

async function promptForMissingOptions(options) {
    const defaultCall = 'display';
    const defaultArg = undefined
    if (options.skipPrompts) {
        return {
            ...options,
            funcCall: options.funcCall || defaultCall,
            funcArg: options.funcArg || defaultArg
        }
    }

    const questions = [];
    if (!options.funcCall) {
        questions.push({
            type: 'list',
            name: 'funcCall',
            message: 'Please choose which operation to execute on the trie:',
            choices: ['add', 'delete', 'clear', 'search', 'autocomplete', 'display'],
            default: defaultCall,
        })
    }

    if (!options.funcCall) {
        questions.push({
            type: 'message',
            name: 'funcArg',
            message: 'Please type the key you would like to associate with the operation (if operation is display or clear, leave blank):',
            default: '',
        })
    }

    const answers = await inquirer.prompt(questions)
    return {
        ...options,
        funcCall: options.funcCall || answers.funcCall,
        funcArg: options.funcArg || answers.funcArg
    };
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    await tstCli(options);
}
