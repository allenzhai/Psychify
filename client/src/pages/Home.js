import React, {Component} from 'react';
import {Navbar} from './components/Navbar';
import {Searchbar} from './components/Searchbar';
//import {DisorderDetails} from './components/DisorderDetails';
import './components/style/Home.css';

export class Home extends React.Component {

    render() {
      return (
        <body>
          <Navbar />
          <h1 className="landing-title">Psychology Search</h1>
          <h2 className="landing-subtitle">The quick and easy DSM-V search</h2>
          <Searchbar className="searchbar-home"/>
        </body>
      );
    }
}