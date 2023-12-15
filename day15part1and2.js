const fs = require('fs');
let sequence = fs.readFileSync("2315input.txt", 'utf-8').split(',')
console.log(sequence.length)

let asciiMaker = function(seq){
    let cv = 0
    for (let i=0; i<seq.length; i++){
        cv = ((cv + seq[i].charCodeAt(0)) * 17) %256
    }
    console.log(cv)
    return cv
}

let splitter = function(seq){
    let split = []
    if(seq.includes("-")){
        split.push(seq.replace("-", ""))
    } else {
        split = seq.split('=')
    }
    return split
}

let parttwo = function(sequence){
    //make the map
    let hashmap = {};
    for (let i = 0; i <= 255; i++) {
        hashmap[i] = new Map();
    }

    for(let i=0; i<sequence.length; i++){
        let seq = splitter(sequence[i])

        if (seq.length === 1){
            hashmap[asciiMaker(seq[0])].delete(seq[0])
        } else {
            hashmap[asciiMaker(seq[0])].set(seq[0],seq[1])
        }
    }

    let total = 0
    for (let i = 0; i <= 255; i++) {
        hashmap[i] = Array.from(hashmap[i])
        if(hashmap[i].length > 0){
            hashmap[i].forEach((focalLength,sloti) => {
                total+= (i+1) * (sloti+1) * focalLength[1]
            })
        }
    }

    //console.log(hashmap)
    return total
}

console.log(parttwo(sequence))

let partone = function(sequence){
    let grandTotal = 0
    for(let i=0; i<sequence.length; i++){
        grandTotal += asciiMaker(sequence[i])
    }

    return grandTotal
}

console.log(partone(sequence))
