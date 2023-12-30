const fs = require('fs')
let hailstones = fs.readFileSync("2324input.txt", 'utf-8').split('\r\n')

hailstones = hailstones.map(row => row.replace(' @', ',').split(", "))
let statics = []
hailstones.forEach((row) =>{
    let m = row[4]/row[3]
    let b = row[1] - m*row[0] //-m*x_1 + y_1
    statics.push({m:m, b:b})
}
)

console.log(statics)
let upper = 400000000000000
let lower = 200000000000000

let count = 0
for (i = 0; i<hailstones.length-1; i++){
    for (j = i+1; j<hailstones.length;j++){
        //slopes are the same
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
            console.log("x and y",  x, y)   
        }
    }
}
console.log(count)
