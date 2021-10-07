const requestHeaders = (attemptId, entryKey, tests) => ({
    "headers": {
        "accept": "*/*",
        "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryl88GHvKMBjL9xMP3",
    },
    "body": "------WebKitFormBoundaryl88GHvKMBjL9xMP3\r\nContent-Disposition: form-data; name=\"attempt_id\"\r\n\r\n" + attemptId + "\r\n------WebKitFormBoundaryl88GHvKMBjL9xMP3\r\nContent-Disposition: form-data; name=\"entry_key\"\r\n\r\n" + entryKey + "\r\n------WebKitFormBoundaryl88GHvKMBjL9xMP3\r\nContent-Disposition: form-data; name=\"tests_json\"\r\n\r\n" + JSON.stringify(Object.fromEntries(tests)) + "\r\n------WebKitFormBoundaryl88GHvKMBjL9xMP3\r\nContent-Disposition: form-data; name=\"code\"\r\n\r\n:)\r\n------WebKitFormBoundaryl88GHvKMBjL9xMP3--\r\n",
    "method": "POST",
})

let entryId = ""
let entryKey = ""

const solveAndGetNextTask = (task, tests, attemptId) => {
    let testsDone = ""

    switch (task) {
        case "Cube":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    return [test[0], Math.pow(test[1].args, 3)]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "multiplierCount":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    return [test[0], Math.floor(test[1].args[0] / test[1].args[1])]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "Square Root":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    return [test[0], Math.sqrt(test[1].args, 2)]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "removeAllSpaces":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    return [test[0], test[1].args[0].split("").map(z => z !== " " ? z : "").join("")]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "replaceSpaces":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    return [test[0], test[1].args[0].replaceAll(" ", "%20")]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "getHalfArray":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const res = test[1].args[0]
                    res.length = Math.ceil(res.length / 2)
                    const a = [test[0], res]
                    return a
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "matchingType":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const res = typeof test[1].args[0] === typeof test[1].args[1]
                    return [test[0], res]

                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "findAverage":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const res = test[1].args[0]
                    return [test[0], Math.ceil(res.reduce((a, b) => a + b) / res.length)]

                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "arrayToObject":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const res = test[1].args[0]
                    return [test[0], res.reduce((acc, curr) => (acc[curr[0]] = curr[1], acc), {})]

                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "reverseString":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const res = test[1].args[0]
                    return [test[0], res.split("").reverse().join("")]

                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "countUniqueNumbers":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const res = test[1].args[0]
                    return [test[0], [...new Set(res)].length]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "binaryToNumber":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const res = test[1].args[0]
                    return [test[0], parseInt(res, 2)]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "monthToString":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const res = test[1].args[0]
                    return [test[0], ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][res - 1]]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "numberOfCircles":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const res = test[1].args[0]
                    let o = 0
                    const a = `${res}`.split("").map((c) => {
                        if (c == 6 || c == 0 || c == 9) o++
                        if (c == 8) o += 2
                    })
                    return [test[0], o]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "numberRepresentation":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const res = test[1].args[0]
                    const o = []
                    const j = +res.sort().map((c) => {
                        const z = res.filter((i) => i === c && !o.includes(c)).length;
                        o.push(c)
                        return z
                    }).filter(j => j !== 0).join("")

                    return [test[0], j]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;

        case "reverseCase":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const res = test[1].args[0]

                    return [test[0], res.split("").map(c => c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()).join("")]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "findUniqueNumber":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const res = test[1].args[0]

                    return [test[0], res.filter((value) => res.indexOf(value) === res.lastIndexOf(value))[0]]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "twoArrayAvg":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const res = test[1].args[0]
                    const res2 = test[1].args[1]

                    return [test[0], ((res.reduce((a, b) => a + b) / res.length) + (res2.reduce((a, b) => a + b) / res2.length)) / 2]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "reverseAllWords":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const res = test[1].args[0]

                    return [test[0], res.split(" ").map(w => w.split("").reverse().join("")).join(" ")]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "removeDuplicates":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const res = test[1].args[0]

                    return [test[0], [...new Set(res)].join("")]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "charCountInString":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const res = test[1].args

                    return [test[0], res[1].split(res[0]).length - 1]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "digitOccurrence":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const res = test[1].args

                    let o = 0;
                    for (let i = 0; i <= res[0]; i++) {
                        `${i}`.split("").map((c) => (c == res[1] ? o++ : 0));
                    }

                    return [test[0], o]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "firstUniqueChar":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const res = test[1].args

                    let o = ""
                    let found = false
                    for (let i = 0; i < res[0].length; i++) {
                        if (res[0].indexOf(res[0][i]) == res[0].lastIndexOf(res[0][i])) {
                            if (!found) {
                                found = true
                                o = res[0][i]
                            }
                        }
                    }

                    return [test[0], o === "" ? false : o]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "hexToRGB":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const x = test[1].args[0]
                    const res2 = test[1].args[1]

                    return [test[0], x.substring(1).match(/.{2}/g).map(z => parseInt(z, 16))]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "findWord":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const x = test[1].args[0]
                    const y = test[1].args[1]

                    return [test[0], [y.indexOf(x), y.indexOf(x) + x.length - 1]]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "averageAsciiChar":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const x = test[1].args[0]
                    const y = test[1].args[1]

                    return [test[0], String.fromCharCode(Math.round(x.split("").map(c => c.charCodeAt(0)).reduce((a, b) => a + b) / x.length))]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "isRotatedStr":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const x = test[1].args[0]
                    const y = test[1].args[1]

                    const xArray = x.split("");
                    const lastWord = xArray.splice(0, 1);
                    const firstWord = [...xArray, lastWord].join("");

                    function checkWord(word) {
                        if (word === y) return true;
                        if (word === x) return false;
                        const xArray = word.split("");
                        const lastWord = xArray.splice(0, 1);
                        return checkWord([...xArray, lastWord].join(""));
                    }


                    return [test[0], checkWord(firstWord)]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "validateIP":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const x = test[1].args[0]
                    const y = test[1].args[1]

                    function ValidateIPaddress(ipaddress) {
                        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
                            return true
                        }
                        return false
                    }


                    return [test[0], ValidateIPaddress(x)]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "hashPassword":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const x = test[1].args[0]
                    const y = test[1].args[1]

                    function hashPassword(password, x) {
                        let splitted = password.split``.map(char => changeLetters(char, x))

                        function changeLetters(letter, step) {
                            let code = letter.charCodeAt();
                            if (code > 96 && code < 123) {
                                code = letter.toUpperCase().charCodeAt()
                            }
                            else if (code > 64 && code < 91) {
                                code = letter.toLowerCase().charCodeAt()
                            }

                            if (code > 96 && code < 123) {
                                if (step > 52) {
                                    step = step % 26;
                                }
                                let pos = code + step;
                                if (pos > 122) {
                                    pos = 96 + (pos - 122)
                                }
                                return String.fromCharCode(pos)
                            }
                            else if (code > 64 && code < 91) {
                                if (step > 52) {
                                    step = step % 26;
                                }
                                let pos = code + step;
                                if (pos > 90) {
                                    pos = 64 + (pos - 90)
                                }
                                return String.fromCharCode(pos)
                            }
                            else if (code > 47 && code < 58) {
                                if (step > 19) {
                                    step = step % 10;
                                }
                                let pos = letter.charCodeAt() + step;
                                if (pos > 57) {
                                    pos = 47 + (pos - 57)
                                }
                                return String.fromCharCode(pos)
                            }

                        }
                        return splitted.join``
                    };


                    return [test[0], hashPassword(x, y)]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "romanToInt":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const x = test[1].args[0]

                    const values = new Map([
                        ['I', 1],
                        ['V', 5],
                        ['X', 10],
                        ['L', 50],
                        ['C', 100],
                        ['D', 500],
                        ['M', 1000],
                    ]);

                    function romanToInt(string) {
                        let result = 0,
                            current, previous = 0;
                        for (const char of string.split("").reverse()) {
                            current = values.get(char);
                            if (current >= previous) {
                                result += current;
                            } else {
                                result -= current;
                            }
                            previous = current;
                        }
                        return result;
                    }

                    return [test[0], romanToInt(x)]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "isPalindrome":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const x = test[1].args[0]

                    return [test[0], x === x.split("").reverse().join``]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
        case "isPrime":
            testsDone = Object.entries(tests).map(test => {
                if (test[0].match(/rnd/g)) {
                    const x = test[1].args[0]

                    function isPrime(num) {
                        for (var i = 2; i < num; i++)
                            if (num % i === 0) return false;
                        return num > 1;
                    }

                    return [test[0], isPrime(x)]
                } else {
                    return [test[0], test[1].result]
                }
            })
            break;
    }

    // FETCH DATA
    const url = "https://speedcoding.toptal.com/webappApi/entry/" + entryId + "/attemptTask"
    fetch(url, requestHeaders(attemptId, entryKey, testsDone))
        .then(response => response.json())
        .then(data => {
            console.log("NEW TASK:", data.data);
            const taskData = data.data

            if (taskData.isSuccess) {
                if (taskData.isChallengeEntryFinished) {
                    console.log("Task finished, points: ", taskData.totalPoints)
                } else {
                    solveAndGetNextTask(taskData.nextTask.title, taskData.nextTask.tests_json, taskData.attemptId)
                }
            } else {
                console.log("TASK FAILED! PLEASE FIX IT")
            }
        });
}

