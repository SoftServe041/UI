import React from 'react';
import './main_page.css';
import axios from 'axios';
import {Container, Button, Form, Row, Col} from 'react-bootstrap';

const formValid = ({ formErrors, departure, arrival , weight }) => {
    let valid = true;

    Object.values(formErrors).forEach( val => {
        val.length > 0 && (valid = false);
    });


    return valid;
}

function gettingCargoWeight(e) {
    e.preventDefault();
    console.log(e.props);
}

function FormSubmit(){
    // e.preventDefault();
    console.log(this.props.name);
}

class MainPage extends React.Component{

    constructor(props){
        super(props);

        //const modalsOpen = props.modalsOpen;
        this.state = {
            departure: '',
            arrival: '',
            weight: '',

            formErrors:{
                departure: "",
                arrival: "",
                weight: ""
            }
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

                })
                .catch(error => {
                    console.log(error)

                });

        } else {
            console.error("Invalid form");
        }

    }


    handleChange = (e) => {
        //this.setState({[e.target.name]: e.target.value})
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        switch(name) {
            case 'departure':
                formErrors.departure =
                    value.length < 6
                        ? ''
                        : 'Please type correct Hub';
                break;
            case 'arrival':
                formErrors.arrival =
                    value.length < 6
                        ? ''
                        : 'Please type correct Hub';
                break;
            case 'weight':
                formErrors.weight = value.length === null
                    ? 'Weight cannot be empty'
                    : "";
                break;
            default:
                break;
        }
        this.setState({formErrors, [name]: value}, () => {console.log(this.state)})
    }


    render(){

        const { formErrors } = this.state;

        return(
            <div>
              <Button id='title' size="lg" block>
                 <h1 className='title-text font-weight-bold'>Search Routes</h1>
              </Button>
         
                <Form>
                <Container fluid>
                    <Row className='mt-2'>
                        <Col className='mb-2 col-2 mt-2 '>
                           <h2 className='text-right body-text align-middle'>Location</h2>
                        </Col>
                        <Col className='mb-2 col-3'>
                           <Form.Control placeholder="departure"/> 
                        </Col>
                        <Col className='mb-2 col-3'>
                             <Form.Control placeholder="arrival"/>
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col className='col-2'>
                            <h2 className='text-right body-text align-middle mt-2'>Cargo Information</h2>
                        </Col>
                        <Col className='col-2'>
                             <Form.Control placeholder="tonnes"/>
                        </Col>
                    </Row>
                    <Row className='mt-2'>
                        <Col sm={2}></Col>
                        <Col className='col-2'>
                            <Button size="sm" variant="outline-secondary" block>
                                <span className='body-text'>Search</span>
                            </Button>
                        </Col>
                    </Row>
                    </Container>      
                </Form>
              
            </div>
        );
    }
}


export default MainPage;