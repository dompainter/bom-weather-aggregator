const assert = require('assert')
const fs = require('fs')
const parseCsv = require('../parse-csv')

const expectedData = [{
    "Bureau of Meteorology station number": "066062",
    "Day": "01",
    "Month": "01",
    "Period over which rainfall was measured (days)": "",
    "Product code": "IDCJAC0009",
    "Quality": "",
    "Rainfall amount (millimetres)": "",
    "Year": "1858"
}, {
    "Bureau of Meteorology station number": "066062",
    "Day": "02",
    "Month": "01",
    "Period over which rainfall was measured (days)": "",
    "Product code": "IDCJAC0009",
    "Quality": "",
    "Rainfall amount (millimetres)": "",
    "Year": "1858"
}]

describe('Parse CSV', function () {
    it('Should return CSV data in correct format', function (done) {
        const data = fs.readFileSync('./src/test/test-csv.csv')
        const parsedData = parseCsv(data.toString())

        assert.deepEqual(parsedData, expectedData)
        done()
    })
})
