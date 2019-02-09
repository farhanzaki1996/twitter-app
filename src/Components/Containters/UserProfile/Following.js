import React from 'react';
import axios from 'axios';
import './User.css';
import lodash from 'lodash';
import User from '../UserProfile/User';
class Following extends React.Component{

  state={
    following:null,
  };

  componentDidMount()
  { 

      axios.get(`/following/${this.props.userID}.json`)
      .then(response => {
          this.setState({following:response.data})
      }).catch(error => console.log(error));

  }
  
  
  componentDidUpdate()
    {
        axios.get(`/following/${this.props.userID}.json`)
      .then(response => {
        if( !(lodash.isEqual(response.data,this.state.following)))
        { 
          this.setState({following:response.data})
          console.log('following');
        }
      }).catch(error => console.log(error));
    }

    componentRefresh=()=>
    {
        let tempToggle=this.state.toggle;
        tempToggle=!tempToggle;
        this.setState({toggle:tempToggle});
    }


  render(){

    let listWithObjs=null;
    let userID=null;
    if(this.state.following)
    {
     listWithObjs= Object.values(this.state.following);
     userID= Object.keys(this.state.following);
    }
    
    let UserList= null;
    if(this.state.following != null)
    {
        UserList= listWithObjs
        .map((singleUser,key) => {

            if(singleUser !== this.props.userID)
            {
                return(
                        <User 
                            currentUserID={this.props.userID}
                            key={key}
                            userID={userID[0]}
                            userName={singleUser['name']}
                            parentName='following'
                            refresher={()=>this.componentRefresh()}
                            
                            
                        />
                        )
                }
        })
    }

    return(
        <div>
            <h3 className='listheading'>Following</h3>
            {UserList}
        </div>
    );
  }
}


export default Following;