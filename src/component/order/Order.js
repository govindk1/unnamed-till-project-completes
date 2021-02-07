import React from "react"
import {connect} from "react-redux"

//components
import Addorder from "./Addorder"
import Spinner from "../layout/Spinner"

const Order = ({loading}) => {

    return loading ? (<Spinner />) : (
        <React.Fragment>
            <Addorder />     
        </React.Fragment>
    )

}

const mapStateToProps = (state) => ({
    loading: state.auth.loading,

});

export default connect(mapStateToProps)(Order)