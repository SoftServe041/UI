import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button, Container } from "react-bootstrap";
import Cargo3D from './cargo_loader_visual/CargoHoldVisual';

class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showFlag: false

        }
        this.handleModal = this.handleModal.bind(this);
    }

    handleModal() {
        this.setState({ showFlag: !this.state.showFlag })
    }


    render() {
        return (
            <div>
                <Container>
                    <Button style={{ minWidth: "150px", backgroundColor: "#ff8e09", borderColor: "#999999" }} onClick={() => { this.handleModal() }}>
                        Show Compartment </Button>
                    <Cargo3D showFlag={this.state.showFlag} handleModal={this.handleModal} />
                </Container>
            </div>
        );
    }
}


export default MainPage;