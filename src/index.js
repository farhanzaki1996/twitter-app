import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import Firebase from './Components/Firebase/index';
import{ FirebaseContext } from './Components/Firebase/index';

axios.defaults.baseURL='https://twitter-app-9d570.firebaseio.com/';

ReactDOM.render(

    <FirebaseContext.Provider value={new Firebase()}>
        <App />
     </FirebaseContext.Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
