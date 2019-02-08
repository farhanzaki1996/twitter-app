import React,{Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import {Button} from 'reactstrap'
import axios from 'axios'
import './User.css'

class User extends Component {



    unfollowHandler=()=>
    {   

        axios.get(`/followers/${this.props.currentUserID}.json`)
        .then(response => {
            console.log(response.data)
            this.setState({followers:response.data})
        }).catch(error => console.log(error));

        axios.get(`/following/${this.props.currentUserID}.json`)
        .then(response => {
            console.log(response.data);
            this.setState({following:response.data})
        }).catch(error => console.log(error));


        /*
        axios.delete(`/following/${this.props.currentUserID}/${this.props.userID}.json`).then(response =>
            {   /*
                let following=[...this.state.following];
                following= following.filter(e=>e!==this.props.userID);
                this.setState({following:following});
                *//*

            }).catch(error=> console.log(error));

        axios.delete(`/followers/${this.props.userID}/${this.props.currentUserID}.json`);
        */
    }

    followHandler=()=>
    {   
        
        let currentUserID=this.props.currentUserID;
        let userID=this.props.userID;
        axios.post(`/followers/${this.props.userID}.json`,{[currentUserID]:currentUserID}).catch(error => console.log(error));

        axios.post(`/following/${this.props.currentUserID}.json`,{[userID]:userID}).then(response =>
            {   
                /*
                let following=[...this.state.following];
                following= following.push(this.state.userID);
                this.setState({following:following});
                */

            }).catch(error=> console.log(error));
    }
    render(){
  
        let User=null;
        switch(this.props.parentName){

            case('followers'):
                User= <ListGroupItem className='list-group-item list-group-item-action list-group-item-primary'>
                {this.props.userID}  
                        </ListGroupItem>

                break;
            case('following'):
                User= <ListGroupItem className='list-group-item list-group-item-action list-group-item-primary'>
                        {this.props.userID}
                        <Button onClick={ ()=> this.unfollowHandler() } 
                        className='btn btn-danger userbutton'>Unfollow</Button>  
                        </ListGroupItem>
                    break;
            case('user-list'):
                User= <ListGroupItem className='list-group-item list-group-item-action list-group-item-primary'>
                        {this.props.userName}
                        <Button onClick={ ()=> this.followHandler() } 
                        className='btn btn-success userbutton'>Follow</Button>
                         <Button onClick={ ()=> this.unfollowHandler() } 
                            className='btn btn-danger userbutton'>Unfollow</Button>   
                        </ListGroupItem>
                    break;
            default:
            //set a condition here to render Button based on follow/not following list
            User= <ListGroupItem className='list-group-item list-group-item-action list-group-item-primary'>
                    {this.props.userName} 
                     <Button onClick={ ()=> this.followHandler() } 
                         className='btn btn-success userbutton'>Follow</Button>
                    <Button onClick={ ()=> this.unfollowHandler() } 
                         className='btn btn-danger userbutton'>Unfollow</Button>   
                 </ListGroupItem>
                
        }

        return(
            <div>
                {User}
            </div>
        );
    }
}

export default User;

