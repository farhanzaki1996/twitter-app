import React,{Component} from 'react';
import axios from 'axios'
import { Card,CardText, CardBody,
  CardTitle, ListGroup,ListGroupItem } from 'reactstrap';
import './User.css'

 class UserInfo extends Component{


  state={
    user:null
  };

  componentDidMount()
  {
    let userID=this.props.userID;
    axios.get(`/users/${userID}.json`)
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
                <CardTitle><h4>{userInfo.name}</h4></CardTitle>
              </CardBody>
              <ListGroup className='list-group-flush text-left'>
                <ListGroupItem >Email: {userInfo.email}</ListGroupItem>
                <ListGroupItem>Address 1: {userInfo.address}</ListGroupItem>
                <ListGroupItem> Address 2: {userInfo.address2}</ListGroupItem>
                <ListGroupItem>City: {userInfo.city} {userInfo.townState}  {userInfo.zip}</ListGroupItem>
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

 