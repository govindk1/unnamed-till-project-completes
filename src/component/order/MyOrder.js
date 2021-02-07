import React, {useEffect, useState} from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import "./myorder.css"

import {getposts, deletepost} from "../../actions/post"


import moment from "moment-timezone"

//components
import Spinner from "../layout/Spinner"

const MyOrder = ({post:{loading, posts}, getposts, deletepost}) => {

    useEffect(() => {
        getposts()
    }, [getposts])


    return loading ? (<Spinner />) : (
        <React.Fragment>
        <button>
        <Link to="/addorder">Addorder</Link>
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div style={{display:"flex", justifyContent:"space-evenly"}}>
        <table>
            <tr>
                <th>Orderid</th>
                <th>Phone Number</th>
                <th>No Of people it can feed</th>
                <th>type of food</th>
                <th>Food Description</th>
                <th>Created at</th>
            </tr>

            {posts.map(post => {
                return(
                    <tr>
                        <th>{post._id}</th>
                        <th>{post.phone}</th>
                        <th>{post.number}</th>
                        <th>{post.typeFood}</th>
                        <th>{post.foodDescription}</th>
                        <th>{moment(post.createdAt).tz("Asia/Kolkata").format('MM/DD/YYYY hh:mm:ss')}</th>
                        <th>
                        <Link to={"/editmyorder/"+post._id}>edit</Link> |<a href="#" onClick={() => deletepost(post._id)}>delete</a>
                        </th>
                    </tr>
                )
            })}


        </table>
            
        </div>
     
        </React.Fragment>
    )

}

const mapStateToProps = (state) => ({
    post : state.post
})


export default connect(mapStateToProps, {getposts,deletepost})(MyOrder)