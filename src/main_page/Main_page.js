import React, { useState, setState } from 'react';
import cities from './cities.json';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button, Container , FormControl, Dropdown} from "react-bootstrap";
import '../App.css';
import DropDownDeparture from './DropDownDeparture';
import DropDownArrival from "./DropDownArrival";

//import Dropdown from "react-bootstrap/Dropdown";
//import FormControl from "react-bootstrap/FormControl";




const formValid = ({ departure, arrival, weight }) => {
    let valid = true;


    if (departure.length < 3) { valid = false; return valid }
    if (arrival.length < 3) { valid = false; return valid }
    if (weight.length < 1) { valid = false; return valid }


    return valid;
}



class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            departure: 'Departure',
            arrival: 'Arrival',
            weight: '',

            ifFormIncorrect: false,
        }
        this.handleSelectedDeparture = this.handleSelectedDeparture.bind(this);
        this.handleSelectedArrival = this.handleSelectedArrival.bind(this);
        //this.componentDidMount = this.componentDidMount.bind(this);

    }

    submitHandler = e => {
        const url = 'http://localhost:3000/'
        e.preventDefault();


        if (formValid(this.state)) {
            console.log(this.state)
            axios.post(url, this.state)
                .then(response => {
                    console.log(response)
                    if (response.status === 201) {


                    }
                    if (response.status === 404) {


                    }
                })
                .catch(error => {
                    console.log(error)
                    if (error.status === 404) {
                        window.location = "/error"

                    }
                });

        } else {
            this.setState({ ifFormIncorrect: true })
            console.error("Invalid form");
        }

    }


    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        e.preventDefault();
        this.setState({ ifFormIncorrect: false })

    }




    handleSelectedDeparture(e) {
        this.setState({ departure: e });
    }

    handleSelectedArrival(e) {
        this.setState({ arrival: e });
    }

/*
    async componentDidMount() {
        this.setState({ departure: cities.cities.city[0].name, arrival: cities.cities.city[1].name });
    }
    */



    render() {


        return (
            <div>

                <Row id="title-row">
                    <Col md={{ span: 3, offset: 5 }}>
                        <h2 className="title-text"> Search Routs  </h2>
                    </Col>
                </Row>

                <Container id="load-body" >
                    <Row >
                        <Col md={{ span: 5, offset: 3 }}>
                            <Form onSubmit={this.submitHandler} onChange={this.handleChange}>
                                <Row>
                                    <Form.Label column sm={5}>
                                        Location:
                                </Form.Label>
                                </Row>

                                <Row>
                                    <Col >
                                        <DropDownDeparture handleSelectedDeparture={this.handleSelectedDeparture}
                                                           cities={cities}
                                                           departure={this.state.departure}
                                        >
                                        </DropDownDeparture>
                                    </Col>
                                    <Col >
                                        <DropDownArrival handleSelectedArrival={this.handleSelectedArrival}
                                                           cities={cities}
                                                           arrival={this.state.arrival}
                                        >
                                        </DropDownArrival>
                                        {//<Form.Control className="Input1" type="text" name="arrival" placeholder="Arrival" />
                                        }
                                    </Col>
                                </Row>

                                <Row>
                                    <Form.Label column sm={5}>
                                        Cargo Information:
                                </Form.Label>
                                </Row>

                                <Row>
                                    <Col md={{ span: 5, offset: 0 }}>
                                        <Form.Control type="number" name="weight" placeholder="Ton" />
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


                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}


export default MainPage;