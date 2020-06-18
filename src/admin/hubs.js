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
        </div>
    );
}

export default Hubs;
