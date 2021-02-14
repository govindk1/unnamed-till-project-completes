import React, {useEffect, useState} from "react"
import {connect} from "react-redux"
import {useHistory} from "react-router-dom"

import {getposts, editpost} from "../../actions/post"
import {useParams} from "react-router-dom"

//components
import Spinner from "../layout/Spinner"

const EditMyOrder = ({post:{posts, loading}, editpost, getposts}) => {

    const {id} = useParams();
    const history=useHistory();
    const [postInfo, setpostInfo] = useState({
        phone:'',
        no:'',
        foodItems:'',
        foodType:'VEG'
    })
   
    useEffect(() => {
        getposts()
      
        for(let i = 0; i < posts.length; i++){
            if(posts[i]._id === id){
            
                setpostInfo({
                    phone:posts[i].phone,
                    no:posts[i].number,
                    foodItems:posts[i].foodDescription,
                    foodType:'VEG'
                })
                break;
            }
        }
    }, [loading])

    const submitForm = async (e) => {
        e.preventDefault()

        editpost({id, ...postInfo})
        
      
        history.push('/')
      
        
        
    }

    return loading ? <Spinner/> :(
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
                    <div>
                        <label>Phone Number</label>
                    </div>

                    <input 
                        type="tel" 
                        value ={postInfo.phone}
                        onChange = {(e) => setpostInfo({...postInfo, phone:e.target.value})}
                        placeholder="phoneNumber"
                        pattern="[1-9]{1}[0-9]{9}" required 
                    />
                </div>

                

                <div>
                    <div>
                        <label>No of People it can feed</label>
                    </div>

                    <input
                        placeholder="No of People it can feed" 
                        type="Number" 
                        value ={postInfo.no}
                        onChange = {(e) => setpostInfo({...postInfo, no:e.target.value})}
                        required 
                    />
                </div>

                <div>
                    <div>
                        <label>Food items</label>
                    </div>

                    <textarea 
                        placeholder="Food items"
                        value ={postInfo.foodItems}
                        onChange = {(e) => setpostInfo({...postInfo, foodItems:e.target.value})}
                        type="text" 
                    />
                </div>

                <div>
                    <div>
                        <label>Food items</label>
                    </div>

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
    post:state.post
})


export default connect(mapStateToProps, {editpost, getposts})(EditMyOrder)