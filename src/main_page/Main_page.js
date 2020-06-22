import React from 'react';
import cities from './cities.json';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button, Container } from "react-bootstrap";
import '../App.css';
import DropDownDeparture from './DropDownDeparture';
import DropDownArrival from "./DropDownArrival";

//import Dropdown from "react-bootstrap/Dropdown";
//import FormControl from "react-bootstrap/FormControl";


/*

const formValid = ({ departure, arrival, weight, ifSameHubSelected }) => {
    let valid = true;

    if (departure === arrival){
         this.setState({ifSameHubSelected: false})
     } else {
         this.setState({ifSameHubSelected: false})
     }


    if (weight.length < 1) { valid = false; return valid }

    return valid;
}
*/


class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            departure: 'Departure',
            arrival: 'Arrival',
            weight: '',
            height: '',
            width: '',
            length: '',
            ifFormIncorrect: false,
            ifSameHubSelected: false,
            routes: [],
            citiesList: [], //to be used instead of cities import json
        }
        this.handleSelectedDeparture = this.handleSelectedDeparture.bind(this);
        this.handleSelectedArrival = this.handleSelectedArrival.bind(this);
        //this.componentDidMount = this.componentDidMount.bind(this);

    }

    formValid = ({ departure, arrival, weight, length, width, height }) => {
        let valid = true;

        if (departure === arrival) {
            this.setState({ ifSameHubSelected: true })
            console.log('this.setState({ifSameHubSelected: true})')
            valid = false;
        } else {
            this.setState({ ifSameHubSelected: false })
            console.log('this.setState({ifSameHubSelected: false})')
            valid = true;
        }

        if (departure === "Departure" || arrival === "Arrival") {
            valid = false;
        }

        if (weight.length < 1) { valid = false; return valid }
        if (height.length < 1) { valid = false; return valid }
        if (length.length < 1) { valid = false; return valid }
        if (width.length < 1) { valid = false; return valid }

        return valid;
    }

    submitHandler = e => {
        const url = 'http://localhost:8080/'
        e.preventDefault();
        this.setState({ ifFormIncorrect: false, ifSameHubSelected: false });


        if (this.formValid(this.state)) {
            console.log(this.state)
            axios.get(url, this.state)
                .then(response => {
                    console.log(response)
                    this.handleReceivedRouts(response.data)

                })
                .catch(error => {
                    console.log(error)
                    if (error.status === 404) {
                        window.location = "/error"
                    }
                });
        } else {
            this.setState({ ifFormIncorrect: true });
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

    handleSwitch(arrival, departure) {
        const tempReplace = arrival;
        if (arrival === "Arrival" && departure === "Departure") { }
        else if (arrival === "Arrival") {
            this.setState({ arrival: departure, departure: "Departure" });
        }
        else if (departure === "Departure") {
            this.setState({ arrival: "Arrival", departure: arrival });
        } else
            this.setState({ arrival: this.state.departure, departure: tempReplace });
    }

    handleReceivedRouts(routs) {
        this.setState({ routs: routs })
    }


    async componentDidMount() {
        /* let result = axios.get(`http://localhost:8041`)
             .then(res => {this.setState({citiesList: res.data})
             console.log(res.data)
 
             })
             //.catch(error => alert('Axios failed ' + error));
             .catch(error => console.log('Axios failed on Main_page.js' + error));
 
         */
    }




    render() {

        return (
            <div>

                <Row id="title-row">
                    <Col md={{ span: 3, offset: 5 }}>
                        <h2 className="title-text"> Search Routs  </h2>
                    </Col>
                </Row>

                <Container id="load-body" >
                    <Row style={{ width: '100%' }}>
                        <Col md={{ span: 5, offset: 3 }}>
                            <Form onSubmit={this.submitHandler} onChange={this.handleChange}>
                                <Row style={{ paddingTop: '15px' }}>
                                    <Col>
                                        <Form.Label >
                                            <h5>Location:</h5>
                                        </Form.Label>
                                    </Col>
                                </Row>

                                <Row >
                                    <Col >
                                        <DropDownDeparture handleSelectedDeparture={this.handleSelectedDeparture}
                                            cities={cities}
                                            departure={this.state.departure}
                                        >
                                        </DropDownDeparture>
                                    </Col>
                                    <Col md={{ offset: 1 }}>
                                        <Button type="button"
                                            style={{ backgroundColor: '#ff8e09', borderColor: '#999999' }}
                                            onClick={() => { this.handleSwitch(this.state.arrival, this.state.departure) }}>
                                            &#8644;
                                        </Button>
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

                                <Row style={{ paddingTop: '15px' }}>
                                    <Col>
                                        <Form.Label  >
                                            <h5>Cargo Information:</h5>
                                        </Form.Label>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={{ span: 5, offset: 0 }}>
                                        <Form.Control type="number" name="weight" placeholder="kg" onInput={(e) => {
                                            if (parseInt(e.target.value) < 22000) {
                                                e.target.value = Math.max(0, parseInt(e.target.value)).toString()
                                            }
                                            else {
                                                e.target.value = 22000
                                            }
                                        }} />
                                    </Col>
                                </Row>

                                <Row style={{ paddingTop: '15px' }}>
                                    <Col>
                                        <Form.Label >
                                            Specify volume in cm:
                                </Form.Label>
                                    </Col>
                                </Row>

                                <Row id="space-between-rows">
                                    <Col >
                                        <Form.Control type="number" name="height" placeholder="Height" onInput={(e) => {
                                            if (parseInt(e.target.value) < 1350) {
                                                e.target.value = Math.max(0, parseInt(e.target.value)).toString()
                                            }
                                            else {
                                                e.target.value = ""
                                            }
                                        }} />
                                    </Col>

                                    <Col >
                                        <Form.Control type="number" name="width" placeholder="Width" onInput={(e) => {
                                            if (parseInt(e.target.value) < 3000) {
                                                e.target.value = Math.max(0, parseInt(e.target.value)).toString()
                                            }
                                            else {
                                                e.target.value = ""
                                            }
                                        }} />
                                    </Col>
                                    <Col >
                                        <Form.Control type="number" name="length" placeholder="Length" onInput={(e) => {
                                            if (parseInt(e.target.value) < 2720) {
                                                e.target.value = Math.max(0, parseInt(e.target.value)).toString()
                                            }
                                            else {
                                                e.target.value = ""
                                            }
                                        }} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col >
                                        {(this.state.ifFormIncorrect) && (<p>Please make sure that you have filled all details correctly</p>)}

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