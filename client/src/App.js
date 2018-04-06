import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './containers/navbar';
import LandingPage  from './components/Landing';
import SearchBar from './components/SearchBar';
import EmailForm from './containers/EmailForm';


// ===== ACTIONS ===== //
import fetchUser from './store/actions/fetchUser'

class App extends Component {

    constructor( props ) {
        super( props );
        this.props.store.dispatch( fetchUser() )
    }


    // componentDidMount() {
    //     this.props.store.subscribe( () => this.forceUpdate() )
    // }


    render() {
      return (
          <div className="App">
          <Navbar store={ this.props.store }/>
          <Switch>
              <Route exact path="/" component={ LandingPage }/>
              <Route exact path="/email" render={ () => <EmailForm store={ this.props.store } />}/>
              <Route exact path="/search" component={ SearchBar }/>            
          </Switch>
        </div>
      );
    }
}

export default App;
