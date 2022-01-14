import { SeverityRatings } from "./severityRatings";


/**
 * create a csv of the current report
 * @param {The current report} i
 */
export function makeCSV(curReport) {


    let obj = {};
    obj[curReport.id] = curReport;
    return makeCSVFromGroupOfReports(obj);

}


function handleTextForCSV(text) {
    if (text == undefined) return ("");
    return text.toString().replaceAll('"', '""');

}
/**
 * 
 * @param {Object of key-report pairs} reportGroup 
 * @returns 
 */
export function makeCSVFromGroupOfReports(reportGroup) {
    let data = [['Date', 'Protocol', 'Soil Alpha', 'Soil NH/O', 'Average Rate (mL/min)', 'Severity Rating', 'Site Name', 'Observation Name',
        'Notes', 'Replication Number', 'Time (sec)', 'Volume(mL)', 'Rate(mL / min)', 'Latitude', 'Longitude']];
    Object.keys(reportGroup).forEach(reportID => {
        let curReport = reportGroup[reportID];
        let curReportData = [curReport.date, curReport.protocol, curReport.infiltrometerData.soilType.alpha, curReport.infiltrometerData.soilType.nh0,
        findAverageRate(curReport), findSeverityRating(findAverageRate(curReport)).name, handleTextForCSV(curReport.infiltrometerData.site),
        handleTextForCSV(curReport.infiltrometerData.observation), handleTextForCSV(curReport.notes)];

        let i = 0;
        //readings data
        curReport.readings.forEach(reading => {
            //reading data
            let row = [...curReportData];

            row.push((i + 1).toString(), reading.secondsElapsed,
                reading.volume,
                findRate(i, curReport), reading.lat, reading.lon);

            data.push(row);
            i++;
        });
    });
    return { data, filename: "reports.csv" }
}

/**
 * Find ml/min for a reading
 * @param {The current reading index} i
 */
export function findRate(readingIndex, report) {
    if (readingIndex > 0) {

        let deltaV = report.readings[readingIndex - 1].volume - report.readings[readingIndex].volume;
        let deltaT = report.readings[readingIndex].secondsElapsed - report.readings[readingIndex - 1].secondsElapsed;
        return (deltaV) / (deltaT / 60);
    }
    else {
        return 0;
    }
}

/**
 * Find average rate (ml/min)
 * Relies on findRate(i) to get rates for calculating the average
 * @param {The current reading index} i
 */
export function findAverageRate(report) {
    let sum = 0;

    for (let i = 0; i < report.readings.length; i++) {
        sum += findRate(i, report);
    }

    return sum / (report.readings.length - 1);
}

/**
 * Returns severity rating based on average rate
 * See severityRatings.js for severity rating values
 * @param {Average flow rate} avgRate
 */
export function findSeverityRating(avgRate) {
    if (avgRate >= SeverityRatings.None.min)
        return SeverityRatings.None;
    if (avgRate >= SeverityRatings.Strong.min && avgRate < SeverityRatings.Strong.max)
        return SeverityRatings.Strong;
    if (avgRate >= SeverityRatings.Weak.min && avgRate < SeverityRatings.Weak.max)
        return SeverityRatings.Weak;
    else return SeverityRatings.None;
}

