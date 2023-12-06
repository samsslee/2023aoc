let times = [46689866]
let distances = [358105418071080]
let methodstowin = []

for (let i = 0; i< times.length; i++){

    console.log(`time: ${times[i]}`)
    let count = 0
    let msToTravel
    let ms

    for (ms = Math.floor(distances[i]/times[i]); ms <= Math.floor(times[i] / 2); ms++){
        msToTravel = times[i]-ms

        if(ms*msToTravel > distances[i]){
            console.log(ms,msToTravel)
            break;
        }



    }

    count = msToTravel - ms + 1
    methodstowin.push(count)

}

console.log(methodstowin.reduce( (a, b) => a * b ) )
