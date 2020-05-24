import React, { useState} from 'react';

import PropTypes from 'prop-types'
import Modal from 'react-modal'

import './loginmenu.css';
import Context from './Context'


let show = true; 
class LogInMenu extends React.Component{
    
    constructor(props){
        super(props);
        
        
    }

    onClose = e => {
        show = false;
      };

    render(modalIsOpen) {
    return(
      <div >
        <Modal  isOpen={ show } ariaHideApp={false} >
          <form >

              <div className="DivText">
              <h3 className="h3">
                Login: 
              </h3>
                <input className="Input" type="text" name="login" placeholder="Login" >
                </input>

                <h3 className="h3">
                Password:
                </h3>
                <input className="Input" type="password" name="password" placeholder="Password" >
                </input>

            
            <div>
            <div className="DivButton2">
            <button  className="Button"> Login
          </button>
            </div>

            <div  className="DivButton2"> 
            <button  className="Button" onClose={e => {
              this.onClose(e);
            }}>
            Cancel
          </button>
            </div>
            </div>


        </div>
          
  
          
          
          </form>
          
        </Modal>
      </div>
    )
  }
}

  export default LogInMenu;