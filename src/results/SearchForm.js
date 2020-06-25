import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import DropDownDeparture from '../main_page/DropDownDeparture';
import DropDownArrival from "../main_page/DropDownArrival";
import cities from '../main_page/cities.json';
import '../App.css';

function SearchForm(props) {
    console.log(cities, props);
    return (
        <Form onSubmit={props.submitHandler} onChange={props.handleChange}>
            <Row className='my-3'>
                <Col>
                    <Form.Label>Weight:</Form.Label>
                    <Form.Control type="number" name="weight" placeholder={props.weight} min="1" max="22000" />
                </Col>
                <Col >
                    <Form.Label>Length:</Form.Label>
                    <Form.Control type="number" name="length" placeholder={props.length} min="1" max="3000" />
                </Col>
                <Col >
                    <Form.Label>Width:</Form.Label>
                    <Form.Control type="number" name="width" placeholder={props.width} min="1" max="3000" />
                </Col>
                <Col >
                    <Form.Label>Height:</Form.Label>
                    <Form.Control type="number" name="height" placeholder={props.height} min="1" max="3000" />
                </Col>
            </Row>
            <Row className='my-3'>
                <Col >
                    <DropDownDeparture handleSelectedDeparture={props.handleSelectedDeparture}
                        cities={cities}
                        departure={props.departure}
                    >
                        
                    </DropDownDeparture>
                </Col>
                <Col >
                    <DropDownArrival handleSelectedArrival={props.handleSelectedArrival}
                        cities={cities}
                        arrival={props.arrival}
                    >
                    </DropDownArrival>
                </Col>
                <Col >
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