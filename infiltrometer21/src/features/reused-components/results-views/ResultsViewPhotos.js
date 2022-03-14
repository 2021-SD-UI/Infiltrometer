import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container, Row, Col, CardGroup } from 'react-bootstrap';
import { selectCurId, selectReports } from "../../reports/reportsSlice";
import { addPhoto, deleteAllPhotos, selectAlbums, getPhotoFromID } from '../../photos/albumsSlice';
import { PhotoCard } from '../../photos/PhotoCard'

export const ResultsViewPhotos = (props) => {

    const dispatch = useDispatch();

    const reports = useSelector(selectReports);
    const reportId = useSelector(selectCurId);
    const curReportAlbum = useSelector(selectAlbums)[reportId];
    const numPhotos = curReportAlbum !== undefined && curReportAlbum !== null ? curReportAlbum.length : 0;
    const [file, setFile] = useState("FILE");

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

        return setFile(url);
    }

    return (
        <>
            <Container className="d-flex justify-content-center">
                <CardGroup>
                    <Row>
                        {curReportAlbum === null || curReportAlbum === undefined ? <> No Photos </>
                                    : curReportAlbum.map((photo, index) =>
                                            <PhotoCard
                                                id={photo.thumbnail}
                                                index={index}
                                                fullID={photo.full}
                                                thumbnailID={photo.thumbnail}
                                                reportId={reportId} 
                                                file={file}
                                            />
                                        
                                    )
                                
                        }
                    </Row>
                </CardGroup>
            </Container>

            <Row className="mt-2 mb-2 text-center">
                <Col>
                    <Button 
                        className="text-center w-50" 
                        variant="success"
                        size="lg"
                        as="input" type="file" onChange={handleFile} 
                    />
                </Col>
            </Row>
            <Row className="mt-2 mb-5 text-center">
                <Col>
                    <Button
                        className="w-50" 
                        variant="danger"
                        size="lg" 
                        onClick={() => {
                            dispatch(deleteAllPhotos({
                                reportId
                            }));
                        }}
                    >
                        Delete All Photos
                    </Button>
                </Col>
            </Row>



        </>
    )





}