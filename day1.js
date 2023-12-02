// Importing the fs module
let fs = require("fs")

// Intitializing the readFileLines with the file
const readFileLines = filename =>
   fs.readFileSync(filename)
   .toString('UTF8')
   .split('\r\n'); //regex splits it by line

// Calling the readFiles function with file name
let arr = readFileLines('2301input.txt');

// Printing the response array
//console.log(arr[arr.length-1]);



const digitFinder = function (value){

    let left = 0
    let right = value.length - 1
    let digits

    let varray = value.split("")

    while (isNaN(varray[left])){
        //console.log(varray[left])
        left++ //left is like 12ish
    }

    while (isNaN(varray[right])){
        //console.log(varray[right])
        right--
    }

    if(left>2 || right<value.length-3){
        digits = wordsearch(varray,left,right)
    } else {
        digits = varray[left] + varray[right]
    } 

    return Number(digits)

}

const wordsearch = function(value,leftindex,rightindex){

    let minindex = {[leftindex] : value[leftindex]}
    let maxindex = {[rightindex] : value[rightindex]}

    let letters = value.join('')
    let numbers = {
        "one":'1',
        "two":'2',
        "six":'6',
        "nine":'9',
        "four":'4',
        "five":'5',
        "three":'3',
        "seven":'7',
        "eight":'8',
    }

    for(number in numbers){

        let firstindex = letters.indexOf(number)
        let lastindex = letters.lastIndexOf(number)

        if (firstindex >=0){
            if (Number(Object.keys(minindex)[0]) > firstindex){
                minindex = {[firstindex] : numbers[number]}
            }

        }
        if (lastindex >=0){
            if (Number(Object.keys(maxindex)[0]) < lastindex){
                maxindex = {[lastindex] : numbers[number]}
            }
        }

        

    }

    let digits = minindex[Object.keys(minindex)[0]] + maxindex[Object.keys(maxindex)[0]]

    return digits
}




const summation = function(values){

    let sum = 0

    //iterate through the list of coordinates
    for(let i=0; i<values.length; i++){

        //clean the values

        let digits = digitFinder(values[i])
        //console.log(values[i], digits)
        sum += digits
    }

    return sum

}

console.time()
let sum = summation(arr)
console.timeEnd()
console.log(sum)
