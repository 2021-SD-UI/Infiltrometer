
let db = undefined;
let open = false;

export function IntiializePhotoDB() {
    var req = indexedDB.open('photoDB', 1);
    req.onsuccess = function (evt) {
        // Equal to: db = req.result;
        db = this.result;
        console.log("openDb DONE");
    };
    req.onerror = function (evt) {
        console.error("openDb:", evt.target.errorCode);
    };

    req.onupgradeneeded = function (evt) {

        db = this.result;
        console.log("openDb.onupgradeneeded");
        db.createObjectStore('photos', { keyPath: 'id', autoIncrement: true });
        open = true;
    };
}

export function clearPhotos() {
    if (db === undefined) { console.log("The database has not been initialized!"); return; }
    let tx = db.transaction('photos', 'readwrite');
    let request = tx.objectStore('photos').clear();
    request.onerror = error => {
        console.log(error);
    }
}

export function addPhotoToDB(photoID, photoData) {
    if (db === undefined) { console.log("The database has not been initialized!"); return; }
    let tx = db.transaction('photos', 'readwrite');
    let request = tx.objectStore('photos').add({ id: photoID, value: photoData });
    request.onerror = error => {
        console.log(error);
    }
}




export function deletePhotoFromDB(photoID) {
    if (db === undefined) { console.log("The database has not been initialized!"); return; }
    let tx = db.transaction('photos', 'readwrite');
    let request = tx.objectStore('photos').delete(photoID);
    request.onerror = error => {
        console.log(error);
    }
}

export function getPhoto(photoID, callback) {
    let transaction = db.transaction("photos");
    let request = transaction.objectStore("photos").get(photoID);
    request.onerror = function (error) { console.log(error); callback(error); }
    request.onsuccess = function (val) { console.log(val.target.result.value); callback(val.target.result.value); }

}


