import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <span>
    <Link to='/addorder'>addorder</Link>
    <Link to='/myorder'>myorder</Link>
    <Link to='/myprofile'>Myprofile</Link>
      <a onClick={logout} href='#!'>
        Logout
      </a>
    </span>
  );

  const guestLinks = (
    <span className='nav-links'>
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Sign Up</Link>
    </span>
  );

  return (
    <nav>
      <div>
        <div>
          <Link to='/'>
            Home
          </Link>
          {!loading && (
            <React.Fragment>
              {isAuthenticated ? authLinks : guestLinks}
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};


const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
