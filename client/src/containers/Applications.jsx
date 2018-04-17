import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps( state ) {
    return {
        applications: state.user.applications
    };
}

class Applications extends Component {
    
    hasApplications = this.props.applications.length > 0;

    renderApplications = () => {
        return this.props.applications.map( ( app, i ) => {
            return <div key={ app + i }>{ app.name }</div>
        } );
    }

    addApps = () => {
        return ( 
            <form onSubmit={ this.submitApp }>
                <input type="text"
                       onChange={ this.handleAppName }/>
                <button type="submit" className="waves-effect waves-light btn">Add Application</button>
            </form>
        )
    }


    render() {
        return (
            <div>
                { this.hasApplications 
                    ? this.renderApplications() 
                    : this.addApps() }
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Applications);