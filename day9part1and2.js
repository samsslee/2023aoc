var interpolatingPolynomial = require('interpolating-polynomial')
const fs = require('fs');

const fileContent = fs.readFileSync("2309input.txt", 'utf-8');
let reports = fileContent.split('\r\n')
reports = reports.map(report => {
    report = report.split(' ').map((number, index) => [index, number])
    let f = interpolatingPolynomial(report);
    return f(report.length) // in part1 use report.length, in part2 use -1
})
console.log(reports.reduce((accumulator, currentValue) => {return accumulator + currentValue}, 0))
