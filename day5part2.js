const fs = require('fs');
const { off } = require('process');

let seeds = "1367444651 99920667 3319921504 153335682 67832336 139859832 2322838536 666063790 1591621692 111959634 442852010 119609663 733590868 56288233 2035874278 85269124 4145746192 55841637 864476811 347179760"
//let seeds = "1367444651 99920667 3319921504 153335682"
seeds = seeds.split(' ').map(Number)
let seedRanges = []
for (let i = 0; i<seeds.length; i+=2){
    seedRanges.push([seeds[i],seeds[i+1]])
}
console.log(seedRanges)


const readFileMaps = filename => {
    const fileContent = fs.readFileSync(filename, 'utf-8');
    const maps = fileContent.trim().split('\r\n\r\n'); // Split by empty lines

    const allMaps = {};

    maps.forEach((map, index) => {
        const arrayOfArrays = map.split('\n')
        .filter(line => /\d/.test(line)) // Only consider lines containing at least one digit
        .map(line => line.split(' ').map(Number));
        //console.log(arrayOfArrays)
        allMaps[index] = arrayOfArrays.sort((a, b) => a[1] - b[1]);
    });

    return allMaps;
};

const allMapsOG = readFileMaps('2305input.txt');

//fill gaps in map
let fillGapsGimpy = function (allMaps){
    for (let map in allMaps){
        let missingRange = []
        let index
    
        for (let i = 0; i<allMaps[map].length-1;i++){
            //hijack the fact that there's only a total of 3 missing ranges and they're in different maps
    
            if(allMaps[map][i][1]+allMaps[map][i][2] != allMaps[map][i+1][1]){
                //console.log(In Map ${map} there's a gap at index ${i} after ${allMaps[map][i][1]})
                //console.log(The Gap is ${allMaps[map][i][1]+allMaps[map][i][2]}, ${allMaps[map][i+1][1]})
                missingRange = [allMaps[map][i][1]+allMaps[map][i][2], allMaps[map][i][1]+allMaps[map][i][2], allMaps[map][i+1][1]-(allMaps[map][i][1]+allMaps[map][i][2])]
                index = i+1
    
            }

            if(allMaps[map][0][1] != 0){
                //console.log(In Map ${map} there's a gap before the start)
                missingRange = [0, 0, allMaps[map][0][1]]
                index = 0
            }
        }
    
        if (missingRange.length === 3){
            //console.log("here")
            allMaps[map].splice(index, 0, missingRange)
            //console.log(allMaps[map])
        }
        
    }
    return allMaps
}
const allMaps = fillGapsGimpy(allMapsOG)
console.log(allMaps)


const processSeeds = function (allMaps, seedRanges) {
    let currentSeedRanges = seedRanges //initiate

    for(let map in allMaps){
        console.log(map # ${map})
        let currentMap = allMaps[map]
        let newRanges = []
        let mapHigh = currentMap[currentMap.length-1][1]+currentMap[currentMap.length-1][2]-1

        for(let seed in currentSeedRanges){
            let lowSeed = currentSeedRanges[seed][0]
            let highSeed = currentSeedRanges[seed][0]+currentSeedRanges[seed][1]-1
    
            //both are off the map to the left
            if (lowSeed > mapHigh && highSeed > mapHigh){
                newRanges.push(currentSeedRanges[seed])
            } else {
                let lowj = 0
                while (lowSeed >= currentMap[lowj][1]+currentMap[lowj][2]){
                    lowj++
                }
                let highj = lowj
                console.log(highj)
                console.log(highSeed, currentMap[highj][1]+currentMap[highj][2])
                while (highj < currentMap.length && highSeed >= currentMap[highj][1]+currentMap[highj][2]){
                    highj++
                }
                
                console.log(highj, lowj)
    
                //they're in the same range
                if(lowj == highj){
                    let offset = currentMap[lowj][0]-currentMap[lowj][1]
                    console.log("high low same")
                    newRanges.push([lowSeed+offset, highSeed-lowSeed+1])
                } else {
                    //push low range
                    let offset = currentMap[lowj][0] - currentMap[lowj][1] //how much to shift from source to dest
                    let truncatedrange = currentMap[lowj][2] - (lowSeed - currentMap[lowj][1]) //total range minus part we don't want
                    newRanges.push([lowSeed+offset, truncatedrange])
    
                    //push high range
                    if(highj == currentMap.length){
                        truncatedrange = highSeed - mapHigh
                        newRanges.push([mapHigh+1,truncatedrange])
                    } else{
                        truncatedrange = highSeed - currentMap[highj][1]
                        newRanges.push([currentMap[highj][0],truncatedrange])
                    }
                    
    
                    //push middle ranges if applicable
                    for(let k = lowj+1; k<highj; k++){
                        newRanges.push([currentMap[k][0],currentMap[k][2]])
                    }
    
                }
    
            }
    
        }

        currentSeedRanges = newRanges
    }
    

    return currentSeedRanges.sort((a,b) => a[0]-b[0])    

}
console.log(processSeeds(allMaps,seedRanges))
