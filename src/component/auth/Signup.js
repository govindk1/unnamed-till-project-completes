import React, {useState} from 'react'
import {Link, Redirect, useHistory} from "react-router-dom"
import setAlert from "../../actions/alert.js"
import {connect} from "react-redux"
import {register} from "../../actions/auth.js"
import PropTypes from 'prop-types';

function Signup({setAlert, register, isAuthenticated}) {

    let history = useHistory();

    const [userData, setuserData] = useState({
        username: '',
        email:'',
        password:'',
        cpassword: '',
    })

    if (isAuthenticated) {
        return <Redirect to='/' />;
    }

    

    const submitForm = (e) => {
        e.preventDefault()

        if(userData.password !== userData.cpassword){
            setAlert("password not matches", "danger")
        }
        else{
            register(userData.username, userData.email, userData.password)
        }
    } 

    return (
        <React.Fragment>
            <div>
                <h2>Create a new account</h2>
                <h4>It's quick and easy.</h4>
            </div>
            <form className='form' onSubmit={submitForm}>
                <div>
                <input
                    type='text'
                    placeholder='username'
                    value={userData.username}
                    onChange={(e) => setuserData({...userData, username:e.target.value})}
                    name='username'
                    autoComplete="off"
                    required
                />
                </div>
                
                <div>
                <input
                    type='email'
                    placeholder='Email Address'
                    name='email'
                    autoComplete="off"
                    value={userData.email}
                    onChange={(e) => setuserData({...userData, email:e.target.value})}
                    required
                />
                </div>
    
                <div>
                <input
                    type='password'
                    autoComplete="off"
                    placeholder='Password'
                    name='password'
                    value={userData.password}
                    onChange={(e) => setuserData({...userData, password:e.target.value})}
                />
                </div>

                <div>
                <input
                    type='password'
                    autoComplete="off"
                    placeholder='Confirm Password'
                    value={userData.cpassword}
                    onChange={(e) => setuserData({...userData, cpassword:e.target.value})}
                />
                </div>


                <div className='terms'>
                ✔ By clicking Sign Up, you agree to our Terms, Data Policy and
                Cookie Policy. You may receive SMS notifications from us and can
                opt out at any time.
                </div>
                <button type='submit'>Register</button>
                <div className='login'>
                Already have an account ? <Link to='/login'>Login</Link>
                </div>
            </form>
        </React.Fragment>
    )
}

Signup.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });




export default connect(mapStateToProps, { setAlert, register })(Signup)

//it is like this
//export default connect(mapStateToProps, { setAlert:setAlert, register:register })(Signup)

//you can also do like this
// const mapDispatchToProps = {
//     setAlert: setAlert, //it provides  dispatch functionality to the setAlert
// }
// export default connect(mapStateToProps,mapDispatchToProps)(Signup)
