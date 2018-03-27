import React, { Component } from 'react';

class Navbar extends Component {

    isLoggedIn = ( user ) => {

        return ( 
            <div>
                <li><a href="sass.html">{ user.username }</a></li>
                <li><a href="sass.html">Log Out</a></li>
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
                        { user.isLoggedIn ? this.isLoggedIn( user ) : (
                            <li><a href="http://localhost:9000/auth/login">Log In</a></li>
                        ) }
                    </ul>
                </div>
            </nav>
        )
    }
}


export default Navbar;