import React from 'react';

const EmailForm = () => {
  return (
    <form>
      <label htmlFor="subject">Subject</label>
      <input id="subject" placeholder="Subject"/>

      <label htmlFor="recipient">To</label>
      <input id="recipient" placeholder="Recipient"/>

      <label htmlFor="message">Message</label>
      <textarea id="message" placeholder="Type your message here" />

      <button>Send</button>
    </form>
  );
}

export default EmailForm;
