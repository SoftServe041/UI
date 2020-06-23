import React, { useState, } from 'react';
import Users from './users.js';
import Hubs from './hubs.js';
import Transport from './transport.js';
import { Button, Tab, Nav, } from "react-bootstrap";
import './admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Admin() {
    const [existedHubs, setExistedHubs] = useState([]);

    return (
        <Tab.Container defaultActiveKey="transports">
            <Button id='title' size="lg" block>
                <h1 className='title-text font-weight-bold'>Adminstator's page</h1>
            </Button>
            <Nav variant="tabs bg-title-black" fill>
                <Nav.Item className='col-md-2 ml-3 h4 font-weight-bold'>
                    <Nav.Link className='title-text grey-bg mb-1 mt-1' eventKey="users">Users</Nav.Link>
                </Nav.Item>
                <Nav.Item className='col-md-2 h4 font-weight-bold'>
                    <Nav.Link className='title-text grey-bg mb-1 mt-1' eventKey="hubs">Hubs</Nav.Link>
                </Nav.Item>
                <Nav.Item className='col-md-2 h4 font-weight-bold'>
                    <Nav.Link className='title-text grey-bg mb-1 mt-1' eventKey="transports">Transports</Nav.Link>
                </Nav.Item>
                <Nav.Item className='col-md-2 h4 font-weight-bold'>
                    <Nav.Link className='title-text grey-bg mb-1 mt-1' eventKey="extratab">Extra</Nav.Link>
                </Nav.Item>
            </Nav>
            <Tab.Content>
                <Tab.Pane eventKey="extratab">
                    <h1 className='component'>
                        <p>dfdsaf</p>

                    </h1>
                    <h1>cc</h1>
                </Tab.Pane>
                <Tab.Pane eventKey="users">
                    <Users />
                </Tab.Pane>
                <Tab.Pane eventKey="hubs">
                    <Hubs setExistedHubs={setExistedHubs} existedHubs = {existedHubs}/>
                </Tab.Pane>
                <Tab.Pane eventKey="transports">
                    <Transport existedHubs={existedHubs} />
                </Tab.Pane>
            </Tab.Content>
        </Tab.Container>
    );

}


