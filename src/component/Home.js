import React, { useEffect } from 'react'
import {Link} from "react-router-dom"
import {useHistory} from "react-router-dom"
// import socketClient  from "socket.io-client";
// const SERVER = "http://127.0.0.1:5000";

function Home() {

    // var socket = socketClient(SERVER);
    // socket.on('message', (message) => {
    //     console.log(`I'm connected with the back-end ${message.message}`);
    // });

    // socket.emit("hi", null)

    const history = useHistory()

    
 
    return (
        <div>
            <Link to="/login">hello there</Link>
        </div>
    )
}

export default Home
