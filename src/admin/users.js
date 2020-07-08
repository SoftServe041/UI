import React, { useEffect, useState } from 'react';
import { Pagination, Table, Dropdown, DropdownButton, Button, Form, Modal, Row, Col } from "react-bootstrap";
import axios from 'axios';

function Users(props) {
    let urlForGetAllUsers = 'http://localhost:8041/admin/users?page=';
    let urlForUpdateDeleteUser = 'http://localhost:8041/admin/users/';
    const [pagination, setPagination] = useState([]);
    const [activePage, setActivePage] = useState(1);
    let totalPage = 1;
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({});
    const [modalFirtsName, setModalFirstName] = useState('');
    const [modalLastName, setModalLastName] = useState('');
    const [modalEmail, setModalEmail] = useState('');
    const [modalPhoneNumber, setModalPhoneNumber] = useState('');
    const [flag, setFlag] = useState(true);
    const [users, setUsers] = useState([]);
    function initializeData(data) {
        totalPage = data.totalPages;
        setUsers(data.content);
        setPagination(formPagination(activePage, totalPage));
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
    function getAllUsers(props) {
        axios({
            'method': 'GET',
            'url': urlForGetAllUsers + activePage + '&limit=5',
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer_${props}`,
            },
            'params': {
                'search': 'parameter',
            },
        }).then(response => {
            if (response.status === 200) {
                initializeData(response.data);
            }
        }).catch(error => {
            console.log('erroring from getAllUsers: ', error);
        });
    }
    function removeUser(userId, props) {
        axios({
            'method': 'DELETE',
            'url': urlForUpdateDeleteUser + userId,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer_${props}`,
            },

        }).then(response => {
            if (response.status === 200) {
                setFlag(true);
            }
        }).catch(error => {
            console.log('erroring from getAllUsers: ', error);
        });
    }
    function handleUpdateAction(userToUpdate) {
        setUpdatedUser(userToUpdate);
        setModalFirstName(userToUpdate.firstName);
        setModalLastName(userToUpdate.lastName);
        setModalEmail(userToUpdate.email);
        setModalPhoneNumber(userToUpdate.phoneNumber);
        setShowUpdateModal(true);
    }
    function updateUser(userToUpdate, props) {
        axios({
            method: 'PUT',
            url: urlForUpdateDeleteUser + userToUpdate.id,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer_${props}`,
            },
            data:
            {
                firstName: modalFirtsName,
                lastName: modalLastName,
                email: modalEmail,
                address: userToUpdate.address,
                phoneNumber: modalPhoneNumber,
            },
        }).then(response => {
            if (response.status === 200) {
                setShowUpdateModal(false);
                setFlag(true);
            }
        }).catch(error => {
            console.log('erroring from update User: ', error);
        });
    }
   useEffect(() => {
        if (flag) {
            getAllUsers(props.token);
            setFlag(false);
        }
    });
    return (
        <div>
            <div className='component'>
                <Table variant='dark' size='md' striped bordered hover >
                    <thead>
                        <tr>
                            <th className='text-center aling-middle'>First name</th>
                            <th className='text-center aling-middle'>Last name</th>
                            <th className='text-center aling-middle'>Email</th>
                            <th className='text-center aling-middle'>Phone number</th>
                            <th className='text-center aling-middle'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) =>
                            <tr key={index}>
                                <td className='pl-3 align-middle'>{user.firstName}</td>
                                <td className='pl-4 align-middle'>{user.lastName}</td>
                                <td className='pl-4 align-middle'>{user.email}</td>
                                <td className='pl-4 align-middle'>{user.phoneNumber}</td>
                                <td className='text-center'>
                                    <DropdownButton variant="info" title="action" size='md' >
                                        <Dropdown.Item as="button" onSelect={() => handleUpdateAction(user)}>Update</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item as="button" onSelect={() => removeUser(user.id, props.token)}>Delete</Dropdown.Item>
                                    </DropdownButton>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <Pagination className='justify-content-center'>{pagination}</Pagination>
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} animation='true'>
                <Modal.Header closeButton>
                    <Modal.Title className="font-weight-bold ml-3">Update user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label className='pl-4' column sm="4">
                                First name
                        </Form.Label>
                            <Col sm="7">
                                <Form.Control type="text" value={modalFirtsName} onChange={(e) => setModalFirstName(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label className='pl-4' column sm="4">
                                Last name
                        </Form.Label>
                            <Col sm="7">
                                <Form.Control type="text" value={modalLastName} onChange={(e) => setModalLastName(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label className='pl-4' column sm="4">
                                Email
                        </Form.Label>
                            <Col sm="7">
                                <Form.Control type="email" value={modalEmail} onChange={(e) => setModalEmail(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label className='pl-4' column sm="4">
                                Phone number
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="number" value={modalPhoneNumber} onChange={(e) => setModalPhoneNumber(e.target.value)} />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='col-md-5 mr-3' onClick={() => updateUser(updatedUser, props.token)}>update</Button>
                    <Button className='col-md-5 mr-4' variant='secondary' onClick={() => setShowUpdateModal(false)}>cancel</Button>

                </Modal.Footer>
            </Modal>
        </div>
    );

}


export default Users;
