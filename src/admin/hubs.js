import React, { useState, useEffect } from 'react';
import { Table, Dropdown, DropdownButton, Button, Form, Modal, Row, Col } from "react-bootstrap";
import cities from './admin_resource/cities.json';
import axios from 'axios';
import './admin.css';

function Hubs(props) {
    let url = 'http://localhost:8080/location/';
    let urlForReltion = 'http://localhost:8080/location/relation/';
    const [existedHubs, setExistedHubs] = useState([]);
    const [flag, setFlag] = useState(true);
    const [createHubFlag, setCreateHubFlag] = useState(false);
    const [updateHubFlag, setUpdateHubFlag] = useState(false);
    const [relationFlag, setRelationFlag] = useState(false);
    const [currentHub, setCurrentHub] = useState({});
    const [relationListForCurrentHub, setRelationListForCurrentHub] = useState([]);
    const [newHubName, setNewHubName] = useState('');
    function initialiseExistedHubs(hubs) {
        setFlag(false);
        setExistedHubs(hubs);
    }
    function getExistedHubs() {
        axios({
            'method': 'GET',
            'url': url,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Fazliddin': 'molodec 222',
            },
        }).then(response => {
            console.log('responsing from getExistedHubs: ', response);
        }).catch(error => {
            console.log('erroring from getExistedHubs: ', error);
            initialiseExistedHubs([
                {
                    "id": 0,
                    "name": "Kharkiv",
                    "longitude": 36.2303893,
                    "latitude": 49.9902794
                },
                {
                    "id": 1,
                    "name": "Kyiv",
                    "longitude": 30.5241361,
                    "latitude": 50.4500336
                },
                {
                    "id": 2,
                    "name": "Poltava",
                    "longitude": 34.5507948,
                    "latitude": 49.5897423
                },]
            );
        });
    }
    function createHub() {
        axios({
            'method': 'POST',
            'url': url,
            'headers': {
                'content-type': 'application/octet-stream',
                'Fazliddin': 'sends hello to remove',
            },
            data:
            {
                name: newHubName,
            },

        }).then(response => {
            console.log('responsing from create Hub: ', response.status);
            if (response.status === 201) {
                setFlag(true);
            }
        }).catch(error => {
            console.log('erroring from create Hub: ', error);
        });
    }
    function handleUpdateHubAction(hubToUpdate) {
        setCurrentHub(hubToUpdate);
        setUpdateHubFlag(true);
    }
    function updateHub() {
        axios({
            method: 'PUT',
            url: url + currentHub.name, // need to discuss
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            data:
            {
                id: currentHub.id,
                name: currentHub.name,
                newName: newHubName,
            },
        }).then(response => {
            console.log('responsing from update Hub: ', response);
            if (response.status === 200) {
                setUpdateHubFlag(false);
                setFlag(true);
            }
        }).catch(error => {
            console.log('erroring from update Hub: ', error);
            setUpdateHubFlag(false);
            setFlag(true);
        });
    }
    function removeHub(hub) {
        axios({
            'method': 'DELETE',
            'url': url + hub.name,
            'headers': {
                'content-type': 'application/octet-stream',
                'Fazliddin': 'sends hello to remove',
            },

        }).then(response => {
            console.log('responsing from remove Hub: ', response.status);
            if (response.status === 200) {
                setFlag(true);
            }
        }).catch(error => {
            console.log('erroring from remove Hub: ', error);
        });
    }
    function handleShowRelation(hub) {
        setCurrentHub(hub);
        showRelationForCurrentHub(hub);
    }
    function showRelationForCurrentHub(hub) {
        console.log('showRelation', hub);
        axios({
            'method': 'GET',
            'url': urlForReltion + hub.name,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Fazliddin': 'molodec 222',
            },
        }).then(response => {
            console.log('responsing from getExistedHubs: ', response);
        }).catch(error => {
            console.log('erroring from getExistedHubs: ', error);
            initialiseRelationForCurrentHub([
                "Dubna", "Chernovci", "Uzhgorod", "Kyiv", "Lviv"
            ]
            );
        });
    }
    function initialiseRelationForCurrentHub(relations) {
        setRelationListForCurrentHub(relations);
        setRelationFlag(true);
    }
    function createRelation() {
        console.log('create relational hub', newHubName);
        axios({
            'method': 'POST',
            'url': urlForReltion + currentHub.name,
            'headers': {
                'content-type': 'application/octet-stream',
                'Fazliddin': 'sends hello to remove',
            },
            data:
            {
                name: newHubName,
            },
        }).then(response => {
            console.log('responsing from create relation', response.status);
            if (response.status === 200) {
                
            }
        }).catch(error => {
            console.log('erroring from create relation: ', error);
            showRelationForCurrentHub(currentHub);
        });   
    }
    function removeRelation(relationHubName) {
        console.log('remove relational hub', relationHubName);
        axios({
            'method': 'DELETE',
            'url': urlForReltion + currentHub.name,
            'headers': {
                'content-type': 'application/octet-stream',
                'Fazliddin': 'sends hello to remove',
            },

        }).then(response => {
            console.log('responsing from remove relation', response.status);
            if (response.status === 200) {
                
            }
        }).catch(error => {
            console.log('erroring from remove relation: ', error);
            showRelationForCurrentHub(currentHub);
        });   
    }
    useEffect(() => {
        console.log('hubs effect', newHubName);
        if (flag) {
            console.log('inside effect hub');
            getExistedHubs();
        }
    });
    return (
        <div className='component'>
            <Table variant='dark' size='md' striped bordered hover >
                <thead>
                    <tr>
                        <th className='text-center aling-middle'>Hub name</th>
                        <th className='text-center aling-middle'>Longitude</th>
                        <th className='text-center aling-middle'>Latitude</th>
                        <th className='text-center aling-middle'>Relations</th>
                        <th className='text-center aling-middle'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {existedHubs.map((hub, index) =>
                        <tr key={index}>
                            <td className='pl-3 align-middle'>{hub.name}</td>
                            <td className='pl-4 align-middle'>{hub.longitude}</td>
                            <td className='pl-4 align-middle'>{hub.latitude}</td>
                            <td className='text-center'>
                                <Button variant='info' onClick={() => handleShowRelation(hub)}>show</Button>
                            </td>
                            <td className='text-center'>
                                <DropdownButton variant="info" title="action" size='md' >
                                    <Dropdown.Item as="button" onSelect={() => handleUpdateHubAction(hub)}>Update hub</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item as="button" onSelect={() => removeHub(hub)}>Delete hub</Dropdown.Item>
                                </DropdownButton>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div class="col text-right">
                <Button id='new-hub-img' variant="light" onClick={() => setCreateHubFlag(true)} />
            </div>

            <Modal show={updateHubFlag} onHide={() => setUpdateHubFlag(false)} animation='true'>
                <Modal.Header closeButton>
                    <Modal.Title className="font-weight-bold ml-3">Update hub</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label className='pl-4' column sm="4">
                                Current name
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="text" value={currentHub.name} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label className='pl-4' column sm="4">
                                New name
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control as="select" onChange={(e) => setNewHubName(e.target.value)}>
                                    <option>Choose city</option>
                                    {
                                        cities.filter(city => !existedHubs.some(existedCity => existedCity.name === city)).map((city, index) =>
                                            <option>
                                                {city}
                                            </option>
                                        )
                                    }
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='col-md-5 mr-3' onClick={() => updateHub()}>update</Button>
                    <Button className='col-md-5 mr-4' variant='secondary' onClick={() => setUpdateHubFlag(false)}>cancel</Button>

                </Modal.Footer>
            </Modal>
            <Modal show={createHubFlag} onHide={() => setCreateHubFlag(false)} animation='true'>
                <Modal.Header closeButton>
                    <Modal.Title className="font-weight-bold ml-3">Create hub</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label className='pl-4' column sm="4">
                                New hub
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control as="select" onChange={(e) => setNewHubName(e.target.value)}>
                                    <option>Choose city</option>
                                    {
                                        cities.filter(city => !existedHubs.some(existedCity => existedCity.name === city)).map((city, index) =>
                                            <option>
                                                {city}
                                            </option>
                                        )
                                    }
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='col-md-5 mr-3' onClick={() => createHub()}>Create</Button>
                    <Button className='col-md-5 mr-4' variant='secondary' onClick={() => setCreateHubFlag(false)}>cancel</Button>

                </Modal.Footer>
            </Modal>
            <Modal show={relationFlag} onHide={() => setRelationFlag(false)} animation='true'>
                <Modal.Header closeButton>
                    <Modal.Title className="font-weight-bold ml-3">Create relations to {currentHub.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {
                            relationListForCurrentHub.map((city, index) =>
                                <Form.Group as={Row}>
                                    <Form.Label className='pl-5 text-center' column sm="2">
                                        {
                                            (index + 1)
                                        }
                                    </Form.Label>
                                    <Form.Label className='pl-5' column sm="5">
                                        {
                                            city
                                        }
                                    </Form.Label>
                                    <Col className='text-center' sm="4">
                                        <Button variant='danger' onClick = {() => removeRelation(city)}><strong>-</strong></Button>
                                    </Col>
                                </Form.Group>
                            )
                        }
                        <Form.Group as={Row}>
                            <Col className="pl-5" sm="7">
                                <Form.Control as="select" onChange={(e) => setNewHubName(e.target.value)}>
                                    <option>Choose city for new relation</option>
                                    {
                                        cities.filter(city => !relationListForCurrentHub.includes(city)).map((city, index) =>
                                            <option>
                                                {city}
                                            </option>
                                        )
                                    }
                                </Form.Control>
                            </Col>
                            <Col className='text-center' sm="4">
                                <Button onClick = {() => createRelation()}><strong>+</strong></Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='mr-3 ml-3' variant='secondary' onClick={() => setRelationFlag(false)} block>cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Hubs;
