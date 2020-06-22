import React, { useEffect, useState } from 'react';


function Transports(props) {
    let url = 'http://localhost:9041/admin/transport';
    let urlForTransportTypes = 'http://localhost:9041/admin/transport/types';
    const [pagination, setPagination] = useState([]);
    const [activePage, setActivePage] = useState(1);
  
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
