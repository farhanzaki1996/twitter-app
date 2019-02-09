import React from 'react';
import axios from 'axios';
import User from '../UserProfile/User';
import './User.css';

class Followers extends React.Component{

  state={
    followers:null,
    toggle:false
  };

  componentDidMount()
  { 
      axios.get(`/followers/${this.props.userID}.json`)
      .then(response => {
          this.setState({followers:response.data})
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
    if(this.state.followers)
    {
     listWithObjs= Object.values(this.state.followers);
     userID= Object.keys(this.state.followers);
    }
    
    let UserList= null;
    if(this.state.followers != null)
    {
        UserList= listWithObjs
        .map((singleUser,index) => {

            if(singleUser !== this.props.userID)
            {
                return(
                        <User 
                            currentUserID={this.props.userID}
                            key={index}
                            userID={userID[0]}
                            userName={singleUser['name']}
                            parentName='followers'
                            refresher={()=>this.componentRefresh()}
                          
                            
                        />
                        )
                }
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