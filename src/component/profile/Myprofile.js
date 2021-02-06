import React, {useEffect} from "react"
import {connect} from "react-redux"
import {setAlert} from "../../actions/alert.js"
import {useHistory} from 'react-router-dom'

//components
import LeftSideBar from "./LeftSideBar.js"
import RightSideBar from "./RightSideBar.js"
import Spinner from "../layout/Spinner"

const Myprofile = ({loading}) => {
const history = useHistory()

  

    return loading ? (<Spinner />) : (
        <React.Fragment>
            <div style={{display:"flex", justifyContent:"space-between", textAlign:"center"}}>
                <LeftSideBar />
                <RightSideBar />
            </div>
        </React.Fragment>
    )

}

const mapStateToProps = (state) => ({
    loading: state.auth.loading,

});

export default connect(mapStateToProps, {setAlert})(Myprofile)