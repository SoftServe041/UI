import React, { Component,} from 'react';
import Users from './users.js';
import { Button, Tab, Nav,} from "react-bootstrap";


export default class Admin extends Component {

    constructor(props) {
        super(props);
         this.state = {
            key: 'users',
        }

    }
    render() {
        return (
               <Tab.Container>
                <Button block>
                    <h1 className='font-weight-bold'>Adminstator's page</h1>
                </Button>
                <Nav fill>
                    <Nav.Item className='col-md-2 h4 font-weight-bold'>
                        <Nav.Link className='title-text mb-1 mt-1' eventKey="users">Users</Nav.Link>
                    </Nav.Item>
       
		    <Tab.Content>
	                <Tab.Pane eventKey="users">
                           <Users />
	               </Tab.Pane>
               	    </Tab.Content>
                </Nav>
            </Tab.Container>
        );
    }
}

