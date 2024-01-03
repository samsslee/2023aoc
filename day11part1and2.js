const fs = require('fs');
const fileContent = fs.readFileSync("2311input.txt", 'utf-8');
let galaxyMap = fileContent.split('\r\n').map(row => row.split(''));


//find Galaxies
let findGalaxies = function(){
    let galaxies = []
    for (let i=0; i<galaxyMap.length;i++){
        for (let j=0; j<galaxyMap[0].length;j++){
            if(galaxyMap[i][j] == "#"){
                galaxies.push([i,j])
            }
        }
    }
    return galaxies
}

let galaxyLocations = findGalaxies()
console.log(galaxyLocations)

let findEmptySpace = function(){
    let galaxyColumns = new Set()
    let galaxyRows = []
    for (let i = 0; i < galaxyMap[0].length; i++) {
        galaxyColumns.add(i);
    }

    for (let i=0; i<galaxyMap.length;i++){
        let rowempty = true
        for (let j=0; j<galaxyMap[0].length;j++){
            if(galaxyMap[i][j] == "#"){
                galaxyColumns.delete(j)
                rowempty = false
            }
        }
        if (rowempty) galaxyRows.push(i)
    }

    return [galaxyRows, [...galaxyColumns]]
}

let [galaxyRows, galaxyColumns] = findEmptySpace()
console.log(galaxyRows)
console.log(galaxyColumns)

let findNewLocations = function(galaxyLocations, galaxyRows, galaxyColumns){
    let newGalaxyLocations = galaxyLocations

    for(let loc=0; loc<galaxyLocations.length; loc++){
        console.log(newGalaxyLocations[loc])
        console.log(galaxyLocations[loc])
        let i=0
        let j=0
        while (i<galaxyRows.length && galaxyLocations[loc][0]>galaxyRows[i]) i++
        newGalaxyLocations[loc][0] = galaxyLocations[loc][0] + i*999999 // partone use just i part two use i*999999

        while (j<galaxyColumns.length && galaxyLocations[loc][1]>galaxyColumns[j]) j++
        newGalaxyLocations[loc][1] = galaxyLocations[loc][1] + j*999999 // same as previous comment for j
    }
    
    return newGalaxyLocations
}

let newGalaxyLocations = findNewLocations(galaxyLocations, galaxyRows, galaxyColumns)
console.log(newGalaxyLocations)

let totaldistances = function(coordinates){
    let total = 0
    for (let i = 0; i < coordinates.length - 1; i++) {
        const coordA = coordinates[i];
      
        for (let j = i + 1; j < coordinates.length; j++) {
          const coordB = coordinates[j];
      
          total += Math.abs(coordA[0] - coordB[0]) + Math.abs(coordA[1] - coordB[1])
        }
    }
    return total
}

let totaldistance = totaldistances(newGalaxyLocations)
console.log(totaldistance)
