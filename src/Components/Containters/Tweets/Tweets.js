import React,{Component} from 'react';
import axios from 'axios';
import Tweet from './Tweet';
import '../UserProfile/User.css';
import {ListGroup} from 'reactstrap';



class Tweets extends Component{

    state={
        tweets:{}
    };


    componentDidMount()
    {
        axios.get(`/tweets/${this.props.userID}.json`)
        .then(response => {
            
            this.setState({tweets:response.data});
            })

        .catch(error=>console.log(error));

    }


    render() {

        let tweetArray=null;
        if(this.state.tweets != null)
        {
            tweetArray= Object.values(this.state.tweets)
            .map(singleTweetObj => {
                return(

                    <Tweet timeStamp={Object.keys(singleTweetObj)[0]} 
                    tweetValue={Object.values(singleTweetObj)[0]}/>
                )
            });
        }
        return(
            <div>
            <h2 className='listheading'>{this.props.displayTitle}</h2>
            <ListGroup>
                {tweetArray} 
            </ListGroup>
            </div>
        );
    }
          
}

export default Tweets;