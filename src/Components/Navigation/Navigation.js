import React from 'react';
import './navbar.css'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

import logo from '../../assets/twitter-logo-silhouette.png'
import {Route, Link} from 'react-router-dom'
import SignOutButton from '../Containters/Login/SignOutButton';


export const LANDING = '/';
export const USER_PROFILE = '/user-profile';
export const CURRENT_USER_PROFILE = '/current-user-profile';
export const SIGN_UP = '/signup';
export const SIGN_IN = '/signin';
export const HOME = '/home';
export const ACCOUNT = '/account';
export const PASSWORD_FORGET = '/pw-forget';
export const TWEET_INPUT='/tweetInput'


/*
const Navigation = (props) => (
  <div>{props.authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);
*/

class Navigation extends React.Component{


  state={
      isOpen: false
  };

  toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

  render(){

      let nav=null;
      if(this.props.authUser)
      {
        nav= 
          <Navbar expand="md" className='Navbar fixed-top navbar-light'>
                  <NavbarToggler onClick={this.toggle} />
                    <NavbarBrand>
                    <img src={logo} width="30" height="30" class="d-inline-block align-top" alt=""/>
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <SignOutButton/>
                        </Nav>
                    </Collapse>
              </Navbar>
      }

      return(

          <div>
              {nav}
          </div>

      );
  }
}



export default Navigation;