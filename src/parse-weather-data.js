module.exports = weatherData => {
    return weatherData.reduce((acc, curr) => {
        if (!acc[curr.Year]) {
            // Start object structure for a year entry
            acc[curr.Year] = {
                Year: curr.Year,
                FirstRecordedDate: 0,
                LastRecordedDate: 0,
                TotalRainfall: 0,
                AverageDailyRainfall: 0,
                DaysWithNoRainfall: 0,
                DaysWithRainfall: 0,
            }
        }

        // Sum up the TotalRainfall value for a year
        acc[curr.Year].TotalRainfall += Number(curr['Rainfall amount (millimetres)'])

        // Increase daysWith and daysWithNo depending on level of rainfall
        if (Number(curr['Rainfall amount (millimetres)'])) {
            acc[curr.Year].DaysWithRainfall++ 
        } else {
            acc[curr.Year].DaysWithNoRainfall++
        }

        return acc
    }, {})
}
