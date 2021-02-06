import React, {useEffect, useState} from 'react'
import {connect} from "react-redux"
import {useHistory} from "react-router-dom"

function RightSideBar({auth :{loading, user}}) {
    const [Button, setButton] = useState('false')
    const history = useHistory()
   

    useEffect(() => {

        
        if(Button === "true")
            history.push('/edit-profile')
           
    }, [Button])

    return (
        <div style={{flex:"1 1 60%"}}>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <button className="removeField" onClick={() => setButton("true")}>Edit</button>

            <form>
            
                <div>
                    <div>
                        <label>Name</label>
                    </div>
                   
                    <div>
                        <input 
                            className="editable"
                            type="text" 
                            value={user.name} 
                            placeholder="Name"
                            readOnly
                        /> 
                    </div>  
                </div>
             

                <div>
                    <div>
                        <label>About us</label>
                    </div>
                    <textarea 
                        className="editable"
                        type="text"
                        value={user.about} 
                        placeholder="About us"
                        readOnly
                    />   
                </div>

                <div>
                    <div>
                        <label>Address</label>
                    </div>
                    <textarea
                        className="editable"
                        type="text" 
                        value={user.address} 
                        placeholder="Address"
                        readOnly
                    />   
                </div>

                <div>
                    <div>
                        <label>City</label>
                    </div>
                    <input 
                        className="removeField"
                        type="text"
                        value={user.city}
                        placeholder="city"
                    />
                </div>

                <div>
                    <div>
                        <label>State</label>
                    </div>
                    <input 
                        className="removeField"
                        type="text"
                        value={user.state}
                        placeholder="state"
                    />
                </div>
            
            </form>

        </div>
    )
}

const mapStateToProps = (state) => ({
    auth : state.auth
})

export default connect(mapStateToProps)(RightSideBar)
