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

    const date = new Date()
    const filename = `weather-data-${date.getTime()}.json`

    let writeStream = fs.createWriteStream(filename)
    
    const readStream = fs.createReadStream(filepath)
    
    readStream.on('data', data => {
        buffer += data.toString()
        const parsedData = parseCsv(buffer)

        const weatherData = {
            WeatherData: {
                WeatherDataForYear: Object.values(parseWeatherData(parsedData))
            }
        }

        console.log(`Writing to file: ${filename}`)
        writeStream.write(JSON.stringify(weatherData))
    })
    
    readStream.on('error', error => {
        console.warn('An error has occurred', error)
        process.exit()
    })

    rl.close()
})
