import React, {useState} from 'react'
import {connect} from "react-redux"
import {adminlogin} from "../../actions/auth.js"
import {Link, Redirect} from "react-router-dom"


function Login({adminlogin, isAuthenticated, loading}) {

    const [userData, setuserData] = useState({
        email: '',
        password: '',
    })

    const submitForm = (e) => {
        e.preventDefault()

        adminlogin(userData.email, userData.password)

    }
    if (isAuthenticated) {
        return <Redirect to='/' />;
    }

    //since when login is done user will loaded which makes loading = false so if its false there is no need to give this component
    return !loading ? (
        <React.Fragment>
            <div>
                <h2>Login to your account</h2>
                <h4>It's quick and easy.</h4>
            </div>
            <form className='form' onSubmit={submitForm}>
                
                
                <div>
                <input
                    type='email'
                    placeholder='Email Address'
                    name='email'
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

                <button type='submit'>Login</button>
                <div>
                <Link to="/forgot">Forgot Password</Link>
                </div>
                <div className='login'>
                Don't have an account ? <Link to='/signup'>Signup</Link>
                </div>
            </form>
        </React.Fragment>
    ):<p></p>
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
  });

//used for this to add dispatch to our login action
export default connect(mapStateToProps, { adminlogin })(Login)


