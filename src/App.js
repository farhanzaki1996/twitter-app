import React, { Component } from 'react';
import Layout from './Components/Layout';
import {BrowserRouter,Route} from 'react-router-dom';
import SignInPage from './Components/Containters/Login/SignIn';
import CurrentUser from './Components/Containters/CurrentUser/CurrentUser';
import SignUpPage from './Components/Containters/Login/SignUp';
import LandingPage from './Components/Landing Page/LandingPage';
import TweetInput from './Components/Containters/Tweets/TweetInput';
import UserProfile from './Components/Containters/UserProfile/UserProfile';
import Tweets from './Components/Containters/Tweets/Tweets'
import {withFirebase} from './Components/Firebase/index';
import Navigation,{LANDING,SIGN_UP,SIGN_IN,CURRENT_USER_PROFILE,HOME,ACCOUNT,TWEET_INPUT,USER_PROFILE} from 
'./Components/Navigation/Navigation';

class App extends Component {

  state={

    authUser: null,

  };


  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser ? this.setState({ authUser }): this.setState({ authUser: null });
      },
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (

      <BrowserRouter>
      <div>
        <Layout >
          <Navigation authUser={this.state.authUser}/>
          <Route exact path={LANDING} component={LandingPage} />
          <Route path={SIGN_UP} component={SignUpPage} />
          <Route path={SIGN_IN} component={SignInPage} />
          <Route path={TWEET_INPUT} component={TweetInput} />
          <Route path={USER_PROFILE} component={UserProfile} />
          <Route path={CURRENT_USER_PROFILE} component={CurrentUser} />
          {/*<Route path={PASSWORD_FORGET} component={PasswordForgetPage} />*/}
          <Route path={HOME} component={CurrentUser} />
          {/*<Route path={ACCOUNT} component={AccountPage} />*/}
        </Layout>
      </div>
      </BrowserRouter>
    );
  }
}

export default withFirebase(App);
