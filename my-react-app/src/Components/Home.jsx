import React from 'react';
import Heading from './Heading'; // Adjusted import path
import Navbar from './Navbar'; // Adjusted import path
import Up from './up';
import End from './End';

const Home = () => { // Added = and ()
  return (
    <div>
      <Heading/>
      <Navbar/>
      <Up/>
      <End/>
    </div>
  );
};

export default Home;