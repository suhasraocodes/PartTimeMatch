import React, { useState } from 'react';
import Analytics from './Analytics';
import Cards from './Cards';
import Slider from './Slider';

const Home = ({ darkMode }) => {
  return (
    <div>
    <Slider/>
     <Analytics/>
     <Cards/>
    </div>
  );
};

export default Home;
