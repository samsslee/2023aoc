const fs = require('fs');
const _ = require('lodash');

//file data setup
let [sorting, other] = fs.readFileSync("2319input.txt", 'utf-8').split('\r\n\r\n');
let instructions = {};

let makeInstr = function (sort) {
    sort = sort.slice(0, -1);
    let [key, instr] = sort.split("{");
    instructions[key] = instr;
};

sorting.split('\r\n').forEach(sort => makeInstr(sort));

//actual functions for the question
const rangeSplitter = function (condition, xmas) {
    let [letter, number] = condition.split(/[<>]/);
    number = Number(number)
    let truehalf;
    let falsehalf;

    if (condition.includes("<")) {
        let halves = bifurcate(number, xmas[letter]);
        truehalf = halves.lower ? halves.lower : null;
        falsehalf = halves.upper ? halves.upper : null;

    } else if (condition.includes(">")) {
        let halves = bifurcate(number + 1, xmas[letter]);
        truehalf = halves.upper ? halves.upper : null;
        falsehalf = halves.lower ? halves.lower : null;
    }

    let xmastrue = _.cloneDeep(xmas);
    xmastrue[letter] = truehalf;

    let xmasfalse = _.cloneDeep(xmas);
    xmasfalse[letter] = falsehalf;

    return [xmastrue, xmasfalse];
};

const bifurcate = function (number, range) {
    let halves = {};

    if (number > range[0] && number < range[1]) {
        halves.upper = [number, range[1]];
        halves.lower = [range[0], number];
    } else if (number <= range[0]) {
        halves.upper = _.cloneDeep(range);
    } else if (number >= range[1]) {
        halves.lower = _.cloneDeep(range);
    }
    return halves;
};

//function that takes an instruction and a range
let dostuff = function(instrkey, xmasrange){
    //console.log("we go", instrkey)

    if (instrkey == "A"){ //something about an end condition
        acceptedranges.push(xmasrange)
        return
    } else if (instrkey == "R"){
        return
    } else {
        let instrList = instructions[instrkey].split(",") // s>2610:A     x>3640:R     s>2396:R    A
        let remainingRange = xmasrange
        for(let instr of instrList){
            instr = instr.split(":")
            if (instr.length == 1){
                if (instr[0] === "A"){
                    acceptedranges.push(remainingRange)
                    return
                } else if(instr[0] === "R"){
                    return
                } else {
                    dostuff(instr[instr.length - 1], remainingRange)
                }
            } else {
                let [truehalf, falsehalf] = rangeSplitter(instr[0], remainingRange)
                dostuff(instr[instr.length - 1],truehalf)
                remainingRange = falsehalf
            }
        }
    }
}
//part two
let xmastest = {x: [1, 4001], m: [1, 4001], a: [1, 4001], s: [1, 4001]};
let acceptedranges = []
dostuff("in", xmastest)
let totalaccepts = 0
for (const obj of acceptedranges) {
    totalaccepts += (obj.x[1]-obj.x[0])*(obj.m[1]-obj.m[0])*(obj.a[1]-obj.a[0])*(obj.s[1]-obj.s[0])
}
console.log(totalaccepts)
