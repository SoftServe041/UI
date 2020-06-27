import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import DropDownDeparture from '../main_page/DropDownDeparture';
import DropDownArrival from "../main_page/DropDownArrival";
import cities from '../main_page/cities.json';
import '../App.css';

// class SearchForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {

//         }
//     }

//     render() {
function SearchForm(props) {
    console.log("props in searchform ",cities, props);
    return (
        <Form onSubmit={props.submitHandler} onChange={props.handleChange}>
            <Row className='my-3'>
                <Col>
                    <Form.Control type="number" name="weight" placeholder={props.weight} min="0" max="22000" />
                </Col>
                <Col >
                    <Form.Control type="number" name="length" placeholder={props.length} min="0" max="3000" />
                </Col>
                <Col >
                    <Form.Control type="number" name="width" placeholder={props.width} min="0" max="3000" />
                </Col>
                <Col >
                    <Form.Control type="number" name="height" placeholder={props.height} min="0" max="3000" />
                </Col>
            </Row>
            <Row className='my-3'>
                <Col >
                    {/* ??? */}
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