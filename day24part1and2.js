const fs = require('fs')
const math = require('mathjs')
let hailstones = fs.readFileSync("2324input.txt", 'utf-8').split('\r\n')

hailstones = hailstones.map(row => row.replace(' @', ',').split(", "))
let statics = []
hailstones.forEach((row) =>{
    let m = row[4]/row[3]
    let b = row[1] - m*row[0] //-m*x_1 + y_1
    statics.push({m:m, b:b})
}
)

//part one and setup for part two
//while mucking around with part one, we discovered there were exactly 2 pairs of parallel hailstones
//.. this meant that we could simply construct a plane for each of them
//.. which is the line where all of them would intersect

let upper = 400000000000000
let lower = 200000000000000

let count = 0
for (i = 0; i<hailstones.length-1; i++){
    for (j = i+1; j<hailstones.length;j++){
        //slopes aren't the same
        if(!(Math.abs(statics[j].m - statics[i].m)/statics[i].m) <=10**-10){
            let x = (statics[i].b - statics[j].b)/(statics[j].m - statics[i].m)
            let y
            if(x<=upper && x>=lower){
                y = (statics[i].m * x) + statics[i].b
                if(y<=upper && y>=lower){
                    if((hailstones[i][3] * (x - hailstones[i][0])) > 0 && (hailstones[j][3] * (x - hailstones[j][0])) > 0 ){
                        count++
                    }
                }
            }   
        }
    }
}
console.log("part one answer:", count) // this is part one answer

//parttwo
//solve for x and y, then x and z

let [x0,y0,z0,u0,v0,w0] = hailstones[0].map(Number)
let [x1,y1,z1,u1,v1,w1] = hailstones[1].map(Number)
let [x2,y2,z2,u2,v2,w2] = hailstones[2].map(Number)
let [x3,y3,z3,u3,v3,w3] = hailstones[3].map(Number)
let [x4,y4,z4,u4,v4,w4] = hailstones[4].map(Number)

let coeff1 = u1*z1 - u0*z0 + x0*w0 - x1*w1
let coeff2 = u2*z2 - u0*z0 + x0*w0 - x2*w2
let coeff3 = u3*z3 - u0*z0 + x0*w0 - x3*w3
let coeff4 = u4*z4 - u0*z0 + x0*w0 - x4*w4

// Define the coefficients matrix and the constants wector
const coefficientsMatrix = math.matrix([
  [(u1-u0), (z1-z0), (w0-w1), (x0-x1)], //z, dx, x, dz
  [(u2-u0), (z2-z0), (w0-w2), (x0-x2)],
  [(u3-u0), (z3-z0), (w0-w3), (x0-x3)],
  [(u4-u0), (z4-z0), (w0-w4), (x0-x4)]
]);

const constantsVector = math.matrix([coeff1, coeff2, coeff3, coeff4]);

// Solve the system of equations Ax = B
const solution = math.lusolve(coefficientsMatrix, constantsVector);

console.log('Solution:', solution);

//found that these were nearly integers: dx, dy, dz
let dx = 41
let dy = 255
let dz = 197

//use to solve more precise starting points with on wolfram alpha
//(x-x1)(v1-dy) = (y-y1)(u1-dx)
//(x-x1)(w1-dz) = (z-z1)(u1-dx)

//x,y,z are 267365104480541,147898020991907,139405790744697
