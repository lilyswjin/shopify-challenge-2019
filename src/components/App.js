import React, { Component } from 'react';
import '../App.css';
import { Header } from './Header';
import Search from './Search';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Search />
      </div>
    );
  }
}

export default App;
