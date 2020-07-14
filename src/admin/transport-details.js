import React, { useState, useEffect } from 'react';
import { Accordion, Card, Table, DropdownButton, Dropdown, Button, Modal, Form, Col, Row } from "react-bootstrap";
import axios from 'axios';
import ModalError from "../error/modalErrorFF.js";


function TransportDetails(props) {
    let url = 'http://localhost:9041/admin/transport/details';
    let sessionToken = sessionStorage.getItem('token1');
    let transportTypes = props.transportTypes;
    const [transportEntities, setTransportEntities] = useState([]);
    const [flag, setFlag] = useState(true);
    const [createTransportEntityFlag, setCreateTransportEntityFlag] = useState(false);
    const [type, setType] = useState('');
    const [averageSpeed, setAverageSpeed] = useState(40);
    const [pricePerKm, setPricePerKm] = useState(25);
    const [updateTrEnFlag, setUpdateTrEnFlag] = useState(false);
    const [idTransportEntity, setIdTransportEntity] = useState(-1);
    let [ifShowModalError, setIfShowModalError] = useState(false);
    let [errorMessage, setErrorMessage] = useState('');

    function ifError() {
        let temp = !ifShowModalError;
        setIfShowModalError(temp);
    }

    function initialiseExistedTransportEntities(transportEntities) {
        setFlag(false);
        setTransportEntities(transportEntities);
    }
    function getExistedTransportEntities() {
        axios({
            'method': 'GET',
            'url': url,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': "Bearer_"+sessionToken,
            },
        }).then(response => {
            console.log('responsing from getExistedTransEntity: ', response);
            initialiseExistedTransportEntities(response.content);
        }).catch(error => {
            console.log('erroring from getExisteTransporEntiy: ', error);
        });
    }
    function createTransportEntity() {
        console.log('createTransportEntity', type, averageSpeed, pricePerKm);
        axios({
            'method': 'POST',
            'url': url,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': sessionToken,
            },
            data:
            {
                type: type,
                averageSpeed: averageSpeed,
                pricePerKm: pricePerKm,

            },

        }).then(response => {
            console.log('responsing from create transportEntity: ', response.status);
            if (response.status === 201) {
                setFlag(true);
                setCreateTransportEntityFlag(false);
            }
        }).catch(error => {
            console.log('erroring from create transportEntity: ', error);
            setCreateTransportEntityFlag(false);
            setIfShowModalError(true);
            setErrorMessage(error.message);
        });
    }
    function updateTransportEntity() {
        console.log('Update transportEntity()', idTransportEntity);
        axios({
            'method': 'PUT',
            'url': url,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': sessionToken,
            },
            data:
            {
                id: idTransportEntity,
                type: type,
                averageSpeed: averageSpeed,
                pricePerKm: pricePerKm,
            },

        }).then(response => {
            console.log('responsing from update transportEntity: ', response.status);
            if (response.status === 200) {
                setFlag(true);
                setUpdateTrEnFlag(false);
            }
        }).catch(error => {
            console.log('erroring from update transEntity: ', error);
            setUpdateTrEnFlag(false);
            setIfShowModalError(true);
            setErrorMessage(error.message);
        });
    }
    function removeTransportEntity(id) {
        console.log('removeTransportEntity:', id);
        axios({
            'method': 'DELETE',
            'url': url + "/" + id,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': sessionToken,
            },

        }).then(response => {
            console.log('responsing from remove transEntity: ', response.status);
            if (response.status === 200) {
                setFlag(true);
            }
        }).catch(error => {
            console.log('erroring from remove transportEntity: ', error);
            setIfShowModalError(true);
            setErrorMessage(error.message);
        });
    }
    function hideModal() {
        setCreateTransportEntityFlag(false);
        setUpdateTrEnFlag(false);
    }
    function handleUpdateTransportEntity(transportEntity) {
        setType(transportEntity.type);
        setAverageSpeed(transportEntity.averageSpeed);
        setPricePerKm(transportEntity.pricePerKm);
        setIdTransportEntity(transportEntity.id);
        setUpdateTrEnFlag(true);
    }
  
    useEffect(() => {
        console.log('transportDetails effect', flag);
        if (flag) {
            console.log('inside effect hub');
            getExistedTransportEntities();
        }
    });
    return (
        <div>
            {(ifShowModalError) && <ModalError ifShow={ifShowModalError}
                message={errorMessage}
                ifError={ifError} />}
            <Accordion className='mt-5 ml-5 mr-5' defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        <h3 className='text-center align-middle font-weight-bold'>Transport details</h3>
                    </Accordion.Toggle>
                    <Accordion.Collapse className='grey-bg' eventKey="0">
                        <Card.Body>
                            <div className='component-small'>
                                <Table variant='dark' size='md' striped bordered hover >
                                    <thead>
                                        <tr>
                                            <th className='text-center mb-1'><h4>Type</h4></th>
                                            <th className='text-center mb-1'><h4>Average speed</h4></th>
                                            <th className='text-center aling-top'><h4>Price per km</h4></th>
                                            <th className='text-center aling-middle'><h4>Actions</h4></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(transportEntities !== undefined) && transportEntities.map((transportEntity, index) =>
                                            <tr key={index}>
                                                <td className='text-center align-middle'>
                                                    {transportEntity.type}
                                                </td>
                                                <td className='text-center align-middle'>{transportEntity.averageSpeed}</td>
                                                <td className='text-center align-middle'>{transportEntity.pricePerKm}</td>
                                                <td className='text-center align-middle'>
                                                    <DropdownButton variant="info" title="action" size='md' >
                                                        <Dropdown.Item as="button" onSelect={() => handleUpdateTransportEntity(transportEntity)}>Update</Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item as="button" onSelect={() => removeTransportEntity(transportEntity.id)}>Delete</Dropdown.Item>
                                                    </DropdownButton>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col text-right">
                                <Button id='new-hub-img' variant="light" onClick={() => setCreateTransportEntityFlag(true)} />
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        Functionality # Trucks status and their loaded cargos
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        Functionality # Cargoes status and their carrying trucks
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>Hello! I'm another body</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <Modal show={createTransportEntityFlag || updateTrEnFlag} onHide={() => hideModal()} animation='true'>
                <Modal.Header closeButton>
                    <Modal.Title className="font-weight-bold ml-3">
                        {
                            createTransportEntityFlag ? 'Create transport entity' : 'Update transport entity'
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label className='text-right' column sm="4">
                                Type
                            </Form.Label>
                            <Col sm="5">
                                <Form.Control as="select" className='pl-5' defaultValue={
                                    (createTransportEntityFlag) ? "Choose type" : type
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
                            <Form.Label className='text-right' column sm="4">
                                Average speed
                            </Form.Label>
                            <Col sm="5">
                                <Form.Control type="number" className='text-center' size='sm' defaultValue={averageSpeed} onChange={(e) => setAverageSpeed(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label className='text-right' column sm="4">
                                Price per km
                            </Form.Label>
                            <Col sm="5">
                                <Form.Control type="number" className='text-center' size='sm' defaultValue={pricePerKm} onChange={(e) => setPricePerKm(e.target.value)} />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='col-md-5 mr-3' onClick={() => createTransportEntityFlag ? createTransportEntity() : updateTransportEntity()}>
                        {
                            createTransportEntityFlag ? "Create" : "Update"
                        }
                    </Button>
                    <Button className='col-md-5 mr-4' variant='secondary' onClick={() => hideModal()}>cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default TransportDetails;