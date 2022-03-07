/**
 * 
 * @param {Returns the reading with geo data, if possible
 * If geo data cannot be collected, fills with "N/A"} reading 
 * @param {Function to call after finishing adding the data, takes the new reading
 * as a param} onFinished 
 */
export function addGeoDataToReading(reading, onFinished) {

    //try to get the geolocation data
    navigator.geolocation.getCurrentPosition((pos) => {
        //add the intial reading
        onFinished({
            ...reading,
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
        });

    },
        (err) => {
            //add the intial reading
            onFinished({
                ...reading,
                lat: "N/A",
                lon: "N/A"
            });
        }
    )

}