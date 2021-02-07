import {React, useEffect} from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"

//components
import Signup from "./component/auth/Signup.js"
import Login from "./component/auth/login.js"
import Home from "./component/Home.js"
import ForgotPassword from "./component/auth/ForgotPassword"
import UpdatePassword from "./component/auth/UpdatePassword"
import Navbar from "./component/layout/Navbar"
import Myprofile from "./component/profile/Myprofile"
import PrivateRoute from "./component/routing/PrivateRoute"
import EditMyprofile from "./component/profile-forms/EditMyprofile.js"
import AddOrder from "./component/order/AddOrder.js"
import MyOrder from "./component/order/MyOrder.js"
import EditMyOrder from "./component/order/EditMyOrder.js"

//react redux
import { Provider } from 'react-redux';
import store from './store/store.js';
import Alert from "./component/layout/Alert.js";
import {loaduser} from "./actions/auth.js"



const App = () => {

  useEffect(() => {

    store.dispatch(loaduser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
      <Alert />
      <Navbar />

      <Route path="/" exact>
          <Home />
      </Route>

      <PrivateRoute exact path="/myprofile" component={Myprofile} />

      <PrivateRoute exact path="/edit-profile" component={EditMyprofile} />
      
      <PrivateRoute exact path="/addorder" component={AddOrder} />

      <PrivateRoute exact path="/myorder" component={MyOrder} />

      <PrivateRoute exact path="/editmyorder/:id" component={EditMyOrder} />

      <Route path="/login" exact >
          <Login />
        </Route>

        <Route path="/signup" exact>
          <Signup />
        </Route>

        <Route path="/forgot" exact>
          <ForgotPassword />
        </Route>

        <Route path="/forgot/:tokenid" exact>
          <UpdatePassword />
        </Route>

      </Router>
    </Provider>
  );
}

export default App;
