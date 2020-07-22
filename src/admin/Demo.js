import React, { useState, useEffect } from 'react';
import './admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Row, ListGroup } from "react-bootstrap";
import '../App.css';


const test = ["2020-07-22 15:32:18.826  INFO 18188 --- [main] com.cargohub.AlgorithmMasterDbApp        : Starting AlgorithmMasterDbApp on DESKTOP-6M3SM08 with PID 18188 (C:\\Users\\SvampX\\IdeaProjects\\AlgorithmMasterDB\\target\\classes started by SvampX in C:\Users\SvampX\\IdeaProjects\\AlgorithmMasterDB)",
"2020-07-22 15:32:18.830  INFO 18188 --- [main] com.cargohub.AlgorithmMasterDbApp        : No active profile set, falling back to default profiles: default",
"2020-07-22 15:32:19.529  INFO 18188 --- [main] .s.d.r.c.RepositoryConfigurationDelegate : Multiple Spring Data modules found, entering strict repository configuration mode!",]
const add = ["String4", "String5"]

export default class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            ifStatred: false
        }
    }

    startDemo() {
        if (!this.state.ifStatred){
        /*axios({
            'method': 'GET',
            'url': url,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer_${props.token}`,
            },
        }).then(response => {
            if (response.status === 200) {
                initialiseExistedHubs(response.data);
            }
        }).catch(error => {
            console.log('erroring from getExistedHubs: ', error);
        });*/
        this.setState({ array: test, ifStatred: true })
    }}

    update() {
        if (this.state.ifStatred) {
            /*axios({
         'method': 'GET',
         'url': url,
         'headers': {
             'Access-Control-Allow-Origin': '*',
             'Content-Type': 'application/json',
             'Authorization': `Bearer_${props.token}`,
         },
     }).then(response => {
         if (response.status === 200) {
             initialiseExistedHubs(response.data);
         }
     }).catch(error => {
         console.log('erroring from getExistedHubs: ', error);
     });*/
            this.updateArray();
        }
    }

    updateArray() {
        let temp = this.state.array;
        add.map(t => temp.push(t));
        this.setState({ array: temp })
        this.listArray();
        console.log(this.state.array);
    }

    listArray(array) {
        return (
            <Col >
            <ListGroup>
                {this.state.array.map((string) => {
                    return (<ListGroup.Item horizontal="lg">{string} </ListGroup.Item>)
                })
                }
            </ListGroup>
            </Col>
        )
    }

    checkArray(array) {
        if (array.length < 1) {
            return (
                <Col md={{ offset: 4 }}>
                    <h2>Starting Demo</h2>
                </Col>
            )
        }
        else {
            return this.listArray(array);
        }
    }

    render() {
        return (
            <div>
                <Row style={{ paddingTop: "15px" }}>
                    <Col md={{ span: 3, offset: 2 }}><Button id="body-button" onClick={() => { this.startDemo() }}>Start Demo</Button>
                    </Col>

                    <Col md={{ span: 3, offset: 2 }}><Button id="body-button" onClick={() => { this.update() }}>Update</Button>
                    </Col>
                </Row>

                <Row style={{ padding: "15px" }}>
                    {this.checkArray(this.state.array)}
                </Row>
            </div>
        );
    }

}
