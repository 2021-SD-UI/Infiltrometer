import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Container, Row, Col, CardGroup } from 'react-bootstrap';
import { selectCurId, selectReports } from "../../reports/reportsSlice";
import { addPhoto, deleteAllPhotos, selectAlbums } from '../../photos/albumsSlice';
import { PhotoCard } from '../../photos/PhotoCard'
import { downloadAllImages, fetchAllImages } from '../../reports/reportsDataPackager';
export const ResultsViewPhotos = (props) => {
    const dispatch = useDispatch();
    const reportId = useSelector(selectCurId);
    const curReportAlbum = useSelector(selectAlbums)[reportId];
    const hasPhotos = curReportAlbum !== null && curReportAlbum !== undefined && curReportAlbum.length > 0;

    function handleFile(e) {
        if (e.target.files[0] === undefined) return;

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

    const openPhotoUpload = () => {
        document.getElementById("photoInput").click();
    }



    return (
        <>
            <Container className="d-flex justify-content-center">
                <CardGroup>
                    <Row>
                        {!hasPhotos ? <Alert className="mt-2" variant="secondary"> No Photos </Alert>
                            : curReportAlbum.map((photo, index) =>
                                <PhotoCard
                                    index={index}
                                    fullID={photo.full}
                                    reportId={reportId}
                                />

                            )
                        }
                    </Row>
                </CardGroup>
            </Container>

            <Container className="text-center">
                <Row>
                    <Col>
                        <svg className="svg-add-photo" onClick={openPhotoUpload}>
                            <g
                                transform="translate(100.000000, 95.000000) scale(0.01000, -0.010000)">
                                <path d="M4493.4,4986.4c-540.8-55.2-1136.9-227.8-1647.8-478.7C1846.7,4017.5,1091.9,3262.6,604,2268.4C-578.9-143.5,390-3043.3,2783.4-4258.4C5197.6-5485,8141.1-4520.8,9367.8-2104.3c962,1891.8,596.1,4179.4-904.4,5677.6C7425.4,4613.5,5961.7,5133.7,4493.4,4986.4z M7743,2551.5l75.9-66.7V1175.2V-132l-269.3-6.9l-271.6-6.9v1107v1104.7H4999.7H2721.3V546.9V-974.3l131.2,6.9l131.2,6.9l520.1,810.1c285.4,446.5,522.4,810.1,529.3,810.1s244-363.6,529.3-810.1l517.8-810.1l147.3-6.9c119.7-4.6,145,0,133.5,25.3c-6.9,18.4-117.4,195.6-246.3,395.8l-232.4,361.3l156.5,239.3c85.2,133.5,158.8,246.3,165.7,248.6c6.9,4.6,197.9-280.8,423.4-632.9l412-642.1h158.8h158.8l4.6-568.4l6.9-570.8l386.6-6.9l384.3-4.6v-138.1v-138.1H4735H2330l-73.6,66.7l-75.9,66.7V109.7v2375.1l75.9,66.7l73.6,66.7h2669.6h2669.6L7743,2551.5z M6613,1483.6c151.9-80.6,234.7-214,246.3-393.5c6.9-112.8,0-163.4-36.8-234.7c-195.6-379.7-706.5-377.4-881.4,2.3c-108.2,234.8-2.3,510.9,243.9,639.8C6290.8,1555,6491,1545.8,6613,1483.6z M8014.5-856.9v-391.2h379.7H8774v-264.7v-264.7h-379.7h-379.7v-379.7v-379.7h-276.2h-276.2v379.7v379.7h-379.7h-379.7v264.7v264.7h379.7h379.7V-873c0,207.1,6.9,384.3,16.1,391.2c6.9,9.2,131.2,16.1,276.2,16.1h260.1V-856.9z" />
                            </g>
                        </svg>
                        <input hidden type="file" accept="image/*" id="photoInput" onChange={handleFile} />
                        <h4>Add Photo</h4>
                    </Col>
                    {hasPhotos ?
                        <Col>
                            <svg className="svg-delete-photo" onClick={() => { dispatch(deleteAllPhotos({ reportId })); }}>
                                <g
                                    transform="translate(100.000000, 145.000000) scale(0.1000, -0.10000)">
                                    <path d="M500,10C230.5,10,10,230.5,10,500s220.5,490,490,490s490-220.5,490-490S769.5,10,500,10z M726.6,622.5c24.5,24.5,24.5,73.5,0,98c-12.3,12.3-30.6,18.4-49,18.4s-36.8-6.1-49-18.4L506.1,598L383.6,720.5c-24.5,18.4-42.9,24.5-61.3,24.5c-18.4,0-36.8-6.1-49-18.4c-24.5-24.5-24.5-73.5,0-98l122.5-122.5L273.4,383.6c-24.5-24.5-24.5-73.5,0-98s73.5-24.5,98,0l122.5,122.5l122.5-122.5c24.5-24.5,73.5-24.5,98,0s24.5,73.5,0,98L591.9,506.1L726.6,622.5z" />
                                </g>
                            </svg>
                            <h4>Delete All Photos</h4>
                        </Col> : null
                    }
                </Row>
            </Container>
        </>
    )





}
