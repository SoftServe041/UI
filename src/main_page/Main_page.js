import React, {useState} from 'react';
//import './main_page.css';
import  cities from './cities.json';
import 'react-bootstrap';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Button} from "react-bootstrap";

import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
import {forEach} from "react-bootstrap/cjs/ElementChildren";




  const formValid = ({ departure, arrival , weight }) => {
    let valid = true;


    if (departure.length < 3 ) {valid= false; return valid}
    if (arrival.length < 3 ) {valid= false; return valid}
    if (weight.length < 1 ) {valid= false; return valid}


    return valid;
}

/*
const CitiesList = Object.values( cities).forEach( city => {
    return (<p>{city.name}</p>)

})

 */


function CitiesList() {
    let count = 0;
    Object.values(cities.city).forEach(s => {
        return (
            <div>
                  <p>${s.name}</p>
                {//Object.values(cities.city).forEach(s => (<p> s.name </p>))
                }
                {//Object.values(cities.city).forEach(s => (console.log(s.name)))
                     }
                {  //console.log(cities.city[2].name)
                }
                { //console.log(cities.city)
                }
            </div>
        );
    })
}

/*
        return(
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
            {Object.values(cities).forEach(s => (<Dropdown.Item>{s[0].name} </Dropdown.Item>))

            }
                    {
                     /*   <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>


                    }
                    </Dropdown.Menu>


            </Dropdown>

    );

*/






class MainPage extends React.Component{

  constructor(props){
    super(props);
    
    this.state = {
        departure: '', 
        arrival: '',
        weight: '',
        
        ifFormIncorrect: false,
}
            
}
  
/*
 gettingCargoWeight = async (e) => {
    console.log(e.weight);
    e.preventDefault();
        console.log(e.weight);
}
*/
submitHandler = e => {
  const url = 'http://localhost:3000/'
  e.preventDefault();
  

  if (formValid(this.state)){
      console.log(this.state)
      axios.get(url, this.state)
  .then(response => {
      console.log(response)
      if(response.status == 200){
          window.location = "/search";
      }
  })
  .catch(error => {
        console.log(error)
        window.location = "/error"
  });
  
} else {
  this.setState({ifFormIncorrect: true})
  console.error("Invalid form");
}

}


handleChange = (e) => {
  this.setState({[e.target.name]: e.target.value})
  e.preventDefault();
  this.setState({ifFormIncorrect: false})

}







render(){

    return(
        <div>

            <Row> Search Routs  </Row>

        <Form  onSubmit={this.submitHandler} onChange={this.handleChange}>

                <Form.Label column sm={2}>
                    Location:
                </Form.Label>

                <Form.Group  as={Row}>
                <Col sm={10}>
              <Form.Control className="Input1" type="text" name="departure" placeholder="Departure"  />

              <Form.Control className="Input1" type="text" name="arrival" placeholder="Arrival"  />
                </Col>
                </Form.Group>





              <Form.Label column sm={2}>Cargo Information:</Form.Label>
            <br/>
              <Form.Control className="Input2" type="number" name="weight" min={0} max={100} placeholder="Tones"  />



            {(this.state.ifFormIncorrect) && (<h3>Please make sure that you have filled all details</h3>)}

            <br/>
              <Button type="submit" onClick={this.submitHandler}> Search </Button>


            {
          //  <CitiesList/>

            }

        </Form>




     </div>
    );
    }
}


export default MainPage;