let fs = require("fs")
let bricks = fs.readFileSync("2322input.txt").toString('UTF8').split('\r\n').map(brick => {
    brick = brick.split(/[~,]/).map(Number)
    brick = {x:[brick[0],brick[3]], y:[brick[1],brick[4]], z:[brick[2],brick[5]]}
    return brick
})

//sort bricks
function compare( a, b ) {
    if ( a.z[0] < b.z[0] ){
      return -1;
    }
    if ( a.z[0] > b.z[0] ){
      return 1;
    }
    return 0;
  }
bricks = bricks.sort( compare );

const createLevel = function() { //to create each level when needed
    let level = [];

    for (let i = 0; i < 10; i++) {
        level[i] = [];
        for (let j = 0; j < 10; j++) {
            level[i][j] = ".";
        }
    }

    return level
}

let supports = {} //record what each brick is supported by when it sees supports
let levels = [createLevel()] //i'm indexing my z's to 0 instead of 1 in the problem

const maincode = function(){
    for (let b = 0; b<bricks.length; b++){ //do this for every brick in the list
        //console.log("CURRENT BRICK", bricks[b])
        let isclear = true
        let level = levels.length
        //console.log("start drop at", levels.length)
        //search if that level is clear in the xy area, if so, check the next one too
        while (isclear && level>0){
            level--
            for(let i=bricks[b].x[0]; i<bricks[b].x[1]+1; i++){
                for(let j=bricks[b].y[0]; j<bricks[b].y[1]+1; j++){
                    if(!isNaN(levels[level][i][j])){
                        supports[b] ? supports[b].add(levels[level][i][j]) : supports[b] = new Set([levels[level][i][j]]) //record support bricks for brick b
                        //console.log("supports", supports[b]);
                        isclear = false
                    }
                }
            } 
            if(!isclear){
                level++
                supports[b] = Array.from(supports[b])
            } //if the level isn't clear, scoot up one
        }

        //console.log("Stopped at level:", level)
        //transpose the brick to that area
        let height = (bricks[b].z[1] - bricks[b].z[0])
        for (let k=level; k<level+height+1; k++){
            if(!levels[k]){ //if that level hasn't already been made, then create that level
                levels[k] = createLevel()
            }
            for(let i=bricks[b].x[0]; i<bricks[b].x[1]+1; i++){
                for(let j=bricks[b].y[0]; j<bricks[b].y[1]+1; j++){
                    levels[k][i][j] = b
                }
            }
        }
        //console.log("levels",levels)
    }

    //look through which are the only supports for bricks
    let onlySupport = new Set()
    for (let sb in supports){ //sb, as in, supported brick
        if (supports[sb].length == 1) {
            onlySupport.add(supports[sb][0])
        }
    }
    //console.log(levels)

    //part one
    //number of bricks that when pulled would cause no bricks to fall
    console.log("part one:", bricks.length - onlySupport.size)

    //parttwo
    const invsupports = {}
    onlySupport = Array.from(onlySupport)
    //console.log(supports)
    //console.log(onlySupport)

    //invert the deck so it shows what deck of bricks each 
    Object.keys(supports).forEach(key => {
    supports[key].forEach(value => {
        if (!invsupports[value]) {
            invsupports[value] = new Set([parseInt(key)])
        }
        invsupports[value].add(parseInt(key));
        });
    });

    //console.log(invsupports)
    let stackCount = {}
    const countstack = function(currentStack, b){
        //console.log("currentstack:", currentStack)
        if(!invsupports[b]){
            return
        }
        invsupports[b].forEach(sb => {

            //if the block has another support that hasn't yet been pulled
            //then don't include it
            let supported = false
            for (let s of supports[sb]){
                //console.log("supports", supports[sb],"of",sb )
                //console.log(currentStack)
                if(!currentStack.has(s)){ //if there is a support block in it's list of supports but is not pulled
                    //console.log("s", s)
                    supported = true //then this block is still supported
                }
            }
            if(!supported){
                currentStack.add(sb)
                countstack(currentStack, sb)
            }
            
        })
    }
    
    for (let b of onlySupport){
        stackCount[b] = new Set([b])
        countstack(stackCount[b], b)
    }

    let count = 0
    for (let stack in stackCount){
        //console.log(stack, ":", stackCount[stack].size)
        count += stackCount[stack].size-1
    }

    //console.log(invsupports)
    console.log("part two:", count)
}
maincode()
