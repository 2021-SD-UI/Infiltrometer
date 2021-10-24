import { SeverityRatings } from "./severityRatings";


/**
 * create a csv of the current report
 * @param {The current report} i
 */
export function makeCSV(curReport){

    const data = [];


    for(let i = 0; i < curReport.readings.length;i++){
        let row = {

            index: i,
            time: curReport.readings[i].secondsElapsed,
            volume: curReport.readings[i].volume,
            rate: findRate(i,curReport),
            averageRate: findAverageRate(curReport),
            severity: findSeverityRating(findAverageRate(curReport))

        };
        data.push(row);
    }

    const headers = [
        {label: 'Index', key: 'index'},
        {label: 'Seconds_Elapsed', key: 'time'},
        {label: 'Volume', key: 'volume'},
        {label: 'Rate', key: 'rate'},
        {label: 'Average_Rate', key: 'averageRate'},
        {label: 'Severity', key: 'severity'}

    ];

    const csv = {
        fileName: 'report.csv',
        headers: headers,
        data: data
    };




    return csv;
}

    /**
     * Find ml/min for a reading
     * @param {The current reading index} i
     */
    export function findRate(readingIndex, report){
        if(readingIndex>0){

            let deltaV = report.readings[readingIndex-1].volume - report.readings[readingIndex].volume;
            let deltaT = report.readings[readingIndex].secondsElapsed - report.readings[readingIndex-1].secondsElapsed;
            return (deltaV)/(deltaT/60);
        }
        else{
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

        for(let i = 0; i < report.readings.length; i++) {
            sum += findRate(i, report);
        }

        return sum/(report.readings.length - 1);
    }

    /**
     * Returns severity rating based on average rate
     * See severityRatings.js for severity rating values
     * @param {Average flow rate} avgRate
     */
    export function findSeverityRating(avgRate) {
        if (avgRate >= SeverityRatings.None.min)
            return SeverityRatings.None; 
        if (avgRate>= SeverityRatings.Strong.min && avgRate < SeverityRatings.Strong.max)
            return SeverityRatings.Strong;
        if (avgRate >= SeverityRatings.Weak.min && avgRate < SeverityRatings.Weak.max)
            return SeverityRatings.Weak;
        else return null;
    }

