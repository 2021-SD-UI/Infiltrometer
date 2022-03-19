import { useEffect, useState } from 'react';
import { Card, Button, Spinner, } from 'react-bootstrap'
import { useDispatch } from 'react-redux';

import { getPhotoFromID, deletePhoto } from './albumsSlice'

export const PhotoCard = ({ index, fullID, reportId }) => {
    let [data, setData] = useState(null);
    let dispatch = useDispatch();

    useEffect(() => {
        setData(null)
        getPhotoFromID(fullID).then((d) => { setData(d) });
    }, [fullID]);

    return (
        <Card className="mt-4">
            <Card.Img className="mt-2" variant="top" src={data} />
            <Card.Body className="align-content-right">
                {data === null ? <Card.Text><Spinner animation="border" /></Card.Text> : null}
                <Button variant="outline-danger" size="lg" className="w-100" onClick={() => {
                    dispatch(deletePhoto({ reportId, photoIndex: index }));
                }
                }>Delete</Button>
            </Card.Body>
        </Card >
    );
}