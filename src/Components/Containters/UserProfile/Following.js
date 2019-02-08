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
    if(this.state.following)
    {
     listWithObjs= Object.values(this.state.following);
     listWithObjs=Object.values(listWithObjs);
    }

    
    
    let UserList= null;
        if(this.state.following != null)
        {
            UserList= listWithObjs
            .map(singleUser => {

                let singleUserTemp=Object.keys(singleUser)[0];
                
                if(singleUserTemp !== this.props.currentUserID)
                    return(
                            <User 
                                currentUserID={this.props.currentUserID}
                                userID={singleUserTemp}
                                parentName='following'
                                
                            />
                 )
            })
        }

    return(
        <div>
            <h3 className='listheading'>Following</h3>
            <p>{UserList}</p>
        </div>
    );
  }
}

export default Following;