import React, { useState } from 'react';
import Analytics from './Analytics';
import Cards from './Cards';
import Slider from './Slider';

const Home = ({ darkMode }) => {
  return (
    <div className={darkMode ? 'dark' : ''}>
      <Slider />
      <Analytics />
      <Cards />
      Hooooooooooom
    </div>
  );
};

export default Home;
