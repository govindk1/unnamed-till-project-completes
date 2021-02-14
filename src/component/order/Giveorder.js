import React, {useState, useEffect} from 'react'
import {connect} from "react-redux"
import {getOrder} from "../../actions/giveOrder.js"
import Spinner from "../layout/Spinner"
import moment from "moment-timezone"

function Giveorder({data:{loading, posts}, getOrder}) {

    useEffect(() => {
        getOrder()
    }, [getOrder, loading])

    return loading ? (<Spinner />) : (
        <React.Fragment>
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
                    </tr>
                )
            })}


        </table>
            
        </div>
        
        </React.Fragment>
    )
}

const mapStatetoProps = (state) => ({
    data:state.giveorder
})

export default connect(mapStatetoProps, {getOrder})(Giveorder)
