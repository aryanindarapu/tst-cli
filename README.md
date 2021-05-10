##### Slingshot Fellowship Submission - Aryan Indarapu
# Ternary Search Tree
tst-cli is a CLI tool that allows users to interact with a globally hosted Ternary Search Tree.

## Installation
    $ npm install -g @aryind/tst-cli

## Usage
tst-cli supports six different operations on the Ternary Search Tree. Each command takes a different number of arguments, and can be executed in a single-line command or through prompts.

The following table shows the available operations on the Ternary Search Tree:

| Command (operation) | Argument (argument) | Function                                                                       |
|---------------------|---------------------|--------------------------------------------------------------------------------|
| add                 | `key`               | Adds `key` to the global trie.                                                 |
| delete              | `key`               | Deletes `key` from the global trie.                                            |
| search              | `key`               | Prints `true` if `key` exists in the global trie. Otherwise, prints `false`.   |
| autocomplete        | `key`               | Prints a list of possible keys from the global trie based on the prefix `key`. |
| display             | None                | Prints a list of all keys from the global trie.                                |
| clear               | None                | Clears all keys from the global trie.                                          |

### Single-Line Command
The general command syntax is as follows:
    
    $ tst-cli <operation> <argument>

Example - Adding the key `apple` to the trie:
    
    $ tst-cli add apple

Example - Displaying all the keys in the trie:
    
    $ tst-cli display

### Prompted Command
tst-cli also has a prompt guided command interface. To start, type `tst-cli` into the command line. Then, select the operation that needs to be performed. 

![tst-cli menu](https://imgur.com/v95MSu2.png)

Finally, type the key that is associated with the operation.

![tst-cli arg](https://imgur.com/tpulbwJ.png)

If the operation selected was `display` or `clear`, hit the enter key and leave the prompt blank.

![tst-cli no arg](https://imgur.com/J3sj2Au.png)

## Testing Suite
tst-cli also offers a testing suite that automatically tests for all the different functionality that this trie offers. A simple command is needed to activate it:

    $ tst-cli suite

This will run through a test of the global trie. 

NOTE: To check the global state, run `tst-cli suite` on one client and run `tst-cli display` on a different client. These will output the same lists.

## Error Handling
tst-cli handles several different errors, and all of them are specified after executing commands.

- Missing arguments
- Too many arguments
- Connection errors with the API
- Test suite failures
- `null` values

## Server Hosting
tst-cli hosts its global ternary search tree on Amazon Web Services. The operations are recieved within an AWS Lambda function that then POSTs data back to the client. The ternary search tree references (from Node to Node) are serialized and saved as an object in Amazon S3. 

The trie also uses an HTTP API Gateway, with the URL:
> https://gw2g3gr01b.execute-api.us-east-2.amazonaws.com/default/tst_function

To test the endpoint with `curl`, use the following command syntax:

    $ curl -d "<jsonData>" -H 'Content-Type: application/json' -X POST https://gw2g3gr01b.execute-api.us-east-2.amazonaws.com/default/tst_function

`jsonData` represents the data in a JSON format that is being passed in, with a format that looks like this:

    {
        'funcCall': '<operation>',
        'funcArg': '<argument>'
    }

If the data is in a JSON file, the command is as follows, where `request.json` is the name of that file:
    
    $ curl -d @request.json -H 'Content-Type: application/json' -X POST https://gw2g3gr01b.execute-api.us-east-2.amazonaws.com/default/tst_function

If, instead, the JSON is entered within the command, the command is as follows:

    $ curl -d "{'funcCall':'<operation>', 'funcArg':'<argument>'}" -H 'Content-Type: application/json' -X POST https://gw2g3gr01b.execute-api.us-east-2.amazonaws.com/default/tst_function

`<operation>` should be one of the six operations (shown in the table above) and `<argument>` should be the key passed to the trie for the operation. If the `<operation>` selected is `display` or `clear`, `<argument>` needs to be `''`.