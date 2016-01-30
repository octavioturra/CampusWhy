/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

const style = {
  body : {
    padding:'2rem',
    paddingTop:'60px',
  }
};

class App extends Component {
  render() {
    return (
      <div className="wrapper" style={style.body}>
        <div className="navbar navbar-default navbar-fixed-top">
          <a href="#" className="navbar-brand">
            <img src={require('../../favicon.png')} alt="Campus Why" style={{display:'inline', margin:'5px', marginTop:'-7px'}}/>
            CAMPUS<b>Why</b></a>
        </div>
        { this.props.children }
      </div>
    );
  }
}

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);
