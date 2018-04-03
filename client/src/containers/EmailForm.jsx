import React, { Component } from 'react';

class EmailForm extends Component {

    constructor(props) {
      super(props)

      this.state = {
        subject: '',
        message: ''
      };

      this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit( e ) {
      e.preventDefault();
    }

    render() {
      return (
        <form id="email-form" onSubmit={ this.handleSubmit }>
          <label htmlFor="subject">Subject</label>
          <input id="subject" placeholder="Subject"/>
    
          <label htmlFor="message">Message</label>
          <textarea id="message" className="materialize-textarea" placeholder="Type your message here" />
    
          <button type="submit" class="waves-effect waves-light btn">Send</button>
        </form>
      );
    }
}

export default EmailForm;
