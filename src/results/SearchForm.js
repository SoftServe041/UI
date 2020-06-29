import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import DropDownDeparture from '../main_page/DropDownDeparture';
import DropDownArrival from "../main_page/DropDownArrival";
import cities from '../main_page/cities.json';
import '../App.css';

function SearchForm(props) {
    return (
        <Form onSubmit={props.submitHandler} onChange={props.handleChange}>
            <Row className='my-3'>
                <Col>
                    <h5>Cargo Information:</h5>                
                </Col>
            </Row>
            <Row className='my-3'>
                <Col>
                    <Form.Label>Weight (kg):</Form.Label>
                    <Form.Control type="number" name="weight" placeholder={props.weight} min="1" max="22000" />
                </Col>
                <Col >
                    <Form.Label>Length (cm):</Form.Label>
                    <Form.Control type="number" name="length" placeholder={props.length} min="1" max="3000" />
                </Col>
                <Col >
                    <Form.Label>Width (cm):</Form.Label>
                    <Form.Control type="number" name="width" placeholder={props.width} min="1" max="3000" />
                </Col>
                <Col >
                    <Form.Label>Height (cm):</Form.Label>
                    <Form.Control type="number" name="height" placeholder={props.height} min="1" max="3000" />
                </Col>
            </Row>
            <Row className='my-3'>
                <Col className='dropdown'>
                    <Form.Label>From:</Form.Label>
                    <DropDownDeparture handleSelectedDeparture={props.handleSelectedDeparture}
                        cities={props.citiesList}
                        departure={props.departure} />
                </Col>
                <Col className='dropdown'>
                    <Form.Label>To:</Form.Label>
                    <DropDownArrival handleSelectedArrival={props.handleSelectedArrival}
                        cities={props.citiesList}
                        arrival={props.arrival} />
                </Col>
                <Col>
                    <Button id="body-button" type="submit" onClick={props.submitHandler}>Update</Button>
                </Col>
            </Row>
            <Row className='my-3'>
                <Col >
                    {(props.ifFormIncorrect) && (<p>Please make sure that you have filled all details correctly</p>)}
                    {console.log(props.ifFormIncorrect)}
                </Col>
            </Row>
        </Form>
    );
}

export default SearchForm;