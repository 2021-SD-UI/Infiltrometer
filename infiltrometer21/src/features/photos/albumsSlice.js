import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { addPhotoToDB, deletePhotoFromDB, getPhoto } from './photoDatabase';


//structure like 
//const initialState = {
//   [reportId]:
//   [{thumbnail: GUID, full:GUID}]
//   
//}
const initialState = {};

export const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        addPhoto: (state, action) => {

            let {
                reportId,
                thumbnailData,
                fullImageData
            } = action.payload;

            //generate uids for the images
            let thumbnailID = uuidv4();
            let fullID = uuidv4();

            //add the photo data to indexDB
            addPhotoToDB(thumbnailID, thumbnailData);
            addPhotoToDB(fullID, fullImageData);

            // Push a new photo into the store
            if (state[reportId]) {
                state[reportId] = [...state[reportId],
                {
                    thumbnail: thumbnailID,
                    full: fullID,
                }
                ];
            }
            else {
                state[reportId] = [
                    {
                        thumbnail: thumbnailID,
                        full: fullID,
                    }
                ];
            }


        },
        //delete a single photo group
        deletePhoto: (state, action) => {

            let {
                reportId,
                photoIndex
            } = action.payload;

            //remove the photo in the state
            if (state[reportId] != undefined && state[reportId] != null) {
                if (state[reportId][photoIndex] != null) {
                    //delete the photos from indexDB
                    deletePhotoFromDB(state[reportId][photoIndex].thumbnail);
                    deletePhotoFromDB(state[reportId][photoIndex].full);
                }
                else return;
            } else return;

            //remove from store
            state[reportId].splice(photoIndex, 1);

        },
        //deletes all photos on the report group
        deleteAllPhotos: (state, action) => {

            let {
                reportId,

            } = action.payload;

            //remove the photo in the state
            if (state[reportId]) {
                state[reportId].forEach(photoGroup => {
                    //delete the photos from indexDB
                    deletePhotoFromDB(photoGroup.thumbnail);
                    deletePhotoFromDB(photoGroup.full);
                })
            } else return;

            //remove from store
            state[reportId] = null;

        }
    }
});

export const { addPhoto, deletePhoto, deleteAllPhotos } = albumsSlice.actions;
export const selectAlbums = (state) => state.album;

/**
 * 
 * @param {The id of the photo} id
 * @param {The function that is called when the photo is returned from indexedDB,
 * base64 data is passed to the function} callback 
 */
export const getPhotoFromID = getPhoto;

export default albumsSlice.reducer;