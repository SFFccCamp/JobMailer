import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../utilities/fetchHttp';

import { FETCH_APPLICATION, ADD_APPLICATION } from '../store/actions/actions';


function mapStateToProps( state ) {
    return {
        applications: state.user.applications,
        user        : state.user
    };
}


function mapDispatchToProps( dispatch ) {
    return {
        fetchApps: ( payload ) => {
            dispatch( {
                type: FETCH_APPLICATION,
                payload
            } )
        },
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


    componentDidMount() {
        fetchData( '/applications', 'GET' )
            .subscribe( 
                res => this.props.fetchApps( res.apps ),
                err => console.log( err ) 
        )
    }


    renderApplications = () => {
        return this.props.applications.map( ( app, i ) => {
            return <div key={ app.name + i }>{ app.name }</div>
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
                this.props.addApp( res.newApp )
            } )
    }


    render() {
        return (
            <div>
                { this.props.applications.length > 0 
                    ? this.renderApplications() 
                    : <h1>No Applications</h1> }
                { this.addApps() }
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Applications);