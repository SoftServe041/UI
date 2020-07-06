import React from "react";
import './footer.css'
import { Row, Col } from 'react-bootstrap';
import fb from '../files/fb.png';
import instagram from '../files/instagram.png';
import twitter from '../files/twitter.png';

function Footer() {
    return (
        <Row className="footer">
            <Col md={{ span: 3, offset: 1 }}>
                <p className="p1">© 2020 Cargo Hub. All rights reserved </p>

            </Col>

            <Col className="icons" md={{ span: 2, offset: 6 }} style={{padding: '10px'}}>
                <Row>
                    <a href=""><img style={{ height: '40px' }} src={fb} alt="" /></a>
                    <a href=""><img style={{ height: '40px' }} src={instagram} alt="" /></a>
                    <a href=""><img style={{ height: '40px' }} src={twitter} alt="" /></a>
                </Row>
            </Col>
        </Row>
    )
}
export default Footer;