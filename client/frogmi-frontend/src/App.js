import React, { useState, useEffect } from 'react';
import axios from 'axios';

import FeatureCard from './components/FeatureCard';
import FilterFeatures from './components/FilterFeatures';

const App = () => {
  const [features, setFeatures] = useState([]);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [featuresPerPage, setFeaturesPerPage] = useState(10);

  // Obtain Features when loading the page
  useEffect(() => {
    axios.get(`http://localhost:3000/features/index?page=${currentPage}&per_page=${featuresPerPage}`)
      .then(response => {
        setFeatures(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching features:', error);
      });
  }, [currentPage, featuresPerPage]);
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };
  
  const goToNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };
  
  // Change results per page
  const handleFeaturesPerPageChange = (event) => {
    const newFeaturesPerPage = parseInt(event.target.value);
    setFeaturesPerPage(newFeaturesPerPage);
    // Return to page 1
    setCurrentPage(1);
  };



  return (
    <div style={{paddingLeft:20}}>
      <h1>Features USGS</h1>

      <div style={{paddingLeft:20}}>
        <ul>
          {features.map(feature => (
            <FeatureCard key={feature.id} feature={feature}></FeatureCard>
          ))}
        </ul>
      </div>
      
      <div>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous Page</button>
        <button onClick={goToNextPage}>Next Page</button>
        <span>Features per Page:</span>
        <input type="text" value={featuresPerPage} onChange={handleFeaturesPerPageChange}>
          
        </input>
      </div>

    </div>
  );
};

export default App;

