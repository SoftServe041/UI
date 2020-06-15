import React, {useState} from 'react';
//import './main_page.css';
import  cities from './cities.json';
import 'react-bootstrap';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Button, Container} from "react-bootstrap";
import '../App.css';

import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
import {forEach} from "react-bootstrap/cjs/ElementChildren";




const formValid = ({ departure, arrival , weight }) => {
    let valid = true;


    if (departure.length < 3 ) {valid= false; return valid}
    if (arrival.length < 3 ) {valid= false; return valid}
    if (weight.length < 1 ) {valid= false; return valid}


    return valid;
}

/*
const CitiesList = Object.values( cities).forEach( city => {
    return (<p>{city.name}</p>)

})

 */


function CitiesList() {
    let count = 0;
    Object.values(cities.city).forEach(s => {
        return (
            <div>
                <p>${s.name}</p>
                {//Object.values(cities.city).forEach(s => (<p> s.name </p>))
                }
                {//Object.values(cities.city).forEach(s => (console.log(s.name)))
                }
                {  //console.log(cities.city[2].name)
                }
                { //console.log(cities.city)
                }
            </div>
        );
    })
}

/*
        return(
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
            {Object.values(cities).forEach(s => (<Dropdown.Item>{s[0].name} </Dropdown.Item>))

            }
                    {
                     /*   <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>


                    }
                    </Dropdown.Menu>


            </Dropdown>

    );

*/






class MainPage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            departure: '',
            arrival: '',
            weight: '',

            ifFormIncorrect: false,
        }

    }

    /*
     gettingCargoWeight = async (e) => {
        console.log(e.weight);
        e.preventDefault();
            console.log(e.weight);
    }
    */
    submitHandler = e => {
        const url = 'http://localhost:3000/'
        e.preventDefault();


        if (formValid(this.state)){
            console.log(this.state)
            axios.post(url, this.state)
                .then(response => {
                    console.log(response)
                    if(response.status === 200){

                        window.location = "/search";
                    }
                    if(response.status === 404){
                        window.location = "/error"

                    }
                })
                .catch(error => {
                    console.log(error)
                    if(error.status === 404){
                        window.location = "/error"

                    }
                    //window.location = "/error"
                });

        } else {
            this.setState({ifFormIncorrect: true})
            console.error("Invalid form");
        }

    }


    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
        e.preventDefault();
        this.setState({ifFormIncorrect: false})

    }







    render(){

        return(
            <div>

                <Row id="title-row">
                    <Col md={{ span: 3, offset: 5 }}>
                        <h2 className="title-text"> Search Routs  </h2>
                    </Col>
                </Row>

                <Container id="load-body" >
                <Row >
                    <Col md={{ span: 5, offset: 3 }}>
                        <Form  onSubmit={this.submitHandler} onChange={this.handleChange}>
                            <Row>
                                <Form.Label column sm={5}>
                                    Location:
                                </Form.Label>
                            </Row>

                            <Row>
                                <Col >
                                    <Form.Control className="Input1" type="text" name="departure" placeholder="Departure"  />
                                </Col>
                                <Col >
                                    <Form.Control className="Input1" type="text" name="arrival" placeholder="Arrival"  />
                                </Col>
                            </Row>

                            <Row>
                                <Form.Label column sm={5}>
                                    Cargo Information:
                                </Form.Label>
                            </Row>

                            <Row>
                                <Col md={{ span: 5, offset: 0 }}>
                                    <Form.Control type="number" name="weight"  placeholder="Ton"  />
                                </Col>
                            </Row>

                            <Row>
                                <Col >
                                    {(this.state.ifFormIncorrect) && (<p>Please make sure that you have filled all details</p>)}
                                </Col>
                            </Row>

                            <Row >
                                <Col md={{ span: 3, offset: 5 }}>
                                    <Button id="body-button" type="submit" onClick={this.submitHandler}> Search </Button>

                                </Col>
                            </Row>

                            {
                                //  <CitiesList/>
                            }


                        </Form>
                    </Col>
                </Row>
                </Container>
            </div>
        );
    }
}


export default MainPage;