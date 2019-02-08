import React,{Component} from 'react';
import axios from 'axios'
import { Card, CardImg, CardText, CardBody,
  CardTitle, ListGroup,ListGroupItem } from 'reactstrap';
import './User.css'
import logo from '../../../assets/twitter-logo-silhouette.png'

import  {withFirebase}  from '../../Firebase/index';

 class UserInfo extends Component{


  state={
    user:null
  };

  componentDidMount()
  {
    let userID=this.props.userID;
    let user= axios.get(`/users/${userID}.json`)
    .then(response => {    
        this.setState({user:response.data});
        })
    .catch(error=>console.log(error));
  }

  render(){
    
   let userCard=null;
   let userInfo=this.state.user;
   if(userInfo)
   {
    userCard=
        <div>
            <Card className='text-center'>
              <CardBody>
                <CardTitle><h4>User Name</h4></CardTitle>
                <CardText> This is information about the user </CardText>
              </CardBody>
              <ListGroup className='list-group-flush'>
                <ListGroupItem> Address</ListGroupItem>
                <ListGroupItem>Email</ListGroupItem>
                <ListGroupItem> Phone</ListGroupItem>
              </ListGroup>
            </Card>
        </div>
   }

    return (

      <div>
        {userCard}
      </div>

    );

  }
}

export default UserInfo;

 