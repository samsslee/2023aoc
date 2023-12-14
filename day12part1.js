const fs = require('fs');
let records = fs.readFileSync("2312input.txt", 'utf-8').split('\n')
console.log(records)
records = records.map(record => record.split(" "))
console.log(records)

let trimmingAlgo = function(hashes, nums){
    //console.log(hashes)
    let hashesArray = [...hashes]
    //console.log(hashesArray)
    let trim = true
    let fi = 0 //foward index
    let ni = 0 //nums index
    let numsTrimmed = 0
    while(fi<hashesArray.length && trim){
        if (hashes[fi] == "."){
            hashesArray.shift()
            fi++
        } else if (hashes[fi] == "#"){
            hashesArray = hashesArray.slice(nums[ni]+1)
            fi += nums[ni]+1
            ni++
            numsTrimmed++
        } else {
            trim = false
        }
    }
    nums = nums.slice(numsTrimmed)
    //console.log(nums)
    numsTrimmed = 0
    trim = true
    let bi = hashes.length-1 //backwards index, from the now already forward trimmed array
    ni = nums.length-1
    //console.log(hashes[bi],bi)

    if(ni != 0) {
        while(bi>0 && trim){
            //console.log(hashes[bi])
            if (hashes[bi] == "."){
                hashesArray.pop()
                bi--
            } else if (hashes[bi] == "#"){
                hashesArray = hashesArray.slice(0,-(nums[ni]+1))
                bi -= (nums[ni]+1)
                ni--
                numsTrimmed++
            } else {
                trim = false
            }
        }
    }
    //console.log(nums, numsTrimmed)
    if (numsTrimmed !=0){
        nums = nums.slice(0,-numsTrimmed)
    }
    hashes = hashesArray.join('')
    return [hashes, nums]
}

const remainingDotsCalculator = function (nums, totalPatternLength) {
    let remainingDots = totalPatternLength
    let slots = nums.length+1

    nums.map((num) => {
        remainingDots -= num
    })
    remainingDots = remainingDots - (nums.length-1)

    return [remainingDots,slots]
}

function remainingDotsArrayBuilder(sum, count, currentCombination = [], results = []) {
    if (count === 0) {
        if (currentCombination.reduce((acc, val) => acc + val, 0) === sum) {
            results.push([...currentCombination]);
        }
        return;
    }

    for (let i = 0; i <= sum; i++) {
        currentCombination.push(i);
        remainingDotsArrayBuilder(sum, count - 1, currentCombination, results);
        currentCombination.pop();
    }
}

const hashStringBuilder = function(nums,totalPatternLength){
    let templateHashes = []
    
    //calculate the "extra" dots and the ways they can be put around
    let [remainingDots,slots] = remainingDotsCalculator(nums, totalPatternLength)
    //console.log(remainingDots,slots)
    let remainingDotsArray = []
    if (remainingDots > 0){
        remainingDotsArrayBuilder(remainingDots, slots, [], remainingDotsArray);
    } else if (remainingDots== 0){
        remainingDotsArray = [Array(slots).fill(0)];
    } else {
        console.log("THROW ERROR")
    }
    
    //console.log(remainingDotsArray)

    for (let dots of remainingDotsArray){
        let templateHash = '.'.repeat(dots[0])
        for (let i=0; i<nums.length; i++){
            let j=0
            while (j<nums[i]){
                templateHash += "#"
                j++
            }
            if (i !=nums.length-1){
                templateHash += ".".repeat(dots[i+1]+1)
            } else {
                templateHash += ".".repeat(dots[i+1])
            }
    
        }
        templateHashes.push(templateHash)
    }
    
    return templateHashes
}

let regexGenerator = function(hashes){
    let hashesRegexString = "^"
    let hashesMiddle = hashes.split('.').map(partial => {
        let i=0
        let temp = ''
        while (i<partial.length){
            let wildcardCount = 0
            if(partial[i] == "?"){
                while(partial[i]=="?"){
                    wildcardCount++
                    i++
                }
                temp += `.{${wildcardCount}}`
            }
            if(partial[i] == "#") temp += "#"
            i++
        }
        return temp
    }).join('\\.')
    // console.log(hashesMiddle)

    hashesRegexString += hashesMiddle + "$"
    let hashesRegex = new RegExp(hashesRegexString)


    //console.log(hashesRegex)
    return hashesRegex
}

// let regex = regexGenerator('??###??##?????.#?')
// console.log(regex.test('#####..####....#.'));

console.time()

let totals = {}
for (let i = 0; i<records.length; i++){
    let hashes = records[i][0]    //.replace(/^\.+|\.+$/g, '').split(/\.{1,}/)
    let nums = records[i][1].split(",") //.map(number => Number(number))
    //console.log(hashes, nums)
    let [trimmedhashes, trimmednums] = [hashes, nums] //trimmingAlgo(hashes,nums)
    // let trimmedhashes = hashes.repeat(5)
    // let trimmednums = Array.from({ length: 5 }, () => [...nums]).flat();

    if (trimmednums == 0){
        totals[i] = 0
    } else {
        let templateHashes = hashStringBuilder(trimmednums, trimmedhashes.length)
        //console.log(templateHashes)
        let regexHashes = regexGenerator(trimmedhashes)
        let count = 0

        for(template of templateHashes){
            if(regexHashes.test(template)){
                count++
            }
        }
        totals[i] = count
    }

    //trim
    //if trimming returns no more numbers, then push 1 as the total
    //else, trimming returns a modified and smaller set of hashes and nums to look at
    //from that we determine the length of the hashes and build all the potential templateHashes, returning an array
    
    //we generate the regex for the hashes
    //for all of the array of the templateHashes, count how many are good

    //add count to total.console.log(totals)
}
console.log(totals)
console.log(Object.values(totals).reduce((acc, num) => acc + num, 0))
console.timeEnd()
