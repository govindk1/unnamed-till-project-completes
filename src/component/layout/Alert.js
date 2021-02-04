import React from 'react'
import {connect} from "react-redux"
import PropTypes from 'prop-types';
import './alert.css'

function Alert({alerts}) {
    return (
        alerts.length > 0 &&
        alerts.map((alert) =>  (
          <div className={`alert alert-${alert.alertType}`} key={alert.id}>
            {alert.msg}
          </div>
        ))
      );
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    alerts: state.alert,
  });

export default connect(mapStateToProps)(Alert);
