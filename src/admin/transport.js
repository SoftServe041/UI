import React, { useEffect, useState } from 'react';
import { Pagination, Table, Dropdown, DropdownButton, Button, Form, Modal, Row, Col } from "react-bootstrap";
import axios from 'axios';

function Transports(props) {
    let url = 'http://localhost:9041/admin/transport';
    let urlForTransportTypes = 'http://localhost:9041/admin/transport/types';
    const [pagination, setPagination] = useState([]);
    const [activePage, setActivePage] = useState(1);
    let totalPage = 1;
    let existedHubs = props.existedHubs;
    const [flag, setFlag] = useState(true);
    const [transports, setTransports] = useState([]);
    const [transportTypes, setTransportTypes] = useState([]);
    const [boundedHub, setBoundedHub] = useState('');
    const [compartments, setCompartments] = useState([
        {
            maximumWeight: 22,
            volume: {
                width: 240,
                height: 240,
                length: 12000,
            }
        },
    ]);
    const [type, setType] = useState('');
    const [createModalFlag, setCreateModalFlag] = useState(false);
    const [weight, setWeight] = useState(22);
    const [width, setWidth] = useState(240);
    const [height, setHeight] = useState(240);
    const [length, setLength] = useState(12000);
    const [updateModalFlag, setUpdateModalFlag] = useState(false);
    const [currentTransport, setCurrentTransport] = useState({});

    if (transportTypes.length === 0) {
        getAllTransportTypes();
    }
    function initializeData(data) {
        setTransports(data.content);
        setPagination(formPagination(activePage, data.totalPage));
    }

    function updatePagination(newActivePage) {
        setActivePage(newActivePage);
        setFlag(true);
    }
    function formPagination(newActivePage, totalPage) {
        let itemsArray = [];
        for (let number = 1; number <= totalPage; number++) {
            itemsArray.push(
                <Pagination.Item key={number} active={number === newActivePage} onClick={() => updatePagination(number)}>
                    {number}
                </Pagination.Item>,
            );
        }
        return itemsArray;
    }
    function getAllTransports() {
        console.log('getAllTransports', transports);
        axios({
            'method': 'GET',
            'url': url + activePage + '&limit=5',
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Fazliddin': 'molodec 222',
            },
            'params': {
                'search': 'parameter',
            },
        }).then(response => {
            console.log('responsing from getAllTrans: ', response);
            initializeData(response.data);

        }).catch(error => {
            console.log('erroring from getAllTrans: ', error);
            initializeData({
                totalPage: 3,
                content: [
                    {
                        hubName: 'Kharkiv',
                        compartments: [
                            {
                                maximumWeight: '22',
                                volume: {
                                    width: 240,
                                    height: 240,
                                    length: 12000,
                                }
                            },
                            {
                                maximumWeight: '24',
                                volume: {
                                    width: 240,
                                    height: 240,
                                    length: 14000,
                                }
                            },
                        ],
                        type: 'Truck',
                    },
                    {
                        hubName: 'Poltava',
                        compartments: [
                            {
                                maximumWeight: 22,
                                volume: {
                                    width: 240,
                                    height: 240,
                                    length: 12000,
                                }
                            },
                        ],
                        type: 'Truck',
                    }
                ]
            });
        });
    }
    function getAllTransportTypes() {
        console.log('getAllTransportTypes()');
        axios({
            'method': 'GET',
            'url': urlForTransportTypes,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Fazliddin': 'molodec 222',
            },
        }).then(response => {
            console.log('responsing from getAllTransTypes: ', response);
            if (response.status === 200) {

            }

        }).catch(error => {
            console.log('erroring from getAllTransTypes: ', error);
            setTransportTypes(['Truck', 'Plane']);
        });
    }
    function createTransport() {
        console.log('Create transport()');
        axios({
            'method': 'POST',
            'url': url,
            'headers': {
                'content-type': 'application/octet-stream',
                'Fazliddin': 'sends hello to create',
            },
            data:
            {
                "hubName": boundedHub,
                "compartments": compartments,
                "type": type,
            },

        }).then(response => {
            console.log('responsing from create transport: ', response.status);
            if (response.status === 201) {
                setFlag(true);
                setCreateModalFlag(false);
            }
        }).catch(error => {
            console.log('erroring from create trans: ', error);
            setCreateModalFlag(false);
        });
    }
    function updateTransport() {
        console.log('Update transport()', currentTransport);
        axios({
            'method': 'PUT',
            'url': url,
            'headers': {
                'content-type': 'application/octet-stream',
                'Fazliddin': 'sends hello to create',
            },
            data:
            {
                "hubName": boundedHub,
                "compartments": compartments,
                "type": type,
            },

        }).then(response => {
            console.log('responsing from update transport: ', response.status);
            if (response.status === 200) {
                setFlag(true);
                setCreateModalFlag(false);
            }
        }).catch(error => {
            console.log('erroring from update trans: ', error);
            setCreateModalFlag(false);
        });
    }
    function removeTransport(transport) {
        console.log('remove transport()', transport);
        axios({
            'method': 'DELETE',
            'url': url,
            'headers': {
                'content-type': 'application/octet-stream',
                'Fazliddin': 'sends hello to remove',
            },
            data: {
                "hubName": transport.hubName,
                "type": transport.type,
            }

        }).then(response => {
            console.log('responsing from remove transport: ', response.status);
            if (response.status === 200) {
                setFlag(true);
            }
        }).catch(error => {
            console.log('erroring from remove transport: ', error);
        });
    }
    function addNewCompartment() {
        setCompartments([...compartments,
        {
            maximumWeight: weight,
            volume: {
                width: width,
                height: height,
                length: length,
            }
        }]);

    }
    function removeCompartment(index) {
        let newCompartments = [].concat(compartments);
        newCompartments.splice(index, 1);
        setCompartments(newCompartments);
    }
    function closeCreateUpdateModalWindow() {
        setCreateModalFlag(false);
        setUpdateModalFlag(false);
    }
    function handleUpdateTransport(transport) {
        console.log('handleUpdateTransport', transport);
        setCurrentTransport(transport);
        setCompartments(transport.compartments);
        setUpdateModalFlag(true);
    }
    useEffect(() => {
        console.log('transport useEffect', compartments);
        if (flag) {
            getAllTransports();
            setFlag(false);
        }
    });
    return (
        <div>
            <div className='component'>
                <Table variant='dark' size='md' striped bordered hover >
                    <thead>
                        <tr>
                            <th className='text-center aling-middle'><h4>Bounded hub</h4></th>
                            <th className='text-center aling-middle'>
                                <h4>Compartments</h4>
                                <Row>
                                    <Col sm="1">#</Col>
                                    <Col sm="3">Maximum weight</Col>
                                    <Col sm="3">Width</Col>
                                    <Col sm="2">Height</Col>
                                    <Col sm="3">Length</Col>
                                </Row>
                            </th>
                            <th className='text-center aling-top'><h4>Type</h4></th>
                            <th className='text-center aling-middle'><h4>Actions</h4></th>
                        </tr>
                    </thead>
                    <tbody>
                        {transports.map((transport, index) =>
                            <tr key={index}>
                                <td className='pl-3 align-middle'>{transport.hubName}</td>
                                <td className='pl-4 align-middle text-center'>
                                    {
                                        transport.compartments.map((compartment, index2) =>
                                            <Row key={index2}>
                                                <Col sm="1">{(index2 + 1)}</Col>
                                                <Col sm="3">{compartment.maximumWeight}</Col>
                                                <Col sm="3">{compartment.volume.width}</Col>
                                                <Col sm="2">{compartment.volume.height}</Col>
                                                <Col sm="3">{compartment.volume.length}</Col>
                                            </Row>
                                        )
                                    }
                                </td>
                                <td className='pl-4 align-middle'>{transport.type}</td>
                                <td className='text-center align-middle'>
                                    <DropdownButton variant="info" title="action" size='md' >
                                        <Dropdown.Item as="button" onSelect={() => handleUpdateTransport(transport)}>Update</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item as="button" onSelect={() => removeTransport(transport)}>Delete</Dropdown.Item>
                                    </DropdownButton>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <div className="col text-right">
                    <Button id='new-hub-img' variant="light" onClick={() => setCreateModalFlag(true)} />
                </div>
            </div>
            <Pagination className='justify-content-center'>{pagination}</Pagination>
            <Modal show={createModalFlag || updateModalFlag} onHide={() => closeCreateUpdateModalWindow()} animation='true'>
                <Modal.Header closeButton>
                    <Modal.Title className="font-weight-bold ml-3">
                        {
                            (createModalFlag) ? "Create new transport item" : "Update transport item"
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label className='pl-4' column sm="4">
                                Bounded hub
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control as="select" defaultValue={
                                    (createModalFlag) ? "Choose city" : currentTransport.hubName
                                } onChange={(e) => setBoundedHub(e.target.value)}>
                                    <option>Choose city</option>
                                    {
                                        existedHubs.map((city, index) =>
                                            <option key={index}>
                                                {city.name}
                                            </option>
                                        )
                                    }
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label className='pl-4' column sm="4">
                                Transport type
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control as="select" defaultValue={
                                    (createModalFlag) ? "Choose type" : currentTransport.type
                                } onChange={(e) => setType(e.target.value)}>
                                    <option>Choose type</option>
                                    {
                                        transportTypes.map((type, index) =>
                                            <option key={index}>
                                                {type}
                                            </option>
                                        )
                                    }
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
                        {
                            compartments.map((compartment, index) =>
                                <Row key={index}>
                                    <Form.Label className='text-center' column sm="2">
                                        {
                                            compartment.maximumWeight
                                        }
                                    </Form.Label>
                                    <Form.Label className='text-center' column sm="2">
                                        {
                                            compartment.volume.width
                                        }
                                    </Form.Label>
                                    <Form.Label className='text-center' column sm="2">
                                        {
                                            compartment.volume.height
                                        }
                                    </Form.Label>
                                    <Form.Label className='text-center' column sm="2">
                                        {
                                            compartment.volume.length
                                        }
                                    </Form.Label>
                                    <Form.Label className='text-center' column sm="4">
                                        <Button variant='danger' style={{ height: 3 }} onClick={() => removeCompartment(index)}>
                                            -
                                        </Button>
                                    </Form.Label>
                                </Row>
                            )
                        }
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
                                <Button onClick={() => addNewCompartment()} size="sm">+</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='col-md-5 mr-3' onClick={() => (createModalFlag) ? createTransport() : updateTransport()}>
                        {
                            (createModalFlag) ? "Create" : 'Update'
                        }
                    </Button>
                    <Button className='col-md-5 mr-4' variant='secondary' onClick={() => closeCreateUpdateModalWindow()}>cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

}


export default Transports;
