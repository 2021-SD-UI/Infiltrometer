
import { useEffect, useState } from 'react';
import { Card, Button, Spinner, } from 'react-bootstrap'
import { useDispatch } from 'react-redux';

import { getPhotoFromID, deletePhoto } from './albumsSlice'

export const PhotoCard = ({ name, index, fullID, thumbnailID, reportId, file }) => {

    let [data, setData] = useState(null);
    let dispatch = useDispatch();

    // Set file to thumbail size
    let thumbnail = document.getElementById("img");
    if (thumbnail && thumbnail.style) {
        thumbnail.style.height = '100px';
        thumbnail.style.width = '200px';
    }

    useEffect(() => {
        setData(null)
        getPhotoFromID(fullID, (d) => { setData(d) });
    }, [fullID]);

    return (
        <Card >
            <Card.Img variant="top" src={data} />

            {data === null ? <Card.Text><Spinner animation="border" /></Card.Text> : null}
            <Card.Body>
                <Button variant="danger col-12" onClick={() => {
                    dispatch(deletePhoto({ reportId, photoIndex: index }));
                }
                }>Delete</Button>
            </Card.Body>
        </Card >
    );
}