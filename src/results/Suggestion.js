import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

function Suggestion(props) {
    const history = useHistory();
    const routeChange = () =>{ 
        let path = `path to payment page`;  // don't forget to change
        history.push(path);
      }

    return(
        <li>
            <Row>
                <Col>
                    <p>Price: {props.price}</p>
                    <p>Delivery Date: {props.deliveryDate}</p>
                </Col>
                <Col>
                    <Button onClick={routeChange} >Pay Now</Button>
                </Col>
            </Row>
        </li>
    );
}
export default Suggestion;