import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Layout from  './components/layout';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Layout />
        </Router>
      </div>
    );
  }
}

export default App;