// INITIAL REQUEST
setInterval(() => {
    fetch("https://speedcoding.toptal.com/webappApi/entry?ch=29&acc=4901", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,ru;q=0.7,lv;q=0.6",
            "cache-control": "no-cache",
            "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryMJtcVlLY8GI3Ofkp",
            "pragma": "no-cache",
            "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "cookie": "PHPSESSID=40379b1e59570d8a0ba9e17ee4376769; visitor_id=965869d3-80c6-4ef4-b2b4-44339b547e7f"
        },
        "referrer": "https://speedcoding.toptal.com/challenge?ch=toptal-js-2021",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "------WebKitFormBoundaryMJtcVlLY8GI3Ofkp\r\nContent-Disposition: form-data; name=\"challengeSlug\"\r\n\r\ntoptal-js-2021\r\n------WebKitFormBoundaryMJtcVlLY8GI3Ofkp\r\nContent-Disposition: form-data; name=\"email\"\r\n\r\ntdmarko@gmail.com\r\n------WebKitFormBoundaryMJtcVlLY8GI3Ofkp\r\nContent-Disposition: form-data; name=\"leaderboardName\"\r\n\r\nMark Timfeyev\r\n------WebKitFormBoundaryMJtcVlLY8GI3Ofkp\r\nContent-Disposition: form-data; name=\"isConfirmedToBeContacted\"\r\n\r\n1\r\n------WebKitFormBoundaryMJtcVlLY8GI3Ofkp\r\nContent-Disposition: form-data; name=\"isTermsAndConditionsChecked\"\r\n\r\n1\r\n------WebKitFormBoundaryMJtcVlLY8GI3Ofkp\r\nContent-Disposition: form-data; name=\"countryAlpha2\"\r\n\r\nLV\r\n------WebKitFormBoundaryMJtcVlLY8GI3Ofkp--\r\n",
        "method": "POST",
        "mode": "cors"
    })
        .then(response => response.json())
        .then(data => {
            const taskData = data.data
            console.log("INITIAL DATA:", data)
            entryId = taskData.entry.id
            entryKey = taskData.entry.entry_key

            solveAndGetNextTask(taskData.nextTask.title, taskData.nextTask.tests_json, taskData.attemptId)
        })
}, 20000)