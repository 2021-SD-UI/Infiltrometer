
import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from 'react-textarea-autosize';
import { selectNotes, setNotes } from "../../reports/reportsSlice";
export const ResultsViewNotes = () => {

    const dispatch = useDispatch();
    const [notes, setState] = useState(useSelector(selectNotes));
    const changeNotes = (event) => {
        dispatch(setNotes(event));
        setState(event);
    }
    useEffect(() => setState(notes), [notes]);
    return (
        <>
            <Row className="justify-content-center">
                <Col xs={11}>
                    <Form.Label as="h4">Notes</Form.Label>
                    <TextareaAutosize className="w-100" value={notes} onChange={(e) => changeNotes(e.target.value)} />
                </Col>
            </Row>
            <hr/>
        </>
    );
}