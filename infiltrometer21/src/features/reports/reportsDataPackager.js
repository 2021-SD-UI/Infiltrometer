    
    
    import { SeverityRatings } from "./severityRatings";
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