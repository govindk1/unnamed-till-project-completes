import React, {useState} from 'react'
import {connect} from "react-redux"
import {setAlert} from "../../actions/alert.js"
import axios from "axios"
import {useHistory} from "react-router-dom"

function ForgotPassword({setAlert, isAuthenticated}) {
    
    const [email, setEmail] = useState('');
    const history = useHistory();

    if(isAuthenticated){
        history.push('/')
    }


    const submitForm = async (e) => {
        e.preventDefault();
        // console.log(setAlert)
        // ƒ () { output of console.log
        //     return dispatch(actionCreator.apply(this, arguments));
        //   }
        try{
        
        const res = await axios.post('http://127.0.0.1:5000/user/forgot-pwd', {email})
        setAlert(res.data.message, "success")
        history.push('/')
        }
        catch(err){
                setAlert(err.response.data.message, 'danger')
        }
    }

    return (
        <React.Fragment>
            <div>
                Forgot Password!!!
            </div>

            <form onSubmit = {submitForm}>
            <div>
                <input
                    type='email'
                    placeholder='Email Address'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <button type="submit">Forgot password</button>

            </form>

        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps,{setAlert,})(ForgotPassword);