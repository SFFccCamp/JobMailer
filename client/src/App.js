import React, { Component } from 'react';
import logo from './logo.svg';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './containers/navbar';
import LandingPage  from './components/Landing';
import SearchBar from './containers/SearchBar';
import EmailForm from './containers/EmailForm';
import Applications from './containers/Applications';

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
          <Navbar />
          <div className="container">
            <Switch>
                <Route exact path="/" component={ LandingPage }/>
                <Route exact path="/email" component={ EmailForm }/>
                <Route exact path="/search" component={ SearchBar }/>
                <Route exact path="/applications" component={ Applications }/>                
            </Switch>
          </div>
        </div>
      );
    }
}

export default App;
