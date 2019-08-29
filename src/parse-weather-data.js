module.exports = weatherData => {
    return weatherData.reduce((acc, curr) => {
        const {Year: year, Month: month, Day: day, 'Rainfall amount (millimetres)': rainfall} = curr
        const rainfallAmount = Number(rainfall)
		
        if (!acc[year]) {
            // Start object structure for a year entry
            acc[year] = {
                Year: year,
                FirstRecordedDate: '',
                LastRecordedDate: '',
                TotalRainfall: 0,
                AverageDailyRainfall: 0,
                DaysWithNoRainfall: 0,
                DaysWithRainfall: 0,
                MonthlyAggregates: []
            }
        }

        // Sum up the TotalRainfall value for a year
        acc[year].TotalRainfall += rainfallAmount

        // Increase daysWith and daysWithNo depending on level of rainfall
        if (rainfallAmount) {
            acc[year].DaysWithRainfall++ 
        } else {
            acc[year].DaysWithNoRainfall++
        }

        const totalDays = acc[year].DaysWithRainfall + acc[year].DaysWithNoRainfall

        // Update the average daily rainfall
        acc[year].AverageDailyRainfall = acc[year].TotalRainfall / totalDays 

        return acc
    }, {})
}
