import React from 'react';
import './Input.css'
import {Input} from 'reactstrap'

const input=(props) => {

    let inputElement=null;
    let errorMessage=null;

    if(props.validity && props.touched && props.elementConfig.type=='email')
    {
        errorMessage=<p className='ErrorMessag'>{props.message}</p>
    }

    if(props.validity && props.touched && props.elementConfig.type=='tweet' && props.tweetMaxLength)
    {
        errorMessage=<p className='ErrorMessage'>{props.message}</p>
    }

    switch(props.elementType){

        case('input'):
            inputElement=<Input
            {...props.elementConfig} value={props.value}
            onChange={props.changed} />
            break;
        case('textarea'):
            inputElement=<textarea className='InputElement'
             {...props.elementConfig} value={props.value}
             onChange={props.changed} />
            break;
        default:
            inputElement=<input className='InputElement'
             {...props.elementConfig} value={props.value}
             onChange={props.changed} />
    }

    return(
    <div className='Input}'>
        {inputElement}
        {errorMessage}
    </div>
    );

};

export default input;