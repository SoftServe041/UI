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
        </div>
    );

}


export default Transports;
