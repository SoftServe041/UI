import React from "react";
import {Tabs, Tab, Row, Col, Container} from 'react-bootstrap';
import Profile from "./Profile";
import './profile.css';

export default class UsersTabsMain extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            selectedTab: 'profile',
            headerText: 'Profile'
        }
    }



    handleSelectedTab(key){
        const tabMap = new Map([
            ['profile', 'Profile'],
            ['orders', 'Orders'],
            ['billing', 'Billing Details'],
        ]);
        this.setState({selectedTab: key, headerText: tabMap.get(key)})

        console.log('tabs console', this.state)
     }

    render() {
        const style = {
            navtabs: {
            backgroundColor: '#161616',
            },
            tabContent:{
            backgroundColor: '#303136',
            color: '#fff',
        },
        }
    return(
    <>
        <Row id="title-row">
            <Col md={{ span: 5, offset: 5 }}>
                <h2 className="title-text"> {this.state.headerText}  </h2>
            </Col>
        </Row>

    <Container id="load-body" >
    <Tabs className="myClass"
          activeKey={this.state.selectedTab}
          onSelect={(key) => {this.handleSelectedTab(key)}} >
        <Tab eventKey="profile" title="Profile" >
            <Profile data={this.props.data}/>
        </Tab>
        <Tab eventKey="orders" title="Orders">
            <p>In progress</p>
        </Tab>
        <Tab eventKey="billing" title="Billing Details" >
            <p>In progress</p>
        </Tab>
    </Tabs>
    </Container>
    </>
);}
}
