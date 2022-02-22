
import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from 'react-textarea-autosize';
import { selectCurId, selectNotes, selectReports, setNotes } from "../../reports/reportsSlice";
export const ResultsViewNotes = () => {

    const reports = useSelector(selectReports);
    const curReport = reports[useSelector(selectCurId)];
    const notes = useSelector(selectNotes);

    const dispatch = useDispatch();
    const [state, setState] = useState(notes);
    const changeNotes = (event) => {
        dispatch(setNotes(event));
        setState(event);
    }
    useEffect(() => setState(notes), []);
    return (
        <>
            <Row className="justify-content-center mb-5">
                <Col xs={11}>
                    <Form.Label as="h4">Notes</Form.Label>
                    <TextareaAutosize className="w-100" value={state} onChange={(e) => changeNotes(e.target.value)} />
                </Col>
            </Row>
        </>
    );
}