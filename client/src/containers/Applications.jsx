import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../utilities/fetchHttp';

import { ADD_APPLICATION } from '../store/actions/actions';

function mapStateToProps( state ) {
    return {
        applications: state.user.applications,
        user        : state.user
    };
}

function mapDispatchToProps( dispatch ) {
    return {
        addApp: ( payload ) => {
            dispatch( {
                type: ADD_APPLICATION,
                payload
            } )
        }
    }
}

class Applications extends Component {

    state = {
        applicationName: ''
    }

    
    hasApplications = this.props.applications.length > 0;


    renderApplications = () => {
        return this.props.applications.map( ( app, i ) => {
            return <div key={ app + i }>{ app }</div>
        } );
    }


    addApps = () => {
        return ( 
            <form onSubmit={ this.submitApp.bind(this) }>
                <input type="text"
                       onChange={ this.handleAppName }/>
                <button type="submit" className="waves-effect waves-light btn">Add Application</button>
            </form>
        )
    }


    handleAppName = ( e ) => {
        this.setState( {
            applicationName: e.target.value
        } )
    }


    submitApp( e ) {
        e.preventDefault();
        const { _id } = this.props.user;
        const  name   = this.state.applicationName
        fetchData( '/applications', 'POST', { id: _id, name }, {} )
            .subscribe( res => {
                this.props.addApp( name )
            } )
    }


    render() {
        return (
            <div>
                { this.props.applications.length > 0 
                    ? this.renderApplications() 
                    : this.addApps() }
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Applications);