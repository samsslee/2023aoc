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

const parttwo = function(allModules) {
    let [word, queue] = broadcast.split(" -> ")
    queue = queue.split(", ").map(q => ({child:q, pulse:0, parent:"broadcaster"}))

    const broadcastFollower = function(current){
        let firstchildren = allModules[current.child].children
        let nextchild
        let total = 0
        let multiplier = 1

        for(child of firstchildren){
            if (allModules[child].type == "%") nextchild = child
        }
        total += multiplier + total
        multiplier *= 2

        let morechildren = true
        while (morechildren){
            let childrentypes = []
            for(child of allModules[nextchild].children){
                childrentypes.push(allModules[child].type)
                if (allModules[child].type == "%"){
                    nextchild = child
                }
            }
            if (childrentypes.length >= 2){
                total += multiplier
                multiplier *=2
            } else if(childrentypes[0] == "&"){
                total += multiplier
                morechildren = false
            } else {
                multiplier*=2
            }
        }
        return total
    }

    let answers = []
    for (let q of queue){
        answers.push(broadcastFollower(q))
    }
    return answers
}

console.log(parttwo(allModules)) //then find the lcm of the answers on wolfram alpha bc im lazy

console.timeEnd() // 7ms
