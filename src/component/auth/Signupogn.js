import React, {useState} from 'react'
import {Link, Redirect, useHistory} from "react-router-dom"
import {setAlert} from "../../actions/alert.js"
import {connect} from "react-redux"
import {register} from "../../actions/auth.js"
import PropTypes from 'prop-types';
import axios from "axios"

function Signupogn({setAlert, register, isAuthenticated, loading}) {

    let history = useHistory();

    const [userData, setuserData] = useState({
        name: '',
        email:'',
        password:'',
        cpassword: '',
        filestring: null
    })

    if (isAuthenticated) {
        return <Redirect to='/' />;
    }

    

    const submitForm = async (e) => {
        e.preventDefault()

        
        if(!userData.filestring){
            setAlert("Please Upload The Neccesary Documents", "danger")
        }

        else if(userData.password !== userData.cpassword){
            setAlert("password not matches", "danger")
        }
        
        

        
        else{
            const formData = new FormData();
            formData.append('myfile', userData.filestring)
            formData.append('name', userData.name)
            formData.append('email', userData.email)
            formData.append('password', userData.password)

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            try{
        
                const res = await axios.post('http://127.0.0.1:5000/user/signupogn', formData, config)
                setAlert("An mail has been sent to your email please verify it", "success")
                
                history.push('/login')
               
                }
                catch(err){
                        setAlert(err.response.data.message, 'danger')
                }

        }
    } 

    return !loading ? (
        <React.Fragment>
            <div>
                <h2>Create a new account</h2>
                <h4>It's quick and easy.</h4>
            </div>
            <form className='form' onSubmit={submitForm}>
                <div>
                <input
                    type='text'
                    placeholder='name'
                    value={userData.name}
                    onChange={(e) => setuserData({...userData, name:e.target.value})}
                    name='name'
                    required
                />
                </div>
                
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
                    placeholder='Password'
                    name='password'
                    value={userData.password}
                    onChange={(e) => setuserData({...userData, password:e.target.value})}
                />
                </div>

                <div>
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        value={userData.cpassword}
                        onChange={(e) => setuserData({...userData, cpassword:e.target.value})}
                    />
                </div>

                <div>
                        <div>
                            <label for="myfile">
                                Upload your documents
                            </label>
                        </div>

                        <input 
                        type="file"  
                        name="myfile" 

                        onChange={(e) => setuserData({...userData, filestring:e.target.files[0]})}
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
    ):<p></p>
}

Signupogn.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
  })



export default connect(mapStateToProps, { setAlert, register })(Signupogn)


