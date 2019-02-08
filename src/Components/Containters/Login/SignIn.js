import React,{Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import './login.css'
import { Col,Row,Button, Form, FormGroup, Label, Input } from 'reactstrap';
import  {withFirebase}  from '../../Firebase/index';
import {LANDING,SIGN_UP,SIGN_IN,PASSWORD_FORGET,HOME,ACCOUNT} from 
'../../Navigation/Navigation';

const SignInPage= ()=>(

    <div className='main'>
        <p class='sign' align="center">Sign in</p>
        <SignInForm/>
        <p class="classes.forgot" align="center">
            Dont have an account? <Link to={SIGN_UP}>Sign Up</Link>
        </p>
    </div>

);


const INITIAL_STATE={
    'email':null,
    'password':null,
    'error':null
}

class SignInFormBase extends Component{

    state={...INITIAL_STATE}


    onSubmitHandler=(event)=>
    {
        event.preventDefault();
        this.props.firebase
            .doSignInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.setState({state:INITIAL_STATE});
                this.props.history.push(HOME);
            })
            .catch(error => {
                this.setState({ error });
            });
    }


    onChangeHandler=(event)=>
    { 
        this.setState({[event.target.name]:event.target.value});
    }

    render(){

        return(


            <Form className='form1' onSubmit={(event)=>this.onSubmitHandler(event)}>
                <Row form> 
                    <Col md={3}></Col>
                    <Col md={6}>
                    <FormGroup>
                        <Input align="center" className='un' onChange={(event)=>this.onChangeHandler(event)} type="email" name="email" placeholder="Enter Your Email" />
                    </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}></Col>
                    <Col md={6}>
                        <FormGroup>
                            <Input align="center" className='pass' onChange= {(event)=>this.onChangeHandler(event)} type="password" name="password" placeholder="Enter Your Password" />
                        </FormGroup>
                    </Col>
                </Row>
                <Button align="center" className='submit'>Sign In</Button>
                {this.state.error && <p>{this.state.error.message}</p>}
          </Form>


        );
    }
};

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;
export { SignInForm };