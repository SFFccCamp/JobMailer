import React, { Component } from 'react';
import { connect } from 'react-redux';

class EmailForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
          subject: '',
          message: ''
        };
      
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange( inputField, e ) {
        this.setState( {
          [inputField] : e.target.value
        } )
        
    }


    handleSubmit(e) {

        let id = this.props.user._id; 
        e.preventDefault();

        fetch('/email', {
            credentials: 'include',
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                id
            },
            body: JSON.stringify( {
                updatedCards: newCards
            } )
        } )
    }

    render() {
        return (
            <form id="email-form" onSubmit={ this.handleSubmit }>
                <label htmlFor="subject">Subject</label>
                <input id="subject" placeholder="Subject" onChange={ this.handleChange.bind( this, "subject" ) }/>

                <label htmlFor="message">Message</label>
                <textarea id="message" 
                          className="materialize-textarea" 
                          placeholder="Type your message here" 
                          onChange={ this.handleChange.bind( this, "message" ) }/>

                <button type="submit" className="waves-effect waves-light btn">Send</button>
            </form>
        );
    }
}


const mapStateToProps = ( store ) => {
  return { 
      user: store.user
  }
}


export default connect(mapStateToProps)(EmailForm);
