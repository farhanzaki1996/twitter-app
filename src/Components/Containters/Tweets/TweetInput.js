import React,{Component} from 'react';
import Input from '../../common/Input'
import axios from 'axios'
import {Button} from 'reactstrap'
import { Form,Row,Col,Container } from 'reactstrap';


class TweetInput extends Component{

 state={
    loginForm: {
        tweet:{
            elementType:'input',
            elementConfig:{
                type:'tweet',
                placeholder:'Whats on your mind?',
                label:'Tweet'
                },
            value:'',
            validation: {
                required: true,
                maxLength: 140
                },
            valid:false,
            message:'You are over the 140 character limit',
            tweetMaxLength:true,
            touched:false
        }
    },
    overallValidity:false,
 }

    inputChangedHandler= (event, inputIdentifier)=>{

        const updatedLoginForm={...this.state.loginForm};

        const updatedLoginElement={...updatedLoginForm[inputIdentifier]};
        updatedLoginElement.value= event.target.value;
        updatedLoginElement.touched= true;
        //updatedLoginElement.valid= this.checkValidity(updatedLoginElement.value,updatedLoginElement.validation)
        const checkValidityValues= this.checkValidity(updatedLoginElement.value,updatedLoginElement.validation)
        updatedLoginElement.valid=checkValidityValues[0];
        updatedLoginElement.tweetMaxLength=checkValidityValues[1];

        updatedLoginForm[inputIdentifier]= updatedLoginElement;
        
        let overallValidity=true
        for(let inputIdentifiers in updatedLoginForm){
            overallValidity= (updatedLoginForm[inputIdentifiers].valid
            && overallValidity);
        }
        this.setState({loginForm:updatedLoginForm,overallValidity:overallValidity});
    }

    checkValidity(value,rules) {
        let isValid=false;
        if (rules.required)
            isValid= value.trim()!=='';

        let tweetMaxLength=true;
        if(rules.maxLength)
        {
            tweetMaxLength=(value.length<rules.maxLength);
            isValid= tweetMaxLength && isValid;
        }
        return [isValid,tweetMaxLength];

    }

    tweetSubmitHandler= (event) =>{

        //////////PAST TIME STAMP AS ID ? /////////////////////////////
        if(this.state.overallValidity)
        {
        event.preventDefault();

        //get the tweet value fom the state
        const tweetValue= this.state.loginForm.tweet.value;
        const tweetTimeStamp= new Date()

        const finalTweetObject={};
        finalTweetObject[tweetTimeStamp]=tweetValue;

        axios.post(`/tweets/${this.props.userID}.json`,finalTweetObject)
        .then(response=> response=> console.log(response)).catch(error=>console.log(error));
        }
    }

    tweetSubmitHandler2= () =>{

        if(this.state.overallValidity)
        {
        //get the tweet value fom the state
        const tweetValue= this.state.loginForm.tweet.value;
        const tweetTimeStamp= new Date()

        const finalTweetObject={};
        finalTweetObject[tweetTimeStamp]=tweetValue;


        axios.post(`/tweets/${this.props.userID}.json`,finalTweetObject)
        .then(response=> console.log(response)).catch(error=>console.log(error));
        }
    }

    render() {

        let tweetElement=this.state.loginForm.tweet;
        let form = (
            <Form onSubmit={this.tweetSubmitHandler}>
                    <Input 
                        elementType={tweetElement.elementType}
                        elementConfig= {tweetElement.elementConfig}
                        value= {tweetElement.value}
                        key={'tweet'}
                        message= {tweetElement.message}
                        validity= {!tweetElement.valid}
                        touched=  {tweetElement.touched}
                        tweetMaxLength={!tweetElement.tweetMaxLength}
                        //using arrow function to allow passing arguments to ensure two-way data binding
                        changed={(event)=> this.inputChangedHandler(event,'tweet')}
                    />
            </Form>
        )

        return(
                <Container>
                    <Row>
                        <Col className='col-sm-9'>
                        {form}
                        </Col>
                        <Col className='col-sm-3'>
                            <Button onClick={ ()=> this.tweetSubmitHandler2() } 
                                    className='btn btn-dark'>Post Tweet!</Button>  
                        </Col> 
                    </Row>     
                </Container>
        );
    }
}

export default TweetInput;
