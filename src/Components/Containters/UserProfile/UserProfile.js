import React,{Component} from 'react';
import UserInfo from './UserInfo';
import Followers from './Followers'
import Following from './Following'
import TweetInput from '../Tweets/TweetInput';
import TweetFeed from '../Tweets/TweetFeed'
import Tweets from '../Tweets/Tweets';
import UserList from './UsersList';
import axios from 'axios';
import './UserProfile.css'
import {Jumbotron} from 'reactstrap'
import pic from '../../../assets/customer-service.png'



class UserProfile extends Component{

    state={
        user:null,
        following:[],
        loadingUser:false,
        loadingFollowing:false
    }


    componentDidMount()
    {
        let userID=this.props.userID;
        axios.get(`/users/${userID}.json`)
        .then(response => {    
            this.setState({user:response.data});

            this.setState({loadingUser:true});
            })
        .catch(error=>console.log(error));

        axios.get(`/following/${userID}.json`)
      .then(response => {

            if(response.data)
            {
                let followingArray= Object.keys(response.data);
                followingArray=Object.values(followingArray);
                this.setState({following:followingArray});
            }
            this.setState({loadingFollowing:true});
      }).catch(error => console.log(error));
    }

    render() {

        let userRender=null;
        if(this.state.loadingUser && this.state.loadingFollowing)
        {
            userRender= ( <div>
                                <Jumbotron className='jumbotron'>
                                    <div className='container'>
                                        <div className='row row-header'>
                                            <div className='col-12 col-sm-3'>
                                                <img src={pic}></img>
                                            </div>
                                    <div className='col-12 col-sm-6'>
                                    </div>
                                </div>
                                </div>
                        </Jumbotron>

                    <div>
                        <div className='row row-header' >
                                <div className="col-12 col-sm-last col-sm-3">
                                    <UserInfo userID={this.props.userID}/>
                                    <Tweets userID={this.props.userID} displayTitle='Your Tweets'/>
                                </div>
                                <div className="col-12 col-sm-first col-sm-6" >
                                    <TweetInput userID={this.props.userID} userName={this.state.user.name}/>
                                    <TweetFeed userID={this.props.userID} following={this.state.following} displayTitle='Tweet Feed'/>
                                </div>
                                <div className="col-12 col-sm-3">
                                    <Following userID={this.props.userID}/>
                                    <Followers userID={this.props.userID}/>
                                    <UserList currentUserID={this.props.userID} />
                                </div>
                    </div>
                </div>
         </div>)
        }

        return(
            <div> {userRender}</div>
        );
    }
}

export default UserProfile;