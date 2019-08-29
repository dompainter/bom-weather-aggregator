const fs = require('fs')
const readline = require('readline')
const parseCsv = require('./src/parse-csv')
const parseWeatherData = require('./src/parse-weather-data')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
  
rl.question('Please enter a CSV file path: ', filepath => {
    console.log(`Reading file at path: ${filepath}`);
    let buffer = ''
    
    const fileStream = fs.createReadStream(filepath || 's.csv')
    
    fileStream.on('data', data => {
        buffer += data.toString()
        const parsedData = parseCsv(buffer)

        const weatherData = parseWeatherData(parsedData)
		console.log("​weatherData", weatherData)
    })
    
    fileStream.on('error', error => {
        console.warn('An error has occurred', error)
        process.exit()
    })

    fileStream.on('end', () => {
        console.log('Finished reading file')
    })

    rl.close()
})
