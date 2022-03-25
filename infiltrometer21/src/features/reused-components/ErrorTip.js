import { OverlayTrigger, Popover } from 'react-bootstrap';
import { RiErrorWarningFill as ErrorMark } from 'react-icons/ri';

export const ErrorTip = ({ title, content, size }) => {


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
            <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                <ErrorMark size={size} />
            </OverlayTrigger>
        </>
    );
}