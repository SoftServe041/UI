import React, { useEffect, useState } from 'react';
import { Pagination, Table, Dropdown, DropdownButton, Button, Form, Modal, Row, Col } from "react-bootstrap";
import axios from 'axios';

function MultipleCargo(props) {

    const [flag, setFlag] = useState(true);

    const [boxes, setBox] = useState([
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
            console.log('responsing from create cargo: ', response.status);
            if (response.status === 201) {
                setFlag(true);

            }
        }).catch(error => {
            console.log('erroring from create cargo: ', error);

        });
    }

    function addNewBox() {
        setBox([...boxes,
        {
            maximumWeight: weight,
            volume: {
                width: width,
                height: height,
                length: length,
            }
        }]);

    }

    function removeBox(index) {
        let newBoxes = [].concat(boxes);
        newBoxes.splice(index, 1);
        setBox(newBoxes);
    }

    useEffect(() => {
        if (flag) {

            setFlag(false);
        }
    });
    return (
        <div>
            <Modal show={props.showFlag} onHide={() => { }} animation='true'>
                <Modal.Header>
                    <Modal.Title className="font-weight-bold ml-3">
                        Cargo in order
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label className='pl-4 font-italic' column sm="12">
                                Cargo list:
                            </Form.Label>
                        </Form.Group>
                        <Row>
                            <Form.Label className='text-center font-italic' column sm="2">Weight</Form.Label>
                            <Form.Label className='text-center font-italic' column sm="2">Width</Form.Label>
                            <Form.Label className='text-center font-italic' column sm="2">Height</Form.Label>
                            <Form.Label className='text-center font-italic' column sm="2">Length</Form.Label>
                        </Row>

                        {
                            boxes.map((box, index) =>
                                <Row key={index}>
                                    <Form.Label className='text-center' column sm="2">
                                        {
                                            box.maximumWeight
                                        }
                                    </Form.Label>
                                    <Form.Label className='text-center' column sm="2">
                                        {
                                            box.volume.width
                                        }
                                    </Form.Label>
                                    <Form.Label className='text-center' column sm="2">
                                        {
                                            box.volume.height
                                        }
                                    </Form.Label>
                                    <Form.Label className='text-center' column sm="2">
                                        {
                                            box.volume.length
                                        }
                                    </Form.Label>
                                    <Form.Label className='text-center' column sm="4">
                                        <Button variant="outline-danger" size="sm" onClick={() => removeBox(index)}>
                                        remove
                                        </Button>
                                    </Form.Label>
                                </Row>
                            )
                        }

                        <Form.Group as={Row} className='mt-1 mr-2 ml-1 pt-1 pb-1' style={{ border: '1px grey solid' }}>
                            <Col>
                                <Form.Control type="number" size='sm' defaultValue={weight} onChange={(e) => setWeight(e.target.value)} />
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
                                <Button variant='outline-success' onClick={() => addNewBox() } size="sm"> add </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button id="body-button" className='col-md-5 mr-3' onClick={() => { }}>
                        Create
                    </Button>
                    <Button id="body-button2" className='col-md-5 mr-4' onClick={() => { props.handleModal() }}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

}


export default MultipleCargo;