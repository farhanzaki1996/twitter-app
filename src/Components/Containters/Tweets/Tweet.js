import React from 'react';
import {ListGroupItem} from 'reactstrap';

 const Tweet = (props)=>(

        <ListGroupItem className=
        'list-group-item-action flex-column align-items-start active'>
        <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">User Name</h5>
        </div>
    <p className="mb-1">{props.tweetValue}</p>
    <small>{props.timeStamp}</small>


        </ListGroupItem>
);

export default Tweet;