
//just used to upgrade if needed
export function InitializePhotoDB() { OpenPhotoDB(); }
const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.moz_indexedDB;
function OpenPhotoDB() {
    return new Promise(function (resolve, reject) {
        var req = indexedDB.open('photoDB');
        req.onsuccess = function (evt) {
            // Equal to: db = req.result;
            var db = req.result;
            console.log("openDb DONE");
            resolve(db);
        };
        req.onerror = function (evt) {
            console.error("openDb:", req.errorCode);
            reject("Error while opening database");
        };

        req.onupgradeneeded = function (evt) {

            var db = req.result;
            console.log("openDb.onupgradeneeded");
            db.createObjectStore('photos', { keyPath: 'id', autoIncrement: true });
            resolve(db);
        };
    })

}

export function clearPhotos() {
    OpenPhotoDB().then((db) => {
        let tx = db.transaction('photos', 'readwrite');
        let request = tx.objectStore('photos').clear();
        request.onerror = error => {
            console.log(error);
        }
    });

}

export function addPhotoToDB(photoID, photoData) {
    OpenPhotoDB().then((db) => {
        let tx = db.transaction('photos', 'readwrite');
        let request = tx.objectStore('photos').add({ id: photoID, value: photoData });
        request.onerror = error => {
            console.log(error);
        }
    });
}




export function deletePhotoFromDB(photoID) {
    OpenPhotoDB().then((db) => {
        let tx = db.transaction('photos', 'readwrite');
        let request = tx.objectStore('photos').delete(photoID);
        request.onerror = error => {
            console.log(error);
        }
    });
}


export function getPhoto(photoID) {
    return new Promise((resolve, reject) => {
        OpenPhotoDB().then((db) => {
            let transaction = db.transaction("photos");
            let request = transaction.objectStore("photos").get(photoID);

            request.onerror = function (error) {
                console.log(error);
                resolve(null);
            }

            request.onsuccess = function (val) {
                if (val.target.result === undefined) return; //console.log(val.target.result.value);
                resolve(val.target.result.value);
            }
        });

    })

}


