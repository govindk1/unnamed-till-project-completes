import React from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"

//components
import Signup from "./component/auth/Signup.js"
import Login from "./component/auth/login.js"

//react redux
import { Provider } from 'react-redux';
import store from './store/store.js';
import Alert from "./component/layout/Alert.js";


const App = () => {
  return (
    <Provider store={store}>
      <Router>
      <Alert />
      <Route path="/login" exact>
          <Login />
        </Route>

        <Route path="/signup">
          <Signup />
        </Route>
      
      </Router>
    </Provider>
  );
}

export default App;
