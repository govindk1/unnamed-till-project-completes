import React from "react"
import {connect} from "react-redux"
import {setAlert} from "../../actions/alert.js"
import {useHistory} from 'react-router-dom'

//components
import LeftEditprofile from "./LeftEditProfile"
import RightEditProfile from "./RightEditprofile"
import Spinner from "../layout/Spinner"

const EditMyprofile = ({loading}) => {
const history = useHistory()

    

    return loading ? (<Spinner />) : (
        <React.Fragment>
            <div>
                <LeftEditprofile />
                <RightEditProfile />
            </div>
        </React.Fragment>
    )

}

const mapStateToProps = (state) => ({
    loading: state.auth.loading,

});

export default connect(mapStateToProps, {setAlert})(EditMyprofile)