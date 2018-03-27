import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './containers/navbar';

class App extends Component {

  componentDidMount() {
    fetch( '/auth/verify', {
      credentials: 'include'
    } )
      .then( res => res.json() )
      .then( res => console.log( res ) )
      .catch( err => console.log( err ) )
  }


  render() {
    return (
      <div className="App">
        <Navbar store={ this.props.store }/> 
      </div>
    );
  }
}

export default App;
