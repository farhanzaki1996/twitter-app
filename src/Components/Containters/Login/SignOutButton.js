import React,{Component} from 'react';
import { withRouter } from 'react-router-dom';
import { Button} from 'reactstrap';
import  {withFirebase}  from '../../Firebase/index';
import {SIGN_IN} from 
'../../Navigation/Navigation';
import './login.css'


class SignOutButtonBase extends Component{

    signOutHandler=() =>
    {
    this.props.firebase.doSignOut();
    this.props.history.push(SIGN_IN);
    }     

    render(){


        return(
            <Button className='btn btn-outline-dark' onClick={()=>this.signOutHandler()}>Sign Out</Button>
        );
    }


}



const SignOutButton= withRouter(withFirebase(SignOutButtonBase));

export default SignOutButton;