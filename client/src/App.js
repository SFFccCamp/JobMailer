import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './containers/navbar';
import EmailForm from './containers/EmailForm';


// ===== ACTIONS ===== //
import fetchUser from './store/actions/fetchUser'

class App extends Component {

  constructor( props ) {
    super( props );
    this.props.store.dispatch( fetchUser() )
  }


  render() {
    return (
      <div className="App">
        <Navbar store={ this.props.store }/> 
        <EmailForm store={ this.props.store }/>
      </div>
    );
  }
}

export default App;
