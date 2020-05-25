import React from 'react';
import Dropdown from 'react-dropdown';
import FormControl from 'react-dropdown';
import setValue from 'react-dropdown';
import render from 'react-dropdown';
import useState from 'react-dropdown';
import './main_page.css';

import axios from 'axios'
//Testing Drop down
/*
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));
  
  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );

  <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
  Custom toggle
</Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>

  
 function DropMenu() {
     return (
    <Dropdown>
 
      <Dropdown.Menu >
        <Dropdown.Item eventKey="1">Red</Dropdown.Item>
        <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
        <Dropdown.Item eventKey="3" active>Orange</Dropdown.Item>
        <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
     );
}
*/
  ///////////////////// <DropMenu />

  const formValid = ({ formErrors, departure, arrival , weight }) => {
    let valid = true;

    Object.values(formErrors).forEach( val => {
        val.length > 0 && (valid = false);
    });
/*
    Object.value(rest).forEach(val => {
      val < 1 && (valid = false);
  } );
  */

    return valid;
}

function gettingCargoWeight(e) {
    e.preventDefault();
    console.log(e.props);
}

function FormSubmit(){
   // e.preventDefault();
    console.log(this.props.name);
}

class MainPage extends React.Component{

  constructor(props){
    super(props);
    
    //const modalsOpen = props.modalsOpen;
    this.state = {
        departure: '', 
        arrival: '',
        weight: '',
        
        formErrors:{
          departure: "", 
          arrival: "",
          weight: ""
        }
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
  axios.post(url, this.state)
  .then(response => {
      console.log(response)
      
  })
  .catch(error => {
        console.log(error)

  });
  
} else {
  console.error("Invalid form");
}

}


handleChange = (e) => {
  //this.setState({[e.target.name]: e.target.value})
  e.preventDefault();
  const { name, value } = e.target;
  let formErrors = this.state.formErrors;

  switch(name) {
      case 'departure':
          formErrors.departure = 
          value.length < 6
          ? ''
          : 'Please type correct Hub';
          break;
      case 'arrival':
          formErrors.arrival = 
          value.length < 6
          ? ''
          : 'Please type correct Hub';
          break;
      case 'weight':
          formErrors.weight = value.length === null 
          ? 'Weight cannot be empty'
          : "";
          break;
      default:
          break;
  }
  this.setState({formErrors, [name]: value}, () => {console.log(this.state)})
}


render(){

  const { formErrors } = this.state;

    return(
        <div>
        <div className="Title"> <h1 >Search Routs </h1>
        </div>


        
        <div className="Main-background">
        <form className="Form" onSubmit={this.submitHandler}>
        
              <h2>Location:</h2>
              <div className="DivLocation1">
              <input className="Input1" type="text" name="departure" placeholder="Departure"  />
              {formErrors.departure.length > 0 && (<span >{formErrors.departure}</span>)}
              </div>
              <div  className="DivLocation2">
              <input className="Input1" type="text" name="arrival" placeholder="Arrival"  />
              {formErrors.arrival.length > 0 && (<span >{formErrors.arrival}</span>)}
              </div>
              
              
              <div className="DivCargo">
              <h2>Cargo Information:</h2>
              <input className="Input2" type="number" name="weight" min={0} max={100} placeholder="Tones"  />
              {formErrors.weight.length > 0 && (<span >{formErrors.weight}</span>)}
              </div>
              
              <div className="DivButton">
              <button className="Button-Search" type="submit" onClick={this.submitHandler}> Search </button>
              </div>

    
             
        </form>
        </div>

     </div>
    );
    }
}


export default MainPage;