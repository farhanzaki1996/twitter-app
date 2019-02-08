import React,{Component} from 'react';
import axios from 'axios';
import firebase from '../../Firebase/firebase';
import {withFirebase} from '../../Firebase/index';
import User from './User';
import './User.css'
import { ListGroup, ListGroupItem } from 'reactstrap';



class UserList extends Component{

    state={
        users:{}
    };

    componentDidMount()
    {
        axios.get('/users.json').then (response =>{
            this.setState({users:response.data})
        }).catch(error=>console.log(error));
    }
    
    render() {

        let UserList= null;
        if(this.state.users != {})
        {
            UserList= Object.keys(this.state.users)
            .map(singleUser => {

                if(singleUser !== this.props.currentUserID)
                    return(
                            <User 
                                currentUserID={this.props.currentUserID}
                                userID={singleUser}
                                parentName='user-list'
                                userName={this.state.users[singleUser].name}
                            />
                 )
            });
        }


        
        return(
            <div>
            <h3 className='listheading'>All Users</h3>
            <ListGroup>
                {UserList} 
            </ListGroup>
            {UserList}
        </div>
        );
    }
          
}

export default withFirebase(UserList);