import React, {useState, useEffect} from 'react'
import {connect} from "react-redux"
import {getOrder} from "../../actions/giveOrder.js"
import Spinner from "../layout/Spinner"
import moment from "moment-timezone"
import axios from "axios"
import socketClient  from "socket.io-client";
const SERVER = "http://127.0.0.1:5000";

function Giveorder({data:{loading, posts}, getOrder}) {

    var socket = socketClient(SERVER);
    socket.on('order_update', (message) => {
         getOrder()
    });


    const selectChange = async (e, order_id) => {
        console.log(order_id)
        console.log(e.target.value);

        const config = {
            headers: {
                'Content-Type': 'application/json',
              'Authorization': "Bearer " + localStorage.token,
            },
          };
          
        try{
        
            const res = await axios.post(`http://127.0.0.1:5000/userOrder/update_status/${order_id}`, {status:e.target.value, time:moment(new Date()).tz("Asia/Kolkata").format('MM/DD/YYYY hh:mm:ss')}, config)
            
            }
            catch(err){
                    console.log("error")
            }

    }


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
                <th>Status</th>
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
                            {post.status === "order_placed"
                            ?(
                                <select onChange={(e) => selectChange(e, post._id)}>
                                    <option key="1" value="">Select Option:  </option>
                                    <option key="2" value="take_order">Take Order</option>
                                </select>
                            ):(
                                post.status === "take_order" ? (
                                    <select onChange={(e) => selectChange(e, post._id)}>
                                        <option key="1" value="">Select Option:  </option>
                                        <option key="3" value="order_delivered">Order Delivered</option>
                                    </select>
                                )
                                :(
                                    <p>Order completed</p>
                                )    
                            )
                            }
                            
                        </th>
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
