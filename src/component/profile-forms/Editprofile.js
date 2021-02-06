import React, {useEffect, useState} from 'react'
import {connect} from "react-redux"
import { Redirect, useHistory } from 'react-router-dom'
import list_sc, {state_list} from "./list_sc.js"
import axios from "axios"
import {loaduser} from "../../actions/auth"
import {setAlert} from "../../actions/alert"


function Editprofile({auth:{user}, loaduser, setAlert}) {
    
    const history = useHistory()

    const [userData, setuserData] = useState({
        name:user.name,
        about:user.about,
        state:"Andhra Pradesh (AP)",
        city:"vimsa",
        address:user.address,
        number: 0,
        filestring: null
    }) 

    //uploading image will take formdata 
    const submitForm = async (e) => {
        e.preventDefault()
        setuserData({...userData, filestring:userData.filestring})
  

        const formData = new FormData();
        if(userData.filestring)
            formData.append('myfile', userData.filestring)
        formData.append('name', userData.name)
        formData.append('about', userData.about)
        formData.append('city', userData.city)
        formData.append('address', userData.address)
        formData.append('state', userData.state)
        console.log([...formData])

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
              'Authorization': "Bearer " + localStorage.token,
            },
          };
          
        try{
        
            const res = await axios.post('http://127.0.0.1:5000/user/user_info', formData, config)
            setAlert("Updated Successfully", "success")
            loaduser()
            
           history.push('/myprofile')
            }
            catch(err){
                    setAlert(err.response.data.message, 'danger')
            }

    }


    return (
        
        <div style={{textAlign:'center'}}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div>
            </div>

            <div>   
                <form  onSubmit={submitForm}>
                    <div>
                        <div>
                            <label>Name</label>
                        </div>
                        <input 
                            className="editable"
                            type="text" 
                            value={userData.name} 
                            placeholder="Name"
                            onChange={(e) => setuserData({...userData, name:e.target.value})}

                        />   
                    </div>

                    <div>
                        <div>
                            <label>About us</label>
                        </div>

                        <textarea 
                            className="editable"
                            type="text"
                            value={userData.about} 
                            placeholder="About us"
                            onChange={(e) => setuserData({...userData, about:e.target.value})}
                        />   
                    </div>

                    <div>
                        <div>
                            <label>Address</label>
                        </div>

                        <textarea
                            className="editable"
                            type="text" 
                            value={userData.address} 
                            placeholder="Address"
                            onChange={(e) => setuserData({...userData, address:e.target.value})}
                        />   
                    </div>

                    <div>
                        <div>
                            <label>State</label>
                        </div>

                        <select value={userData.state} onChange={(e) => setuserData({...userData, state:e.target.value, number:state_list.indexOf(e.target.value)})}>
                            {state_list.map((state, i) => {
                                return(
                                <option key={state} value={state} >{state}</option>)
                            })}
                        </select>
                    </div>

                    <div>
                        <div>
                            <label>City</label>
                        </div>
                    
                        <select value={userData.city} onChange={(e) => setuserData({...userData, city:e.target.value})}>
                            {list_sc[userData.number][userData.state].map((city, i) => {
                                return(
                                <option key={i} value={city} >{city}</option>)
                            })}
                        </select>    
                    
                    </div>
                    
                    <div>
                        <div>
                            <label for="myfile">
                                Upload your image
                            </label>
                        </div>

                        <input 
                        type="file"  
                        name="myfile" 

                        onChange={(e) => setuserData({...userData, filestring:e.target.files[0]})}
                        />
                    </div>
                    

                    <button  type="submit">Submit</button>
            
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth : state.auth
})

export default connect(mapStateToProps, {loaduser, setAlert})(Editprofile)
