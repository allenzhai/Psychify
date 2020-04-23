import React from 'react';
import Navbar from '../components/Navbar';
import Searchbar from '../components/Searchbar';

import '../style/Home.css';

export default function Home() {
  return (
    <div className="home-content">
      <Navbar />
      <div className="landing-content">
        <h2 className="landing-title">The quick and easy DSM-V search.</h2>
        <h2 className="landing-subtitle">Find conditions. Connect with real people.</h2>
        <Searchbar className="searchbar-home" />
      </div>
    </div>
  );
}
