import chalk from 'chalk'
import fetch from 'node-fetch'

function postData(data) {
    return fetch("https://17n094oc2k.execute-api.us-east-2.amazonaws.com/default/tst_functions", {
        method: 'POST', 
        mode: 'cors', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json'
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
                    console.log(error)
                    console.log("Connection Issues. Please try again.")
                })
                break
            
            default:
                postData({"funcCall": "display", "funcArg": ""})
                .then(function(res) {
                    console.log(res['body'])
                }).catch((error) => {
                    console.log("Connection Issues. Please try again.")
                })
                break
        }
    }

    if ((options.funcCall != 'display' && (options.funcArg == '' || options.funcArg == undefined))) {
        console.log('%s Operation failed: Missing argument', chalk.red.bold('FAILED'))
        return false
    } else if ((options.funcCall == 'display' && (options.funcArg != '' && options.funcArg != undefined))) {
        console.log('%s Operation failed: Too many arguments', chalk.red.bold('FAILED'))
        return false
    } else {
        await sendRequest({
            "funcCall": options.funcCall,
            "funcArg": options.funcArg
        })
        return true;
    }
}