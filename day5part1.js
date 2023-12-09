
let seeds = "1367444651 99920667 3319921504 153335682 67832336 139859832 2322838536 666063790 1591621692 111959634 442852010 119609663 733590868 56288233 2035874278 85269124 4145746192 55841637 864476811 347179760"
seeds = seeds.split(' ').map(Number)

const fs = require('fs');

const readFileMaps = filename => {
    const fileContent = fs.readFileSync(filename, 'utf-8');
    const maps = fileContent.trim().split('\r\n\r\n'); // Split by empty lines

    //console.log(maps)

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

// Example usage
const allMaps = readFileMaps('2305input.txt');
console.log(allMaps)
const howmanymaps = 7 //so that i don't have to go through everything

let seedPath = function (seed){
    let travellingseed = seed

    //contain in a for loop for every allMaps map
    for(let i = 0; i<howmanymaps; i++){
        //go down the list and look for 
        let j = 0;
        while(j < allMaps[i].length && travellingseed>=allMaps[i][j][1]){
            j++
        }
        console.log(i,j)

        //check if it's in the previous j index's available list
        //if j is 0 then we aren't above the lowest number, and if j is maxed out then we know we're past the list

        if (j==0 || j == allMaps[i].length){ //i know you don't strictly need to write this this way but i'm here anyway
            travellingseed = travellingseed
        } else {
            let travellingseedOffset = travellingseed - allMaps[i][j-1][1]
            //look for where the travellingseed should go by comparing with the previous index's source
            if(travellingseedOffset < allMaps[i][j-1][2]){
                travellingseed = allMaps[i][j-1][0] + travellingseedOffset
            } else { //then there must be a gap in the list
                travellingseed = travellingseed
            }

        }
        console.log(i, j, travellingseed)
    }
    

    return travellingseed
    
}

let locations = seeds.map(seed => seedPath(seed))
console.log(locations);
console.log(Math.min(...locations))
