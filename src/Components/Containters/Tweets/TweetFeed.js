import React,{Component} from 'react';
import axios from 'axios';
import Tweet from './Tweet';
import '../UserProfile/User.css';
import {ListGroup} from 'reactstrap';



class TweetFeed extends Component{

    state={
        following:null,
        user:{}
    };


    componentDidMount()
    {
        axios.get(`/following/${this.props.userID}.json`)
        .then(response => {

            if(response.data)
            {   
                let followingArray= Object.keys(response.data);
                this.setState({following:followingArray});
            }
            })
        .catch(error=>console.log(error));


        axios.get(`/users/${this.props.userID}.json`).then (response =>{
            this.setState({user:response.data})
        }).catch(error=>console.log(error));

    }

    getTweets=()=>{

        this.state.following.map(followingID =>{

            axios.get(`/tweets/${followingID}.json`).then(response => {

            console.log(response.data)
            })
            .catch(error=>console.log(error));
        });
    }


    render() {

        if(this.state.following)
        {
            this.getTweets();
        }
        /*
        let tweetArray=null;
        if(this.state.tweets != null && this.state.user!=null)
        {
            tweetArray= Object.values(this.state.tweets)
            .map(singleTweetObj => {
                return(

                    <Tweet 
                    timeStamp={Object.keys(singleTweetObj)[0]} 
                    key={Object.keys(singleTweetObj)[0]}
                    tweetValue={Object.values(singleTweetObj)[0]}
                    userName={this.state.user['name']}
                    parentProp='ownfeed'
                    
                    />
                )
            });
        }*/
        return(
            <div>
            <h2 className='listheading'>{this.props.displayTitle}</h2>
            <ListGroup>
                <p>Tweet</p>
                {/*tweetArray*/} 
            </ListGroup>
            </div>
        );
    }
          
}

export default TweetFeed;