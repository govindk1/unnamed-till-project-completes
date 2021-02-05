import React, {useState} from 'react'
import {useParams, useHistory} from "react-router-dom"
import {setAlert} from "./../../actions/alert.js"
import {connect} from "react-redux"
import axios from "axios"


function UpdatePassword({setAlert, isAuthenticated}) {

    const {tokenid} = useParams();
    const history = useHistory();

    const [userpassword, setuserPassword] = useState({
        password: '',
        cpassword: '',
    })

    if(isAuthenticated){
        history.push('/')
    }



    const formSubmit = async (e) => {
        e.preventDefault();
        
        if(userpassword.password !== userpassword.cpassword){
            setAlert("password not matches", "danger")
        }

        else{
            async function update(password){
                try{
                    const res = await axios.post(`http://127.0.0.1:5000/user/update-password/${tokenid}`, {password});
                    setAlert(res.data.message, "success")
                    history.push('/login');

                }
                catch(err){
                    setAlert(err.response.data.message, "danger")
                    
                }
            }
            update(userpassword.password)
        }

    }

    return (
       
        <React.Fragment>
        <div>
            <h2>Update Password!!</h2>
        </div>
        <form onSubmit={formSubmit}>
            <div>
                <input
                    type='password'
                    autoComplete="off"
                    placeholder='Password'
                    name='password'
                    value={userpassword.password}
                    onChange={(e) => setuserPassword({...userpassword, password:e.target.value})}
                />
            </div>

            <div>
                <input
                    type='password'
                    autoComplete="off"
                    placeholder='Confirm Password'
                    value={userpassword.cpassword}
                    onChange={(e) => setuserPassword({...userpassword, cpassword:e.target.value})}
                />
            </div>

            <button type="submit">Ok</button>
        </form>
        </React.Fragment>
        
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps,{setAlert})(UpdatePassword);
