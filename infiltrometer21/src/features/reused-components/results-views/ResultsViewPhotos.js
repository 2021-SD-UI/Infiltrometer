import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container, Row } from 'react-bootstrap';
import { selectCurId, selectReports } from "../../reports/reportsSlice";
import { addPhoto, deleteAllPhotos, selectAlbums, getPhotoFromID } from '../../photos/albumsSlice';
export const ResultsViewPhotos = (props) => {

    const dispatch = useDispatch();

    const reports = useSelector(selectReports);
    const reportId = useSelector(selectCurId);
    const curReportAlbum = useSelector(selectAlbums)[reportId];
    const numPhotos = curReportAlbum !== undefined ? curReportAlbum.length : 0;

    const fullImageData = "DUMMY_DATA_FULL";
    const thumbnailData = "DUMMY_DATA_Thumbnail";

    let photoData = "DATA HERE";
    //displays the most recent photo
    const PhotoData = (props) => {
        return (
            <>
                <Container>
                    <Row>
                        {photoData}
                    </Row>
                </Container>
            </>)
    }


    function getMostRecentPhotoData() {
        if (numPhotos === 0) {
            photoData = "No Photos";
            return;
        }
        photoData = "Loading...";
        getPhotoFromID(curReportAlbum[0].fullImageData, (data) => {
            photoData = data;
        });
    }

    return (
        <>
            <Button onClick={() => {
                dispatch(addPhoto({
                    reportId,
                    thumbnailData,
                    fullImageData
                }));
            }}>
                Add Photo
            </Button>
            <Button onClick={() => {
                dispatch(deleteAllPhotos({
                    reportId
                }));
            }}>
                Delete All Photo
            </Button>

            <Button onClick={getMostRecentPhotoData()}>
                Display Most Recent Photo
            </Button>

            <PhotoData />
        </>
    )





}