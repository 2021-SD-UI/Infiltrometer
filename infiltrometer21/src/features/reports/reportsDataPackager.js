import { SeverityRatings } from "./severityRatings";
import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
import { getPhotoFromID, selectAlbums } from "../photos/albumsSlice";
import { Protocols } from './protocols'
const JSZip = require("jszip");


// Create a CSV of the current report
export function makeCSV(curReport, reportAlbums) {
    let obj = {};
    obj[curReport.id] = curReport;
    return makeCSVFromGroupOfReports(obj, reportAlbums);
}

function handleTextForCSV(text) {
    if (text === undefined) return ("");
    return text.toString().replaceAll('"', '""');
}

// Get data from all selected reports
// Write to a CSV
export function makeCSVFromGroupOfReports(reportGroup, reportAlbums) {
    var zip = new JSZip();
    let reportPromises = [];
    Object.keys(reportGroup).forEach((reportID, index) => {
        reportPromises.push(new Promise((resolve, reject) => {
            let folderName = "report_" + index;
            let folder = zip.folder(folderName);
            let curReport = reportGroup[reportID];
            let csvData = makeCSVDataFromReading(curReport);

            let reportAlbum = reportAlbums == null ? null : reportAlbums[reportID];

            //add csv data tot he folder
            folder.file(folderName + ".csv", csvData);

            //put all the images on this report in their own images folder
            if (reportAlbum == null ||
                reportAlbum == undefined ||
                reportAlbum.length == 0) resolve();
            else {
                fetchAllImages(reportAlbum).then((imageData) => {
                    //make sure we actually have images
                    if (imageData.length === 0) resolve();
                    var img = folder.folder("images");
                    imageData.forEach((photo) => {
                        img.file(photo.name, photo.data, { base64: true });
                    });
                    //resolve with the folder contents
                    resolve();
                });
            }


        }));
    });
    Promise.all(reportPromises).then(() => {
        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                // see FileSaver.js
                saveAs(content, "reports.zip");
            });
    });


}



function makeCSVDataFromReading(curReport) {
    let data = [];
    let curReportData = [];
    if (curReport.protocol === Protocols.Baer) {
        //Download for BAER
        data = [['Protocol', 'Soil Alpha', 'Soil NH/O', 'Average Rate (mL/min)', 'Severity Rating', 'Site Name', 'Observation Name',
            'Notes', 'Replication Number', 'Time (sec)', 'Volume(mL)', 'Rate(mL / min)', 'Latitude', 'Longitude', 'Date', 'Time']];
        curReportData = [curReport.protocol, curReport.infiltrometerData.soilType.alpha, curReport.infiltrometerData.soilType.nh0,
        findAverageRate(curReport, false), findSeverityRating(findAverageRate(curReport)).name, handleTextForCSV(curReport.infiltrometerData.site),
        handleTextForCSV(curReport.infiltrometerData.observation), handleTextForCSV(curReport.notes)];
    }
    else {
        //Download for standard
        data = [['Protocol', 'Soil Alpha', 'Soil NH/O', 'C1 (cm/s^(½))', 'C2 (cm/s)', 'K (cm/s)', 'Site Name', 'Observation Name',
            'Notes', 'Reading Number', 'Time (sec)', 'Volume(mL)', 'Latitude', 'Longitude', 'Date', 'Time']];
        curReportData = [curReport.protocol, curReport.infiltrometerData.soilType.alpha, curReport.infiltrometerData.soilType.nh0,
        curReport.infiltrometerData.C1, curReport.infiltrometerData.C2, curReport.infiltrometerData.K, handleTextForCSV(curReport.infiltrometerData.site),
        handleTextForCSV(curReport.infiltrometerData.observation), handleTextForCSV(curReport.notes)];
    }
    let i = 0;
    let date = new Date(curReport.date).toDateString();


    //readings data
    curReport.readings.forEach(reading => {
        //reading data
        let row = [...curReportData];
        //Actual time of the reading
        let time = new Date(curReport.date)
        time = new Date(time.setSeconds(time.getSeconds() + reading.secondsElapsed)).toTimeString();

        if (curReport.protocol === Protocols.Baer) {
            //Download for BAER
            row.push((i + 1).toString(), reading.secondsElapsed,
                reading.volume,
                findRate(i, curReport), reading.lat, reading.lon, date, time);
        } else {
            //Download for Standard (No Rate)
            row.push((i + 1).toString(), reading.secondsElapsed,
                reading.volume,
                reading.lat, reading.lon, date, time);
        }

        data.push(row);
        i++;
    });
    return toCsv(data);
}


function toCsv(input) {
    return input.map(row => row.join(',')).join('\n')
}

// Find flow rate (ml/min) for an individual reading in a report
export function findRate(readingIndex, report, fromBeginning = false) {

    if (readingIndex > 0) {
        if (fromBeginning) {
            return Number(report.readings[0].volume - report.readings[readingIndex].volume)
                / (Number(report.readings[readingIndex].secondsElapsed) / 60);
        }
        else {
            var _f = report.readings[readingIndex - 1];
            var _s = report.readings[readingIndex];
            let deltaV = Number(_f.volume) - Number(_s.volume);
            let deltaT = Number(_s.secondsElapsed) - Number(_f.secondsElapsed);
            return (deltaV) / (deltaT / 60);
        }

    }
    else {
        return 0;
    }
}

// Find average flow rate (mL/min) for a report
export function findAverageRate(report, fromBeginning = false) {
    let sum = 0;

    for (let i = 0; i < report.readings.length; i++) {
        sum += findRate(i, report, fromBeginning);
    }

    return sum / (report.readings.length - 1);
}

//fetches all the images of an album, returns promise with all the images
export function fetchAllImages(reportAlbum) {
    //some constants to declare
    const hasPhotos = reportAlbum !== null && reportAlbum !== undefined && reportAlbum.length > 0;

    return new Promise((resolve, reject) => {
        //first get all the image data from a report
        if (!hasPhotos) resolve([]); //don't download any photos if we have none
        let promises = [];

        for (let i = 0; i < reportAlbum.length; i++) {
            promises.push(getPhotoFromID(reportAlbum[i].full));
        }

        let photos = [];
        Promise.all(promises).then((data) => {
            data.forEach((photo, i) => {

                //we need to seperate the extension and the data
                //the photo data comes as: data:image/png;base64, <actualData>

                let ext = photo.match(/[^:/]\w+(?=;|,)/)[0];
                let actualData = photo.split(',')[1];

                photos.push({ data: actualData, name: ("site_photo_" + i + "." + ext).toString() });
            });
            resolve(photos);
        }
        );

    })

}

//downloads all the images on a report album as a zip
export function downloadAllImages(reportAlbum) {
    fetchAllImages(reportAlbum).then((photos) => {
        //make sure we actually have images
        if (photos.length === 0) return;

        var zip = new JSZip();

        var img = zip.folder("images");
        photos.forEach((photo) => {
            //console.log(photo.data);
            img.file(photo.name, photo.data, { base64: true });
        });
        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                // see FileSaver.js
                saveAs(content, "images.zip");
            });
    });
}


// Returns severity rating based on average rate
// See severityRatings.js for severity rating values
export function findSeverityRating(avgRate) {
    if (avgRate >= SeverityRatings.None.min)
        return SeverityRatings.None;
    if (avgRate >= SeverityRatings.Strong.min && avgRate < SeverityRatings.Strong.max)
        return SeverityRatings.Strong;
    if (avgRate >= SeverityRatings.Weak.min && avgRate < SeverityRatings.Weak.max)
        return SeverityRatings.Weak;
    else return SeverityRatings.None;
}

