import React, {useState, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const PrivateRoute = ({component: Component,auth: { isAuthenticated, loading, role}, ...rest}) => {
    
    
   

    return(
    <Route
    {...rest}
    render={(props) =>
  
      {
        if(!isAuthenticated && !loading){
          <Redirect to = "/login" />
        }

        else if(role === "ogn" &&  rest.type === "user"){
          console.log("great")
          return <Redirect to = "/" />
        }

        else if(role === "user" && rest.type === "ogn"){
          return <Redirect to = "/" />
        }

        else{
          return <Component {...props} />
        }

        
      }

      // !isAuthenticated && !loading && role === "ogn" ? (
      //   <Redirect to='/login' />
      // ) : (
      //   <Component {...props} />
      // )
    
    }
  />)
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
