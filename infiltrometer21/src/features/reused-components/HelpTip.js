import { Popover, OverlayTrigger, Row } from 'react-bootstrap';
import { BsFillQuestionCircleFill as Qmark } from 'react-icons/bs';




export const HelpTip = ({ title, content, size }) => {


    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">{title}</Popover.Title>
            <Popover.Content>
                {content}
            </Popover.Content>
        </Popover>
    );

    return (
        <>
            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                <Qmark size={size} />
            </OverlayTrigger>
        </>
    );
}