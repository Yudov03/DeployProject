import React, { useState } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

function EventPopover({ event }) {
    const [show, setShow] = useState(false);

    const handleToggle = () => setShow(!show);

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Event Details</Popover.Header>
            <Popover.Body>
                <p>Title: {event.title}</p>
                <p>Start Time: {event.start}</p>
                <p>End Time: {event.end}</p>
                {/* Thêm thông tin khác nếu cần */}
            </Popover.Body>
        </Popover>
    );

    return (
        <>
            <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                <Button variant="primary" onClick={handleToggle}>
                    View Details
                </Button>
            </OverlayTrigger>
        </>
    );
}

export default EventPopover;
