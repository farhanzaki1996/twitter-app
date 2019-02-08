import React from 'react';
import axios from 'axios';
import './User.css'
import User from '../UserProfile/User'
class Following extends React.Component{

  state={
    following:null
  };

  componentDidMount()
  { 

      axios.get(`/following/${this.props.userID}.json`)
      .then(response => {
          this.setState({following:response.data})
      }).catch(error => console.log(error));

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