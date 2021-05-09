##### Slingshot Fellowship Submission - Aryan Indarapu
# Ternary Search Tree
tst-cli is a CLI tool that allows users to interact with a globally hosted Ternary Search Tree.

## Installation
    $ npm install -g @aryind/tst-cli

## Usage
tst-cli supports five different operations on the Ternary Search Tree. Each command takes a different number of arguments, and can be executed in a single-line command or through prompts.

### Single-Line Command
The general command is as follows:
    $ tst-cli command arg

The `add` command would look like this:
    $ tst-cli add examplekey

And the `display` command would look like this:
    $ tst-cli display

### Prompted Command
tst-cli also has a prompt guided command interface. To start, type `tst-cli` into the command line. Then, select the operation that needs to be performed. 
![tst-cli menu](https://imgur.com/0bUApSu.png)

Finally, type the key that is associated with the operation. 
![tst-cli arg](https://imgur.com/O56Ec4v.png)

If the operation selected was `display`, hit the enter key and leave the prompt blank.
![tst-cli no arg](https://imgur.com/vJRiOtY.png)


| Command (command) | Argument (arg) | Function                                                                      |
|-------------------|----------------|-------------------------------------------------------------------------------|
| add               | `key`          | Adds `key` to the global trie                                                 |
| delete            | `key`          | Deletes `key` from the global trie                                            |
| search            | `key`          | Prints `true` if `key` exists in the global trie. Otherwise, prints `false`   |
| autocomplete      | `key`          | Prints a list of possible keys from the global trie based on the prefix `key` |
| display           | None           | Prints a list of all keys from the global trie                                |
