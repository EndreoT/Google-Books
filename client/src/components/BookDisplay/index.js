import React from 'react';

import { Col, Row } from "../Grid";


const BookDisplay = (props) => (
    <React.Fragment>
        <h3>{props.title}</h3>
        <p>Written by {props.authors ? props.authors.join(', ') : 'no information given.'}</p>
        <Row>
            <Col size="md-2 sm-12">
                {
                    props.image ? (
                        <img src={props.image} alt="" />
                    ) :
                        ('')
                }
            </Col>
            <Col size="md-10 sm-12">
                <p>{props.description}</p>
            </Col>
        </Row>
    </React.Fragment>
);

export default BookDisplay;