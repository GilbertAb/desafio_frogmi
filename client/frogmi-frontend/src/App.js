import React, { useState, useEffect } from 'react';
import axios from 'axios';

import FeatureCard from './components/FeatureCard';

const App = () => {
  const [features, setFeatures] = useState([]);

  // Obtain Features when loading the page
  useEffect(() => {
    axios.get('http://localhost:3000/features/index')
      .then(response => {
        setFeatures(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching features:', error);
      });
  }, []);
  
  return (
    <div>
      <h1>Features</h1>
      <ul>
        {features.map(feature => (
          <FeatureCard key={feature.id} feature={feature}></FeatureCard>
        ))}
      </ul>
      
    </div>
  );
};

export default App;

