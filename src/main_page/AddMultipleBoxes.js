import React, { useEffect, useState } from 'react';
import { Pagination, Table, Dropdown, DropdownButton, Button, Form, Modal, Row, Col } from "react-bootstrap";
import axios from 'axios';

function MultipleCargo(props) {
    // let showFlag=props.showFlag;

    const [flag, setFlag] = useState(true);

    const [compartments, setCompartments] = useState([
        {
            maximumWeight: 22,
            volume: {
                width: 240,
                height: 240,
                length: 1200,
            }
        },
    ]);

    const [weight, setWeight] = useState(22);
    const [width, setWidth] = useState(240);
    const [height, setHeight] = useState(240);
    const [length, setLength] = useState(1200);


    function createTransport() {

        axios({
            'method': 'POST',
            'url': "",
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': "",
            },
            data:
            {
            },

        }).then(response => {
            console.log('responsing from create transport: ', response.status);
            if (response.status === 201) {
                setFlag(true);

            }
        }).catch(error => {
            console.log('erroring from create trans: ', error);

        });
    }

    useEffect(() => {
        if (flag) {

            setFlag(false);
        }
    });
    return (
        <div>
            {console.log("срусл іваіва",props) }
            <Modal show={props.showFlag} onHide={() => { }} animation='true'>
                <Modal.Header closeButton>
                    <Modal.Title className="font-weight-bold ml-3">
                        Boxes
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Form.Group as={Row}>
                            <Form.Label className='pl-4' column sm="4">
                                Transport type
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control as="select" >
                                    <option>Choose type</option>

                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label className='pl-4 font-italic' column sm="12">
                                Compartments:
                            </Form.Label>
                        </Form.Group>
                        <Row>
                            <Form.Label className='text-center font-italic' column sm="2">Weight</Form.Label>
                            <Form.Label className='text-center font-italic' column sm="2">Width</Form.Label>
                            <Form.Label className='text-center font-italic' column sm="2">Height</Form.Label>
                            <Form.Label className='text-center font-italic' column sm="2">Length</Form.Label>
                            <Form.Label className='text-center font-italic' column sm="4">Remove</Form.Label>
                        </Row>

                        <Form.Group as={Row} className='mt-1 mr-2 ml-1 pt-1 pb-1' style={{ border: '1px grey solid' }}>
                            <Col>
                                <Form.Control type="number" className='text-left' size='sm' defaultValue={weight} onChange={(e) => setWeight(e.target.value)} />
                            </Col>
                            <Col>
                                <Form.Control type="number" size='sm' defaultValue={width} onChange={(e) => setWidth(e.target.value)} />
                            </Col>
                            <Col>
                                <Form.Control type="number" size='sm' defaultValue={height} onChange={(e) => setHeight(e.target.value)} />
                            </Col>
                            <Col sm="3">
                                <Form.Control type="number" size='sm' defaultValue={length} onChange={(e) => setLength(e.target.value)} />
                            </Col>
                            <Col className="align-middle text-center">
                                <Button onClick={() => { }} size="sm">+</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='col-md-5 mr-3' onClick={() => { }}>
                        Create
                    </Button>
                    <Button className='col-md-5 mr-4' variant='secondary' onClick={() => {props.handleModal()}}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

}


export default MultipleCargo;