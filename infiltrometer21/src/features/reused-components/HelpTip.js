import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import { BsFillQuestionCircleFill as Qmark } from 'react-icons/bs';

export const HelpTip = ({ title, content, size }) => {
    return (
        <OverlayTrigger rootClose trigger="click" placement="top" overlay={
            <Popover>
                <Popover.Header as="h3">{title}</Popover.Header>
                <Popover.Body>
                    {content}
                </Popover.Body>
            </Popover>
        }>
            <Button variant="outline-dark" size="sm">?</Button>
        </OverlayTrigger>
    );
}