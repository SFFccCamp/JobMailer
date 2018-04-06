import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';

class Navbar extends Component {

    isLoggedIn = ( user ) => {

        return ( 
            <div>
                <NavLink to='/study' className="">
                    { user.userName }
                </NavLink>
                <NavLink to='/email' className="">
                    Email
                </NavLink>                
                <li><a href="/auth/logout">Log Out</a></li>
            </div>
        )
    }

    render() {

        const { user } = this.props.store.getState();
        return (
            <nav className="grey darken-4 white-text">
                <div className="nav-wrapper nav-container ">
                    <a href="#" className="nav-logo">Job Mailer</a>
                    <ul id="nav-mobile" className="hide-on-med-and-down">
                        { this.props.user.isLoggedIn ? this.isLoggedIn( this.props.user ) : (
                            <li><a href="http://localhost:9000/auth/login">Log In</a></li>
                        ) }
                    </ul>
                </div>
            </nav>
        )
    }
}


const mapStateToProps = ( store ) => {
    return { 
        user:  store.user
    }
}


export default connect( mapStateToProps )( Navbar );