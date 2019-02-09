import React,{Component} from 'react';
import {ListGroupItem } from 'reactstrap';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import  {withFirebase}  from '../../Firebase/index';
import axios from 'axios'
import './User.css'

class User extends Component {


    state={
        currentUserObject:null,
        userObject:null,
        isButtonDisabledFollow:false,
        isButtonDisabledUnFollow:false,
        popoverOpen:false
    }

    toggle=()=> {
           this.setState({popoverOpen: !this.state.popoverOpen});
     }

    componentDidMount()
    {   

        axios.get(`/users/${this.props.currentUserID}.json`).then (response =>{
            this.setState({currentUserObject:response.data});
        }).catch(error=>console.log(error));

        axios.get(`/users/${this.props.userID}.json`).then (response =>{
            this.setState({userObject:response.data});
        }).catch(error=>console.log(error));
    }


    followHandler= ()=>
    {   
        // setting IDs to variables
        let currentUserID=this.props.currentUserID;
        let userID=this.props.userID;
        this.setState({isButtonDisabledFollow:true});
        this.setState({isButtonDisabledUnFollow:false});

        //adding the user as a person who is followed(following) by the currentuser
        const followingRef= this.props.firebase.db.ref(`following/${currentUserID}/${userID}`);
        let userName=this.state.userObject.name;
        let userHolder = {'name':userName};
        followingRef.set(userHolder);

        //adding the current user as a follower to user upon follow click
        const followersRef= this.props.firebase.db.ref(`followers/${userID}/${currentUserID}`);
        let currentUserName= this.state.currentUserObject.name;
        let currentUserHolder= {'name':currentUserName};
        followersRef.set(currentUserHolder);
        this.props.refresher();
        
    }

    unfollowHandler=()=>{

        this.setState({isButtonDisabledUnFollow:true});
        this.setState({isButtonDisabledFollow:false});
        // setting IDs to variables
        let currentUserID=this.props.currentUserID;
        let userID=this.props.userID;
         //adding the user as a person who is followed(following) by the currentuser
         const followingRef= this.props.firebase.db.ref(`following/${currentUserID}/${userID}`);
         followingRef.remove();
 
         //adding the current user as a follower to user upon follow click
         const followersRef= this.props.firebase.db.ref(`followers/${userID}/${currentUserID}`);
         followersRef.remove();
         this.props.refresher();
         

    }

    render(){
  
        let User=null;
        switch(this.props.parentName){

            case('followers'):
                User= <ListGroupItem className='list-group-item list-group-item-action list-group-item-primary'>
                {this.props.userName}  
                        </ListGroupItem>

                break;
            case('following'):
                User= <ListGroupItem className='list-group-item list-group-item-action list-group-item-primary'>
                        {this.props.userName}
                        <div>
                        <Button onClick={ ()=> this.unfollowHandler() } 
                        className='btn btn-light userbutton' disabled={this.state.isButtonDisabledUnFollow}>Unfollow</Button>  
                        </div>
                        </ListGroupItem>
                    break;
            case('user-list'):
                User= <ListGroupItem className='list-group-item list-group-item-action list-group-item-primary'>
                        {this.props.userName}
                        <div>
                        <Button type='button' id='Popover1' onClick={ ()=> this.followHandler() } 
                        className='btn btn-primary userbutton' disabled={this.state.isButtonDisabledFollow}>Follow</Button>
                        <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                                <PopoverHeader>Followed!</PopoverHeader>
                                <PopoverBody>Refresh to see updated Tweet Feed</PopoverBody>
                        </Popover>
                        </div>
                        </ListGroupItem>
                    break;
            default:
            //set a condition here to render Button based on follow/not following list
            User= <ListGroupItem className='list-group-item list-group-item-action list-group-item-primary'>
                    {this.props.userName} 
                     <Button onClick={ ()=> this.followHandler() } 
                         className='btn btn-success userbutton' disabled={this.state.isButtonDisabledUnFollow}>Follow</Button>
                    <Button onClick={ ()=> this.unfollowHandler() } 
                         className='btn btn-danger userbutton' disabled={this.state.isButtonDisabledUnFollow}>Unfollow
                         </Button>   
                 </ListGroupItem>
                
        }

        return(
            <div>
                {User}
            </div>
        );
    }
}

export default withFirebase(User);

