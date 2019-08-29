const calendarMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const getMonthObject = monthName => ({
    Month: monthName,
    FirstRecordedDate: '',
    LastRecordedDate: '',
    TotalRainfall: 0,
    AverageDailyRainfall: 0,
    DaysWithNoRainfall: 0,
    DaysWithRainfall: 0,
})

module.exports = weatherData => 
    weatherData.reduce((acc, curr) => {
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

        // If the current year doesnt already have a Month object for `month`, create one using the shape
        const currentMonthName = calendarMonths[Number(month)]
        const foundMonth = acc[year].MonthlyAggregates.find(({Month}) => Month === currentMonthName)
        const monthAggregate = foundMonth || getMonthObject(currentMonthName)

        // Sum up the TotalRainfall value for a year
        acc[year].TotalRainfall += rainfallAmount
        monthAggregate.TotalRainfall += rainfallAmount // update month rainfall total

        // Increase daysWith and daysWithNo depending on level of rainfall
        if (rainfallAmount) {
            acc[year].DaysWithRainfall++ 
            monthAggregate.DaysWithRainfall++
        } else {
            acc[year].DaysWithNoRainfall++
            monthAggregate.DaysWithNoRainfall++
        }

        const totalDaysInYear = acc[year].DaysWithRainfall + acc[year].DaysWithNoRainfall
        const totalDaysInMonth = monthAggregate.DaysWithRainfall + monthAggregate.DaysWithNoRainfall

        // Update the average daily rainfall
        acc[year].AverageDailyRainfall = acc[year].TotalRainfall / totalDaysInYear
        monthAggregate.AverageDailyRainfall = monthAggregate.TotalRainfall / totalDaysInMonth

        // Month was not present in current data set, so add it
        if (!foundMonth) {
            acc[year].MonthlyAggregates.push(monthAggregate)
        }
        
        return acc
    }, {})
