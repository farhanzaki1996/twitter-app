import React,{Component} from 'react';
import Tweet from './Tweet';
import '../UserProfile/User.css';
import {ListGroup} from 'reactstrap';
import {withFirebase} from '../../Firebase/index';



class TweetFeed extends Component{

    state={
        tweets:{},
    };


    componentDidMount()
    {
       let following =this.props.following;
       let tweets={};
        this.props.firebase.db.ref("tweets/").on('value', (snap) =>{

            snap.forEach((childNodes)=>{
         
                
               if(following.includes(childNodes.key))
               {    
                   let tempTweets={...tweets};
                   tweets={...childNodes.val(),...tempTweets};
               }
           });
           this.setState({tweets:tweets});
         });

    }


    render() {

        /*
        let tweetArray=null;
        let tweetTime=null;
        if(this.state.tweets !=={})
        {
            tweetArray= Object.values(this.state.tweets)
            tweetArray=tweetArray.reverse()

            tweetTime=Object.keys(this.state.tweets);
            //console.log(tweetTime);

            tweetTime=tweetTime.sort();
            //console.log(tweetTime);


            tweetArray=tweetArray
            .map((singleTweetObj,index) => {
                //console.log(singleTweetObj);
                return(

                    <Tweet 
                    timeStamp={tweetTime[index]} 
                    key={tweetTime[index]}
                    tweetValue={singleTweetObj['value']}
                    userName={singleTweetObj['name']}
                    parentProp='tweetfeed'
                    
                    />
                )
            });
        }*/

        let timeArray=null;
        let tweetRender=null;
        if(this.state.tweets !=={})
        {   
            const tweetObject=this.state.tweets;
            timeArray= Object.keys(this.state.tweets);
            tweetRender=timeArray
            .map((singleTweetID) => {

                return(

                    <Tweet 
                    timeStamp={singleTweetID} 
                    key={singleTweetID}
                    tweetValue={tweetObject[singleTweetID].value}
                    userName={tweetObject[singleTweetID].name}
                    parentProp='tweetfeed'
                    
                    />
                )
            });
        }

        return(
            <div>
            <h2 className='listheading'>{this.props.displayTitle}</h2>
            <ListGroup>
                {tweetRender} 
            </ListGroup>
            </div>
        );
    }
          
}

export default withFirebase(TweetFeed);