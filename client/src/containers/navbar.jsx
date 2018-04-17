import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';

class Navbar extends Component {

    search = () => <NavLink to='/search'>Search</NavLink>

    isLoggedIn = ( user ) => {

        return ( 
            <div style={ { display: 'flex' } }>
                { this.search() }
                <NavLink to='/study' className="">
                    { user.username }
                </NavLink>
                <NavLink to='/applications' className="">
                    Applications
                </NavLink> 
                <NavLink to='/email' className="">
                    Email
                </NavLink>                
                <li><a href="http://localhost:9000/auth/logout">Log Out</a></li>
            </div>
        )
    }

    
    isLoggedOut = () => {
        return (
            <div style={ { display: 'flex' } }>
                { this.search() }
                <li><a href="http://localhost:9000/auth/login">Log In</a></li>                
            </div>
        )
    }

    render() {

        return (
            <nav className="grey darken-4 white-text">
                <div className="nav-wrapper nav-container ">
                    <NavLink to="/" className="nav-logo">Job Mailer</NavLink>
                    <ul id="nav-mobile" className="hide-on-med-and-down">
                        { this.props.user.isLoggedIn 
                            ? this.isLoggedIn( this.props.user ) 
                            : this.isLoggedOut() }
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