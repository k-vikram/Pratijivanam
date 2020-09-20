import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AllViews from '../../../Modules/Landing/Views/index';

const Content = () => {
    return (
        <Row>
            <Col xs={12}>
                <AllViews />
            </Col>
        </Row>
    )
}

export default React.memo(Content)