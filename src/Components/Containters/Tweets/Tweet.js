import React from 'react';
import {ListGroupItem} from 'reactstrap';

 const Tweet = (props)=>{

    let tweet=null;

    if(props.parentProp==='tweetfeed')
    {
        tweet=
        <ListGroupItem className=
        'list-group-item-action flex-column align-items-start active'>
        <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{props.userName}</h5>
        </div>
    <p className="mb-1">{props.tweetValue}</p>
    <small>{props.timeStamp}</small>
        </ListGroupItem>

    }

    else if(props.parentProp==='ownfeed')
    {
        tweet=
        <ListGroupItem className=
            'list-group-item-action flex-column align-items-start active'>
            <p className="mb-1">{props.tweetValue}</p>
            <small>{props.timeStamp}</small>
        </ListGroupItem>

    }

    return tweet;
}


export default Tweet;