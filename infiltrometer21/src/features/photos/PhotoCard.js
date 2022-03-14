import { useEffect, useState } from 'react';
import { Card, Col, Button } from 'react-bootstrap'
import { getPhotoFromID, deletePhoto } from './albumsSlice'
import { deletePhotoFromDB } from './photoDatabase';

export const PhotoCard = ({ name, index, fullID, thumbnailID, reportID, file }) => {

    let [data, setData] = useState("No Data");
    // setData(file);

    // Set file to thumbail size
    let thumbnail = document.getElementById("img");
        if (thumbnail && thumbnail.style) {
            thumbnail.style.height = '100px';
            thumbnail.style.width = '200px';
        }

    function handleDelete() {
        return 0;
    }

    function test() {
        return true;
    }

    return (
        <Card style={{ width: '18rem' }} className="mx-2 my-2">
            <Card.Img src={file} onClick={test} />
            <Card.Body>
                <Button variant="danger col-12" onClick={handleDelete()}>Delete</Button>
            </Card.Body>
        </Card>
    );
}