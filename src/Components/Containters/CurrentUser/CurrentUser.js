import React,{Component} from 'react';
import  {withFirebase}  from '../../Firebase/index';
import UserProfile from '../UserProfile/UserProfile'


class CurrentUser extends Component{

    state={
        currentUser:null,
        isAuthenticating:true,
        isAuthenticated:false
    }

    componentDidMount() {

        const authReturn=this.props.firebase.authUser()
        authReturn.then((user) => {
            this.setState({ isAuthenticated: true });
            this.setState({ isAuthenticating: false });
            this.setState({ currentUser:user.uid});
        }, (error) => {
           this.setState({ isAuthenticating: false });
        });
    }
    render() {

        let userProfile= this.state.currentUser ? 
        <UserProfile userID={this.state.currentUser}/>
        : null;

        return(
            <div>
                {userProfile}
            </div>
        );
    }
}

export default withFirebase(CurrentUser);