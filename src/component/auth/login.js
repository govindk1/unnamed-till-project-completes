import React, {useState} from 'react'
import {connect} from "react-redux"
import {login} from "../../actions/auth.js"
import {Link, Redirect} from "react-router-dom"


function Login({login, isAuthenticated}) {

    const [userData, setuserData] = useState({
        email: '',
        password: '',
    })

    const submitForm = (e) => {
        e.preventDefault()

        login(userData.email, userData.password)

    }
    console.log(isAuthenticated)
    if (isAuthenticated) {
        return <Redirect to='/' />;
    }

    return (
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
                <div className='login'>
                Don't have an account ? <Link to='/signup'>Signup</Link>
                </div>
            </form>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });

//used for this to add dispatch to our login action
export default connect(mapStateToProps, { login })(Login)


