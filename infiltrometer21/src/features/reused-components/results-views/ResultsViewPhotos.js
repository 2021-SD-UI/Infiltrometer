import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { selectCurId, selectReports } from "../../reports/reportsSlice";
import { addPhoto, deleteAllPhotos, selectAlbums, getPhotoFromID } from '../../photos/albumsSlice';
import { PhotoCard } from '../../photos/PhotoCard'
export const ResultsViewPhotos = (props) => {

    const dispatch = useDispatch();

    const reports = useSelector(selectReports);
    const reportId = useSelector(selectCurId);
    const curReportAlbum = useSelector(selectAlbums)[reportId];
    const numPhotos = curReportAlbum !== undefined && curReportAlbum !== null ? curReportAlbum.length : 0;
    const [file, setFile] = useState(null);

    //const fullImageData = "DUMMY_DATA_FULL";
    const thumbnailData = "DUMMY_DATA_Thumbnail";

    let [photoData, setPhotoData] = useState("DATA HERE");
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


    // function getMostRecentPhotoData() {
    //     if (numPhotos === 0) {
    //         photoData = "No Photos";
    //         return;
    //     }
    //     photoData = "Loading...";
    //     getPhotoFromID(curReportAlbum[0].full, function (val) { setPhotoData(val); });
    // }

    function handleFile(e) {
        let url = URL.createObjectURL(e.target.files[0]);

        let xhRequest = new XMLHttpRequest();
        xhRequest.onload = function () {
            let reader = new FileReader();
            reader.onloadend = function () {
                dispatch(addPhoto({ reportId, thumbnailData: "WIP", fullImageData: reader.result }));
            }
            reader.readAsDataURL(xhRequest.response);
        };
        xhRequest.open('GET', url);
        xhRequest.responseType = 'blob';
        xhRequest.send();

    }

    function getMostRecentPhotoData() {
        if (numPhotos === 0) {
            photoData = "No Photos";
            return;
        }
        photoData = "Loading...";
        getPhotoFromID(curReportAlbum[0].full, function (val) { setPhotoData(val); });
    }

    return (
        <>
            <Button as="input" variant="light" type="file" onChange={handleFile}></Button>
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
            <Row>
                <Col>
                    {curReportAlbum === null || curReportAlbum === undefined ? "No Photos"
                        : curReportAlbum.map((photo) => <PhotoCard name={photo.thumbnail} fullID={photo.full} thumbnailID={photo.thumbnail} />)}
                </Col>
            </Row>

        </>
    )





}