import React from 'react';
import Dropdown from 'react-dropdown';
import FormControl from 'react-dropdown';
import setValue from 'react-dropdown';
import render from 'react-dropdown';
import useState from 'react-dropdown';
import './main_page.css';


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


function gettingCargoWeight(e) {
    e.preventDefault();
    console.log(e.props);
}


class MainPage extends React.Component{
/*
 gettingCargoWeight = async (e) => {
    console.log(e.weight);
    e.preventDefault();
        console.log(e.weight);
}
*/



render(){
    return(
        <div>
        <div className="Title"> <h1 >Search Routs </h1>
        </div>


        
        <div className="Main-background">
        <form className="Form">
        
              <h2>Location:</h2>
              <div className="DivLocation1">
              <input className="Input1" type="text" name="departure" placeholder="Departure"  />
              </div>
              <div  className="DivLocation2">
              <input className="Input1" type="text" name="arriva" placeholder="Arrival"  />
              </div>
              

              <div className="DivCargo">
              <h2>Cargo Information:</h2>
              <input className="Input2" type="text" name="weight" placeholder="Tones"  />
              </div>
              
              <div className="DivButton">
              <button className="Button-Search" onClick={gettingCargoWeight}> Search </button>
              </div>
             
        </form>
        </div>

     </div>
    );
    }
}


export default MainPage;