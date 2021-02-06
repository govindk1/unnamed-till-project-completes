import React, { useEffect } from 'react'
import {Link} from "react-router-dom"
import {useHistory} from "react-router-dom"

function Home() {

    

    const history = useHistory()

    
 
    return (
        <div>
            <Link to="/login">hello there</Link>
        </div>
    )
}

export default Home
