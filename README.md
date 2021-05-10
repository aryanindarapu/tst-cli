##### Slingshot Fellowship Submission - Aryan Indarapu
# Ternary Search Tree
tst-cli is a CLI tool that allows users to interact with a globally hosted Ternary Search Tree.

## Installation
    $ npm install -g @aryind/tst-cli

## Usage
tst-cli supports six different operations on the Ternary Search Tree. Each command takes a different number of arguments, and can be executed in a single-line command or through prompts.

The following table shows the available operations on the ternary search tree:

| Command (operation) | Argument (argument) | Function                                                                      |
|---------------------|---------------------|-------------------------------------------------------------------------------|
| add                 | `key`               | Adds `key` to the global trie                                                 |
| delete              | `key`               | Deletes `key` from the global trie                                            |
| search              | `key`               | Prints `true` if `key` exists in the global trie. Otherwise, prints `false`   |
| autocomplete        | `key`               | Prints a list of possible keys from the global trie based on the prefix `key` |
| display             | None                | Prints a list of all keys from the global trie                                |
| clear               | None                | Clears all keys from the global trie                                          |

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
NOTE: To check the global state, run the previous commmand on one client and run `tst-cli display` on a different client. These will output the same lists.