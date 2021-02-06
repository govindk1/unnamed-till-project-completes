import React from 'react'
import {connect} from "react-redux"

function LeftSideBar({user}) {
    const k = user.selectedFile.split('\\')
    const k1 = k[k.length-1]
    const src1 = "http://localhost:5000/"+k1
    console.log(src1)
    return (
        <div style={{flex:"1 1 40%"}}>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        
            <img src={src1} style={{width:"300px", height:"300px", borderRadius:"50%"}}></img>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(LeftSideBar)
