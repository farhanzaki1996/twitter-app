import React,{Component} from 'react';
import Input from '../../common/Input'
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import {withFirebase} from '../../Firebase/index';
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
    user:null,
    popoverOpen:false
 }

 toggle=()=> {
     if(this.state.overallValidity)
     {
        this.setState({popoverOpen: !this.state.popoverOpen});
     }
  }

    inputChangedHandler= (event, inputIdentifier)=>{

        const updatedLoginForm={...this.state.loginForm};

        const updatedLoginElement={...updatedLoginForm[inputIdentifier]};
        updatedLoginElement.value= event.target.value;
        updatedLoginElement.touched= true;
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

        if(this.state.overallValidity)
        {
        event.preventDefault();

        //get the tweet value fom the state
        const tweetValue= this.state.loginForm.tweet.value;
        const tweetTimeStamp= new Date()

        const finalTweetObject={};
        finalTweetObject['time']=tweetTimeStamp;
        finalTweetObject['value']=tweetValue;
        finalTweetObject['name']=this.props.userName;

        let currentUserID=this.props.userID;

        const tweetRef= this.props.firebase.db.ref(`tweets/${currentUserID}/${tweetTimeStamp}`);
        tweetRef.set(finalTweetObject);

        
        const updatedLoginForm={...this.state.loginForm};
        const updatedLoginElement={...updatedLoginForm['tweet']};
        updatedLoginElement.value= '';
        updatedLoginForm['tweet']= updatedLoginElement;
        this.setState({loginForm:updatedLoginForm});
        }
    }

    tweetSubmitHandler2= () =>{

        if(this.state.overallValidity)
        {
        const tweetValue= this.state.loginForm.tweet.value;
        const tweetTimeStamp= new Date()

        const finalTweetObject={};
        finalTweetObject['time']=tweetTimeStamp;
        finalTweetObject['value']=tweetValue;
        finalTweetObject['name']=this.props.userName;

        let currentUserID=this.props.userID;

        const tweetRef= this.props.firebase.db.ref(`tweets/${currentUserID}/${tweetTimeStamp}`);
        tweetRef.set(finalTweetObject);

        const updatedLoginForm={...this.state.loginForm};
        const updatedLoginElement={...updatedLoginForm['tweet']};
        updatedLoginElement.value= '';
        updatedLoginForm['tweet']= updatedLoginElement;
        console.log(updatedLoginElement);
        this.setState({loginForm:updatedLoginForm});
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
                            <Button type='button' id='Popover1' onClick={ ()=> this.tweetSubmitHandler2() } 
                                    className='btn btn-dark'>Post Tweet!</Button>
                            <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                                <PopoverHeader>Posted!</PopoverHeader>
                                <PopoverBody>Refresh to see update</PopoverBody>
                            </Popover>
                        </Col> 
                    </Row>     
                </Container>
        );
    }
}

export default withFirebase(TweetInput);
