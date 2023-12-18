const fs = require('fs');

//part one trenches
let trenches = fs.readFileSync("2318input.txt", 'utf-8')
            .split('\r\n').map(row => row.split(' '))
//part two trenches
let trenches = fs.readFileSync("2318input.txt", 'utf-8')
  .split('\r\n')
  .map(row => {
    let [other, code] = row.split('(#');
    code = code.replace(/[^0-9A-Fa-f]/g, '')
    let hex = code.slice(0, -1)
    let dir = code.slice(-1)
    console.log(dir)
    let dirdict = {"0": "R", "1": "D", "2": "L", "3":"U"}
    
    // Remove non-hex characters and convert to decimal for the second part
    hex = parseInt(hex, 16);
    dir = dirdict[dir]
    
    return [dir, hex]
  })
function verticesFinder(trenches){
    let width = 0
    let height = 0
    let vertices = []
    let bp = 0
    for (let trench of trenches){
        bp += Number(trench[1])
        switch(trench[0]) {
            case "R":
                width += Number(trench[1])
                vertices.push([height, width])
                break
            case "L":
                width -= Number(trench[1])
                vertices.push([height, width])
                break
            case "D":
                height += Number(trench[1])
                vertices.push([height, width])
                break
            case "U":
                height -= Number(trench[1])
                vertices.push([height, width])
                break

        }
    }
    console.log(bp)
    return [vertices,bp]
}

let [vertices,bp] = verticesFinder(trenches)

function areaCalc(vertices, bp){
    let shoelace = 0

    for (let i = 0; i<vertices.length-1; i++){
        shoelace += (vertices[i+1][0]+vertices[i][0])*(vertices[i+1][1]-vertices[i][1])
    }
    shoelace = 0.5*Math.abs(shoelace)
    console.log(shoelace, trenches.length, bp)

    let area = shoelace - bp/2 + 1 + bp

    return area
}

let area = areaCalc(vertices,bp)
console.log(area)
