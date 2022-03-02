
import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap'

import { getPhotoFromID, deletePhoto } from './albumsSlice'

export const PhotoCard = ({ name, index, fullID, thumbnailID, reportID }) => {

    let [data, setData] = useState("No Data");

    useEffect(() => {
        getPhotoFromID(fullID, (d) => { setData(d) });
    }, []);


    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Button variant="danger col-12">Delete</Button>
            </Card.Body>
            <Card.Text>
                {data}
            </Card.Text>
        </Card>
    );
}