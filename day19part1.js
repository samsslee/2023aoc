const fs = require('fs');

//initialize where to store the functions and how to make them
let functions = {}
let makeFunc = function (sort) {
    sort = sort.slice(0,-1);
    let [key, instr] = sort.split("{");

    instr = instr.replace(/:([a-zA-Z]+)(?=(,|$))/g, ':"$1"')
                .replace(/,([a-zA-Z]+)$/, ',"$1"')
                .replace(/:/g, '?')
                .replace(/,/g, ':');

    instr = "return " + instr;
    //functions take x m a s as input
    functions[key] = new Function('x','m','a','s', instr);
};
//clean up the file and turn gears into a length 4 array with just numbers, and send the gibberish to the function maker
let [sorting, xmas] = fs.readFileSync("2319input.txt", 'utf-8').split('\r\n\r\n');
xmas = xmas.split('\r\n').map(gear => {
    console.log(gear)
    gear = gear.slice(1,-1).replace(/[^0-9,]/g, '');
    return gear.split(',').map(Number)
})
sorting.split('\r\n').forEach(sort => makeFunc(sort));


//iterate through every xmas
let partone = function(xmas, functions){
    let accepted = []

    for(let gear of xmas){
        let key = "in"
        while (key != "A" && key != "R"){
            key = functions[key](gear[0],gear[1],gear[2],gear[3])
            console.log(key)
            if (key == "A"){
                accepted.push(gear)
            }
        }
    }

    return accepted
}
let accepted = partone(xmas, functions)
console.log("accepted", accepted)

//sum up the answers and this step is broken out as a separate step for sanity
function sum2DArray(array) {
    return array.reduce((accOuter, row) => 
        accOuter + row.reduce((accInner, element) => accInner + element, 0), 0);
}
console.log(sum2DArray(accepted))
