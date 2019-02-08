import React from 'react';
import axios from 'axios';
import User from '../UserProfile/User';
import './User.css'

class Followers extends React.Component{

  state={
    followers:null,
  };

  componentDidMount()
  { 
      axios.get(`/followers/${this.props.userID}.json`)
      .then(response => {
          this.setState({followers:response.data})
      }).catch(error => console.log(error));
  }

  render(){

    let listWithObjs=null;
    if(this.state.followers)
    {
     listWithObjs= Object.values(this.state.followers);
     listWithObjs=Object.values(listWithObjs);
    }
    
    let UserList= null;
    if(this.state.followers != null)
    {
        UserList= listWithObjs
        .map(singleUser => {

            let singleUserTemp=Object.keys(singleUser)[0];
            
            if(singleUserTemp !== this.props.currentUserID)
                return(
                        <User 
                            currentUserID={this.props.currentUserID}
                            userID={singleUserTemp}
                            parentName='followers'
                            
                        />
             )
        })
    }

    return(
      <div>
      <h3 className='listheading'>Followers</h3>
      <p>{UserList}</p>
      </div>
    );
  }
}

export default Followers;