const fs = require('fs');
const _ = require('lodash');
let oglayout = fs.readFileSync("2316input.txt", 'utf-8').split('\r\n').map(row => row.split(''))
//console.log(layout)

console.time()
let partone = function(oglayout, i, j, arrow){
    let layout = _.cloneDeep(oglayout)

    let count = new Set()
    let width = layout[0].length
    let height = layout.length

    let energized = function(layout,i,j,arrow){
        if (i>=0 && i<height && j>=0 && j<width){
            count.add(JSON.stringify([i,j]))
            if (layout[i][j] == "."){
                layout[i][j] = "#"
                energized(layout,i+arrow[0],j+arrow[1],arrow)
            } else if (layout[i][j] == "#"){
                energized(layout,i+arrow[0],j+arrow[1],arrow)
            } else if (layout[i][j] == "$"){
                return
            } else if (layout[i][j] == "|"){
                layout[i][j] = "$"
                if (arrow[1] == 0) { //if we aren't going horizontally
                    energized(layout,i+arrow[0],j+arrow[1],arrow)
                } else { // call for both the up and down directions
                    energized(layout,i-1,j,[-1,0]) //up
                    energized(layout,i+1,j,[1,0]) //down
                }
            } else if (layout[i][j] == "-"){
                layout[i][j] = "$"
                if (arrow[0] == 0) { //if we aren't going vertically
                    energized(layout,i+arrow[0],j+arrow[1],arrow)
                } else { // call for both the sideways directions
                    energized(layout,i,j-1,[0,-1]) //left
                    energized(layout,i,j+1,[0,1]) //right
                }
            } else if (layout[i][j] == "/"){
                if (arrow.includes(1)){
                    arrow[0] -= 1
                    arrow[1] -= 1
                    energized(layout,i+arrow[0],j+arrow[1],arrow)
                } else {
                    arrow[0] += 1
                    arrow[1] += 1
                    energized(layout,i+arrow[0],j+arrow[1],arrow)
                }
            } else if (layout[i][j] == "\\"){
                    arrow.reverse()
                    energized(layout,i+arrow[0],j+arrow[1],arrow)
            }
        } else {
            return
        }
    }
    
    energized(layout,i,j,arrow)
    return count.size
}

//part two
let sizearray = []
for(let j = 0; j<oglayout.length;j++){
    sizearray.push(partone(oglayout,0,j,[1,0]))
}
for(let i = 0; i<oglayout.length; i++){
    sizearray.push(partone(oglayout,i,0,[0,1]))
}
for(let j = 0; j<oglayout.length;j++){
    sizearray.push(partone(oglayout,oglayout.length-1,j,[-1,0]))
}
for(let i = 0; i<oglayout.length;i++){
    sizearray.push(partone(oglayout,i,oglayout.length-1,[0,-1]))
}
console.log(Math.max(...sizearray))

console.timeEnd()
