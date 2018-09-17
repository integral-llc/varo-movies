import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'open-iconic/font/css/open-iconic-bootstrap.css';
import {MoviesHome} from "./components/moviesHome";


class App extends Component {
  render() {
    return (
      <div className='container'>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className='navbar-brand'>Varo</a>
        </nav>

        <MoviesHome/>
      </div>
    );
  }
}

export default App;
