let instructions = "LRRRLRRLRLLRLRRLRLRLLRRRLRLRRRLRRRLRLRLRRLRLRRRLRRLLRRLLLRRLRRLRRRLRLRRRLRRLRRRLRRRLRRLRLLRRRLRLRRLRLRLRRRLRRLLRRRLLRRLRLRRLRRRLLLRRRLLRLLRRLRRRLRLRLRRLLLRRRLLRRLLLRLRLRRLLRLLRRLLLRRLLRRRLRLRRRLRLLRRRLRRRLRLRLRRRLRLRRRLRRRLRRRLLRLRLRLRRLRLRRRLRLRLLRRLRRLRRLRRRLRRRLRLLRLLLRRLRLRRRR"

let fs = require("fs")
const readFileLines = filename => {
    
    let network = fs.readFileSync(filename)
    .toString('UTF8')
    .split('\r\n'); //regex splits it by line

    let networkObj = {}

    network.forEach(coordinates =>{
        let [name, coords] = coordinates.split(" = ")
        coords = coords.slice(1,9).split(", ")
        networkObj[name] = coords
    })

    return networkObj
}

let network = readFileLines('2308input.txt')
//console.log(Object.keys(network))

let partone = function (network, instructions) {
    console.log(network)
    let coord = "AAA"
    let instructionsCounter = 0
    let stepCounter = 0

    while (coord != "ZZZ"){

        console.log(coord)

        //reset instructionCounter if necessary
        if (instructionsCounter == instructions.length) instructionsCounter = 0
        let location = network[coord]

        console.log(location)

        if (instructions[instructionsCounter] == "L") coord = location[0]
        else coord = location[1]
        instructionsCounter++
        stepCounter++

    }

    return stepCounter

}

let parttwo = function (network, instructions) {
    console.log(network)
    let coord = Object.keys(network).filter(str => str.endsWith("A"))
    let ZendSteps = []
    
    console.log(coord)

    let findaZend = function (coord){
        let instructionsCounter = 0
        let stepCounter = 0

        while (!coord.endsWith("Z")){

            console.log(coord)
    
            //reset instructionCounter if necessary
            if (instructionsCounter == instructions.length) instructionsCounter = 0
            let location = network[coord]
    
            console.log(location)
    
            if (instructions[instructionsCounter] == "L") coord = location[0]
            else coord = location[1]
            instructionsCounter++
            stepCounter++
    
        }
        return stepCounter
    }

    for (let i=0; i<coord.length; i++){
        console.log(coord[i]);
        ZendSteps.push(findaZend(coord[i]))
    }

    return ZendSteps

}
//let Zarray = console.log(parttwo(network,instructions))

// Function to find the GCD of two numbers
function findGCD(a, b) {
    return b === 0 ? a : findGCD(b, a % b);
}

// Function to find the LCM of two numbers
function findLCM(a, b) {
    return (a * b) / findGCD(a, b);
}

// Function to find the LCM of an array of numbers
function findLCMArray(arr) {
    return arr.reduce((lcm, num) => findLCM(lcm, num), 1);
}

const lcm = findLCMArray([ 14893, 20513, 22199, 19951, 17141, 12083 ]);

console.log(`LCM is: ${lcm}`);
