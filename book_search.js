/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    /**In this version the Time compplexity is O(books * contents * textSize) and space compexity is constant... O(1)
     * for(let book = 0;  book < input.length; book++){
     *          let ISBN = input[book].ISBN;
            for(let content = 0; content < input[book].Content.length; content++){
                let page = input[book].Content[content];
                if(page.Text.includes(word)){
                    console.log(page)
                    result.push(page);
                }
            }  
        }
     */
    //In this version time compexity is O(books * contents) + O(transformedData * textSize)
    var result = {
        "SearchTerm": `${searchTerm}`,
        "Results": []
    };
    
    if(searchTerm === "" || null){
        return result;
    }

    
    
    //Flatten object for better access to content
    const transformedData = [];
    for(let book = 0; book < scannedTextObj.length; book++){
        let { ISBN, Content} = scannedTextObj[book];
        if(Content){
            for(let content = 0; content < Content.length; content++){
                const { Page, Line, Text } = Content[content];
                Content[content].ISBN = ISBN;
                transformedData.push({ISBN, Page, Line, Text});
            }
        }
    }
    
    //Loop over new flatten data
    for(let book = 0;  book < transformedData.length; book++){
        let data = transformedData[book];
        let {ISBN, Page, Line, Text} = data;
        if(Text.includes(searchTerm)){
            result.Results.push({ISBN, Page, Line});
        }
    }
    
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and high"
            },
            {
                "Page": 40,
                "Line": 5,
                "Text": "The well-known author decided to revisit his childhood home for inspiration"
            }  
        ] 
    },
    {
        "Title": "The mighty Projects",
        "ISBN": "9780000528538",
        "Content": [
            {
                "Page": 40,
                "Line": 8,
                "Text": "The team worked tirelessly on high-priority projects"
            },
        ] 
    },
    {
        "Title": "Dealines",
        "ISBN": "9780000528530",
        "Content": [
            {
                "Page": 40,
                "Line": 8,
                "Text": "A deadline is approaching,"
            },
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____ 
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** We could choose to check that we get the right number of results. */
//Case sensitive test
const test3result = findSearchTermInBooks("The", twentyLeaguesIn); 
if (test3result.Results.length == 3) {
    console.log("PASS: Case sensitive Test 3");
} else {
    console.log("FAIL: Case sensitive Test 3");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test3result.Results.length);
}

/** We could choose to check that we get the right number of results. */
//Hyphenated Compound word test
const test4result = findSearchTermInBooks("high-priority", twentyLeaguesIn); 
if (test4result.Results.length == 1) {
    console.log("PASS: Hyphenated Compound word Test 4");
} else {
    console.log("FAIL: Hyphenated Compound word Test 4");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test3result.Results.length);
}

/** We could choose to check that we get the right number of results. */
//search term not found test
const test5result = findSearchTermInBooks("Developer", twentyLeaguesIn); 
if (test5result.Results.length == 0) {
    console.log("PASS: Search term not found Test 5");
} else {
    console.log("FAIL: Search term not found  Test 5");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test3result.Results.length);
}

//search over the contents of  multiple books test 
const test6result = findSearchTermInBooks("high", twentyLeaguesIn); 
if (test6result.Results.length == 2) {
    console.log("PASS:  Multiple books search Test 6");
} else {
    console.log("FAIL:  Multiple books search Test 6");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test3result.Results.length);
}

//search term close to punctuation books test 
const test7result = findSearchTermInBooks("approaching", twentyLeaguesIn); 
if (test7result.Results.length == 1) {
    console.log("PASS: Close to Punctuation Test 7");
} else {
    console.log("FAIL:  Close to Punctuation Test 7");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test3result.Results.length);
}

//Prefix word test
const test8result = findSearchTermInBooks("high", twentyLeaguesIn); 
if (test8result.Results.length == 2) {
    console.log("PASS: Prefix word Test 8");
} else {
    console.log("FAIL: Prefix Test 8");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test3result.Results.length);
}

//Suffix word test
const test9result = findSearchTermInBooks("priority", twentyLeaguesIn); 
if (test9result.Results.length == 1) {
    console.log("PASS: Suffix word Test 9");
} else {
    console.log("FAIL: Suffix Test 9");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test3result.Results.length);
}

//no serch term was passed test
const test10result = findSearchTermInBooks("", twentyLeaguesIn);
if (test10result?.Results.length == 0) {
    console.log("PASS: No search term Test 10");
} else {
    console.log("FAIL: No search term Test 10");
    console.log("Expected:", 0);
    console.log("Received:", test10result?.Results.length);
}

//Zero or more books
const test11result = findSearchTermInBooks("", []);
if (test11result?.Results.length == 0) {
    console.log("PASS: Zero or more books Test 11");
} else {
    console.log("FAIL: Zero or more books Test 11");
    console.log("Expected:", 0);
    console.log("Received:", test11result?.Results.length);
}

const twenty = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
    },
    {
        "Title": "The mighty Projects",
        "ISBN": "9780000528538",
        "Content": [
            {
                "Page": 40,
                "Line": 8,
                "Text": "The team worked tirelessly on high-priority projects"
            },
        ] 
    }
]
//Zero or more scanned content
const test12result = findSearchTermInBooks("The", twenty);
if (test12result?.Results.length == 1) {
    console.log("PASS: Zero or more scanned content Test 12");
} else {
    console.log("FAIL: Zero or more scanned content Test 12");
    console.log("Expected:", 1);
    console.log("Received:", test11result?.Results.length);
}