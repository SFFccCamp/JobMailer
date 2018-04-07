import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../utilities/fetchHttp';

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

        e.preventDefault();
        let id = this.props.user._id; 
        let body = {
          title  : this.state.subject,
          content: this.state.message
        }

        fetchData('/email', 'POST', { id }, body )
            .subscribe( 
                res => console.log(res),
                err => console.log(err) 
            )
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
