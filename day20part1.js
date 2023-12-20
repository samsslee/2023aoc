console.time()
const fs = require('fs')

// ------ this is SETUP -----
let [broadcast, switchboard] = fs.readFileSync('2320input.txt','utf-8').split("\r\n\r\n")
switchboard = switchboard.split("\r\n")

//make the object that holds all the states and types and children
//then find the "parents" of the con switchboard pieces
let allModules = {}
let convergers = []
for (let module of switchboard){
    let [mod, children] = module.split(" -> ")
    let [type, name] = [mod[0], mod.slice(1)]

    if (type == "%"){
        allModules[name] = {type: type, state:0, children: children.split(', ')}
    } else {
        allModules[name] = {type: type, parents:{}, children: children.split(', ')}
        convergers.push(name)
    }
}

for (let module in allModules){
    for(let i = 0; i<allModules[module].children.length; i++){
        if(convergers.includes(allModules[module].children[i])){
            //console.log("here", module, allModules[module].children[i])
            allModules[allModules[module].children[i]].parents[module] = 0
            //console.log("set for", allModules[module].children[i], allModules[allModules[toggler].children[i]].parents)
        }
    }
}
//console.log(allModules)

// ----- VARS AND FUNCTIONS THAT ARE PART OF ITERATIVE CODE EXECUTION -------

const partone = function(allModules){
    let [word, queue] = broadcast.split(" -> ")
    queue = queue.split(", ").map(q => ({child:q, pulse:0, parent:"broadcaster"}))
    let highCount = 0
    let lowCount = queue.length + 1

    //define toggler function, high pulse is 1 low pulse is 0
    const togglerFunc = function(mod, pulse){
        if (pulse == 1){
            return
        } else {
            if (allModules[mod].state == 1){ //if it's on right now
                allModules[mod].state = 0
                for(child of allModules[mod].children){
                    queue.push({child:child, pulse:0, parent:mod}) //child, pulse, parent
                    lowCount++
                }
            } else {
                allModules[mod].state = 1
                for(child of allModules[mod].children){
                    queue.push({child:child, pulse:1, parent:mod}) //child, pulse, parent
                    highCount++
                }
            }
        }
    }

    const convergerFunc = function(mod, parent, pulse){

        allModules[mod].parents[parent] = pulse
        if(Object.values(allModules[mod].parents).every(element => element === 1)){
            for(child of allModules[mod].children){
                queue.push({child:child, pulse:0, parent:mod})
                lowCount++
            }
        } else {
            for(child of allModules[mod].children){
                queue.push({child:child, pulse:1, parent:mod})
                highCount++
            }
        }
    }

    while (queue.length > 0){
        //console.log("queue", queue)
        let current = queue.shift()
        if(allModules[current.child]){
            if(allModules[current.child].type == "%"){
                togglerFunc(current.child, current.pulse)
            } else {
                convergerFunc(current.child, current.parent, current.pulse)
            }
        }
    }

    //console.log(highCount, lowCount)
    return [highCount,lowCount]
}

let iterate  = function (allModules){
    let highCount = 0
    let lowCount = 0
    for (let i = 0; i<1000; i++){
        let [high, low] = partone(allModules)
        highCount += high
        lowCount += low
    }
    //console.log("reports", reports)
    console.log(highCount*lowCount)
    return highCount*lowCount
}

iterate(allModules)
console.timeEnd() // 23ms :)
