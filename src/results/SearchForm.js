import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

// class SearchForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {

//         }
//     }

//     render() {
function SearchForm(props) {
    return (
        <Form onSubmit={props.submitHandler} onChange={props.handleChange}>
            <Row>
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
            <Row>
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
            <Row>
                <Col >
                    {(props.ifFormIncorrect) && (<p>Please make sure that you have filled all details correctly</p>)}
                </Col>
            </Row>
        </Form>
    );
}

export default SearchForm;