import {React, useEffect} from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"
import {useSelector} from 'react-redux'

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
import Signupogn from "./component/auth/Signupogn.js"
import Giveorder from "./component/order/Giveorder.js"
import Adminlogin from "./component/admin/Adminlogin.js"
import Reviewpdf from "./component/admin/Reviewpdf.js"
import Viewpdf from "./component/admin/Viewpdf.js"

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

      <PrivateRoute exact path="/myprofile" component={Myprofile}/>

      <PrivateRoute exact path="/edit-profile" component={EditMyprofile} />
      
      <PrivateRoute exact path="/addorder" component={AddOrder} type="user"/>

      <PrivateRoute exact path="/myorder" component={MyOrder} type="user"/>

      <PrivateRoute exact path="/editmyorder/:id" component={EditMyOrder} type="user"/>

      <PrivateRoute exact path="/giveorder" component={Giveorder} type="ogn" />

      <PrivateRoute exact path="/reviewpdf" component={Reviewpdf} type="admin" />

      <PrivateRoute exact path="/viewpdf/:id" component={Viewpdf} type="admin" />

      <Route path="/login" exact >
          <Login />
      </Route>

      <Route path="/adminlogin" exact>
        <Adminlogin />
      </Route>

      <Route path="/signup" exact>
        <Signup />
      </Route>

      <Route path="/signupogn" exact>
        <Signupogn />
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
