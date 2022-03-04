
import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap'

import { getPhotoFromID, deletePhoto } from './albumsSlice'

export const PhotoCard = ({ name, index, fullID, thumbnailID, reportID, file }) => {

    let [data, setData] = useState("No Data");

    // Set file to thumbail size
    let thumbnail = document.getElementById("img");
        if (thumbnail && thumbnail.style) {
            thumbnail.style.height = '100px';
            thumbnail.style.width = '200px';
        }

    // useEffect(() => {
    //     getPhotoFromID(fullID, (d) => { setData(d) });
    // }, []);

    function handleDelete() {
        deletePhoto({reportID, index});
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>
                    <img src={file} id="img"/>
                </Card.Title>
                <Button variant="danger col-12" onClick={handleDelete()}>Delete</Button>
            </Card.Body>
            <Card.Text>
                {data}
            </Card.Text>
        </Card>
    );
}