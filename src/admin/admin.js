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
            </Tab.Container>
        );
    }
}

