import React,{Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Row,Col } from 'reactstrap';
import  {withFirebase}  from '../../Firebase/index';
import classes from './login.css'
import './login.css'
import {SIGN_IN,HOME} from 
'../../Navigation/Navigation'


const SignUpPage = () => (
  <div className='main'>
    <p class='sign' align="center">Sign Up</p>
    <SignUpForm/>
    <SignUpLink/>
  </div>
);


const INITIAL_STATE = {

    name:'',
    address:'',
    address2:'',
    townState:'',
    zip:'',
    email: '',
    password: '',
    error: null,
    valid:true
};

class SignUpFormBase extends Component {

state={...INITIAL_STATE};

onSubmitHandler=(event)=>
{
  const email=this.state.email;
  const name =this.state.name;
  const city=this.state.city;
  const address=this.state.address;
  const address2=this.state.address2;
  const townState=this.state.townState;
  const zip=this.state.zip;

  event.preventDefault();
  this.props.firebase
      .doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(authUser=> {
        return this.props.firebase
          .user(authUser.user.uid).set({email,name,address,address2,townState,zip,city});
      })
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

  render() {
    return (

    <Form className='form1' onSubmit={(event)=>this.onSubmitHandler(event)}>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <label className='label'>Email</label>
              <Input onChange={(event)=>this.onChangeHandler(event)} type="email" name="email" placeholder="Enter Your Email" required='true'/>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className='label' color='red'>Password</Label>
              <Input onChange={(event)=>this.onChangeHandler(event)} type="password" name="password" placeholder="Enter Password" required='true'/>
            </FormGroup>
          </Col>
        </Row>
        <Col md={6}>
            <FormGroup>
            <Label className='label'>Full Name</Label>
              <Input onChange={(event)=>this.onChangeHandler(event)} type="text" name="name" placeholder='Full Name' required='true' />
            </FormGroup>
          </Col>
        <FormGroup>
          <Label className='label'>Address</Label>
          <Input onChange={(event)=>this.onChangeHandler(event)} type="text" name="address" placeholder="Address" required='true'/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleAddress2" className='label'>Address Line Two</Label>
          <Input onChange={(event)=>this.onChangeHandler(event)} type="text" name="address2"  placeholder="Apartment, studio, or floor" required='true'/>
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleAddress2" className='label'>City</Label>
              <Input onChange={(event)=>this.onChangeHandler(event)} type="text" name="city" required='true'/>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="exampleAddress2" className='label'>State</Label>
              <Input className={classes.un} onChange={(event)=>this.onChangeHandler(event)} type="text" name="townState" id="exampleState" required='true'/>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="exampleZip" className='label'>Zip</Label>
              <Input className={classes.un} onChange={(event)=>this.onChangeHandler(event)} type="text" name="zip" id="exampleZip" required='true'/>
            </FormGroup>  
          </Col>
        </Row>
      <Button align='center' className='submit'>Submit</Button>
      {this.state.error && <p>{this.state.error.message}</p>}
    </Form>

    );
  }
}

const SignUpLink = () => (
  <p className='link'>
    Already have an account? <Link to={SIGN_IN}>Sign In</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export {SignUpForm,SignUpLink};
export default SignUpPage;