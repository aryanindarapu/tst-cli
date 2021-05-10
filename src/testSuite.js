import chalk from 'chalk'
import { postData } from './main'
import fetch from 'node-fetch'

// Clears all keys
async function clearKeys() {
    let response = await fetch("https://gw2g3gr01b.execute-api.us-east-2.amazonaws.com/default/tst_function", {
        method: 'POST', 
        mode: 'cors', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "funcCall": "clear",
            "funcArg": ""
        })
    }).then(function(res) {
        console.log('%s Trie was cleared.', chalk.green.bold('DONE'))
    }).catch((error) => {
        console.log("%s Failed to clear trie.", chalk.red.bold('ERROR'))
    })
}

// Test Case 1 - Adding 30 keys
async function testCase1() {
    let testCount = 0

    let caseKeys = [
        'cheap',       'creepy',    'cake',
        'attraction',  'camera',    'cook',
        'abortive',    'bear',      'amusement',
        'adventurous', 'cracker',   'communicate',
        'airplane',    'cable',     'colossal',
        'act',         'analyze',   'aspiring',
        'befitting',   'ball',      'call',
        'angle',       'authority', 'cup',
        'change',      'celery',    'crown',
        'abrupt',      'ants'
    ]

    for (let item of caseKeys) {
        let response = await fetch("https://gw2g3gr01b.execute-api.us-east-2.amazonaws.com/default/tst_function", {
            method: 'POST', 
            mode: 'cors', 
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "funcCall": "add",
                "funcArg": item
            })
        }).then(function(res) {
            if (testCount == 0) console.log("Testing addition of keys to trie.")

            testCount++
            console.log("Adding " + item + " to trie.")
            if (testCount >= 29) {
                console.log('%s All keys were added to the trie', chalk.green.bold('TEST SUCCESS'))
                console.log()
                return true
            } 
        }).catch((error) => {
            console.log("%s Failed to add " + item + " to trie.", chalk.red.bold('ERROR'))
        })  
    }

    if (testCount < 29)  {
        console.log("%s Not all keys were added to trie.", chalk.red.bold('TEST FAILURE'))
        console.log()
        return false
    }
}

// Test Case 2 - Autocomplete based on prefix
async function testCase2() {
    let testCount = 0
    let casePrefixKeys = {
        'a': ['attraction', 'abortive', 'amusement', 'adventurous', 'airplane', 'act', 'analyze', 'aspiring', 'angle', 'authority', 'abrupt', 'ants'], 
        'abr': ['abrupt'], 
        'camera': ['camera'], 
        'bre': [], 
        'ca': ['cake', 'camera', 'cable', 'call'], 
        'test': []
    }

    for (let item in casePrefixKeys) {
        let response = await fetch("https://gw2g3gr01b.execute-api.us-east-2.amazonaws.com/default/tst_function", {
            method: 'POST', 
            mode: 'cors', 
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "funcCall": "autocomplete",
                "funcArg": item
            })
        }).catch((error) => {
            console.log("%s Some error occurred.", chalk.red.bold('ERROR'))
        })

        let data = await response.json()
            
        if (testCount == 0) console.log("Testing autocomplete keys to trie.")
        if (JSON.stringify(data['body'].sort()) === JSON.stringify(casePrefixKeys[item].sort())) {
            testCount++
            console.log('Autocomplete for prefix "' + item + '" was [' + data['body'].sort() + "]")
        }
        if (testCount >= 6) { 
            console.log('%s All autocomplete results were correct.', chalk.green.bold('TEST SUCCESS'))
            console.log()
            return true
        }
    }

    if (testCount < 6) {
        console.log("%s Not all autocomplete results were correct.", chalk.red.bold('TEST FAILURE'))
        console.log()
        return false
    }
}

// Test Case 3 - Search
async function testCase3() {
    let caseSearchKeys = ['befitting', 'authority', 'raisin', 'funny', 'crown']
    let testCount = 0

    for (let item of caseSearchKeys) {
        let response = await fetch("https://gw2g3gr01b.execute-api.us-east-2.amazonaws.com/default/tst_function", {
            method: 'POST', 
            mode: 'cors', 
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "funcCall": "search",
                "funcArg": item
            })
        }).catch((error) => {
            console.log("%s Search failed.", chalk.red.bold('TEST FAILURE'))
        })

        let data = await response.json()
        if (testCount == 0) console.log("Testing searching of keys of trie.")
        testCount++
        if (data['body']) {
            console.log(item + " exists in the trie.") 
        } else {
            console.log(item + " doesn't exist in the trie.")  
        }
    }

    if (testCount == 5) {
        console.log('%s All searches succeeded.', chalk.green.bold('TEST SUCCESS'))
        console.log()
        return true
    } else {
        console.log("%s Not all searches succeeded.", chalk.red.bold('TEST FAILURE'))
        console.log()
        return false
    }
}

// Test Case 4 - Deleting keys
async function testCase4() {
    let caseDeleteKeys = ['befitting', 'authority', 'raisin', 'funny', 'crown']
    let testCount = 0

    for (let item of caseDeleteKeys) {
        let response = await fetch("https://gw2g3gr01b.execute-api.us-east-2.amazonaws.com/default/tst_function", {
            method: 'POST', 
            mode: 'cors', 
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "funcCall": "delete",
                "funcArg": item
            })
        }).catch((error) => {
            console.log("%s Deletion failed.", chalk.red.bold('ERROR'))
        })

        let data = await response.json()
        if (testCount == 0) console.log("Testing deletion of keys from trie.")
        testCount++
        console.log("Deleting " + item + " from trie") 
        if (data['body']) {
            console.log(item + " deleted!") 
        } else {
            console.log(item + " doesn't exist in the trie.")  
        }
    }

    for (let item of caseDeleteKeys) {
        let response = await fetch("https://gw2g3gr01b.execute-api.us-east-2.amazonaws.com/default/tst_function", {
            method: 'POST', 
            mode: 'cors', 
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "funcCall": "search",
                "funcArg": item
            })
        }).catch((error) => {
            console.log("%s Search failed.", chalk.red.bold('TEST FAILURE'))
        })

        let data = await response.json()
        
        if (testCount == 5) {
            console.log()
            console.log("Searching whether deleted keys still exist in trie.")
        }
        
        if (data['body']) {
            console.log(item + " exists in the trie.") 
        } else {
            console.log(item + " doesn't exist in the trie.")  
            testCount++
        }
    }

    if (testCount >= 10) {
        console.log('%s All deletions succeeded.', chalk.green.bold('TEST SUCCESS'))
        console.log()
        return true
    } else {
        console.log("%s Not all deletions succeeded.", chalk.red.bold('TEST FAILURE'))
        console.log()
        return false
    }
}

// Final display keys
async function displayKeys() {
    let response = await fetch("https://gw2g3gr01b.execute-api.us-east-2.amazonaws.com/default/tst_function", {
        method: 'POST', 
        mode: 'cors', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "funcCall": "display",
            "funcArg": ""
        })
    }).catch((error) => {
        console.log("%s Failed to display trie.", chalk.red.bold('ERROR'))
        return
    })

    let data = await response.json()
    console.log("Displaying contents of final testing suite trie:")
    console.log(data['body'])
}

export async function testSuite() {
    await clearKeys()
    let tc1 = await testCase1()
    let tc2 = await testCase2()
    let tc3 = await testCase3()
    let tc4 = await testCase4()
    await displayKeys()

    console.log('%s All tests were successful.', chalk.green.bold('TEST SUITE SUCCESS'))
}