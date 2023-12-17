import React from 'react';
import { Col, Card, Placeholder, Button } from 'react-bootstrap';

const VideoCardPlaceholder = () => {
    return (
        <Col>
            <Card bg="dark" text="white" style={{ height: 310, width: 420 }}>
                <Placeholder as={Card.Img} variant="top" style={{ height: 190, width: 420 }} />
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow" style={{ width: '60%' }}>
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                         <Placeholder xs={4} />
                        <Placeholder xs={2} />
                         <Placeholder xs={8} />
                    </Placeholder>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default VideoCardPlaceholder;
