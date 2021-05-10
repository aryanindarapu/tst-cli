import chalk from 'chalk'
import { testSuite } from './testSuite'
import fetch from 'node-fetch'

export function postData(data) {
    return fetch("https://gw2g3gr01b.execute-api.us-east-2.amazonaws.com/default/tst_function", {
        method: 'POST', 
        mode: 'cors', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(function(res) { 
        return res.json()
    }).then(function(json) {
        return json
    })
}

export async function tstCli(options) {
    const sendRequest = async (jsonData) => {
        switch(options.funcCall) {
            case 'add':  
                postData(jsonData)
                .then(function(res) {
                    console.log('%s Operation completed', chalk.green.bold('DONE'))
                }).catch((error) => {
                    console.log("Connection Issues. Please try again." )
                })
                break
            
            case 'delete':
                postData(jsonData)
                .then(function(res) {
                    if (res['body']) {
                        console.log('%s Operation completed', chalk.green.bold('DONE'))
                    } else {
                        console.log("%s Operation failed: Key doesn't exist", chalk.red.bold("FAILED"))
                    }
                }).catch((error) => {
                    console.log("Connection Issues. Please try again.")
                })
                break
            
            case 'search':
                postData(jsonData)
                .then(function(res) {
                    console.log(res['body'])
                }).catch((error) => {
                    console.log("Connection Issues. Please try again.")
                })
                break
            
            case 'autocomplete':
                postData(jsonData)
                .then(function(res) {
                    console.log(res['body'])
                }).catch((error) => {
                    console.log("Connection Issues. Please try again.")
                })
                break
            
            case 'display':
                postData(jsonData)
                .then(function(res) {
                    console.log(res['body'])
                }).catch((error) => {
                    console.log("Connection Issues. Please try again.")
                })
                break

            case 'clear':
                postData(jsonData)
                .then(function(res) {
                    console.log('%s Operation completed', chalk.green.bold('DONE'))
                }).catch((error) => {
                    console.log("Connection Issues. Please try again.")
                })
                break

            case 'suite':
                testSuite()
                break

            default:
                postData({"funcCall": "display", "funcArg": ""})
                .then(function(res) {
                    console.log('%s Operation completed', chalk.green.bold('DONE'))
                }).catch((error) => {
                    console.log("Connection Issues. Please try again.")
                })
                break
        }
    }

    if ((options.funcCall != 'display' && options.funcCall != 'clear' && options.funcCall != 'suite')  && (options.funcArg == '' || options.funcArg == undefined)) {
        console.log(options.funcCall != 'display' || options.funcCall != 'clear' || options.funcCall != 'suite')
        console.log('%s Operation failed: Missing argument', chalk.red.bold('FAILED'))
        return false
    } else if ((options.funcCall == 'display' || options.funcCall == 'clear' || options.funcCall == 'suite') && (options.funcArg != '' && options.funcArg != undefined)) {
        console.log('%s Operation failed: Too many arguments', chalk.red.bold('FAILED'))
        return false
    } else {
        let call = options.funcCall
        let arg = ""
        if (options.funcArg == undefined) {
            let arg = ""
        } else {
            arg = options.funcArg
        }

        await sendRequest({
            "funcCall": call,
            "funcArg": arg
        })
        return true;
    }
}