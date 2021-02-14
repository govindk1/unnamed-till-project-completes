import React, {useEffect, useState} from "react"
import {connect} from "react-redux"


import {addpost} from "../../actions/post"


//components
import Spinner from "../layout/Spinner"

const Order = ({loading,addpost}) => {

    const [postInfo, setpostInfo] = useState({
        phone:'',
        no:'',
        foodItems:'',
        foodType:'VEG'
    })

    //uploading image will take formdata 
    const submitForm = async (e) => {
        e.preventDefault()

        addpost({...postInfo})
        
    }

    return loading ? (<Spinner />) : (
        <React.Fragment>
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
                    {/*<div>
                        <label>Phone Number</label>
                    </div>*/}

                    <input 
                        type="tel" 
                        value ={postInfo.phone}
                        onChange = {(e) => setpostInfo({...postInfo, phone:e.target.value})}
                        placeholder="phoneNumber"
                        pattern="[1-9]{1}[0-9]{9}" required 
                    />
                </div>

                

                <div>
                    {/*<div>
                        <label>No of People it can feed</label>
                    </div>*/}

                    <input
                        placeholder="No of People it can feed" 
                        type="Number" 
                        value ={postInfo.no}
                        onChange = {(e) => setpostInfo({...postInfo, no:e.target.value})}
                        required 
                    />
                </div>

                <div>
                    {/*<div>
                        <label>Food items</label>
                    </div>*/}

                    <textarea 
                        placeholder="Food items"
                        value ={postInfo.foodItems}
                        onChange = {(e) => setpostInfo({...postInfo, foodItems:e.target.value})}
                        type="text" 
                    />
                </div>

                <div>
                    {/*<div>
                        <label>Food items</label>
                    </div>*/}

                    <select value={postInfo.foodType}  
                        onChange = {(e) => setpostInfo({...postInfo, foodType:e.target.value})}>
                        <option key="VEG" value="VEG">VEG</option>
                        <option key="NONVEG" value="NONVEG">NON-VEG</option>
                    </select>
                </div>


                
                
                <button  type="submit">Submit</button>
        
            </form>
        </div>
    </div>  
        </React.Fragment>
    )

}

const mapStateToProps = (state) => ({
    loading : state.auth.loading
})


export default connect(mapStateToProps, {addpost})(Order)