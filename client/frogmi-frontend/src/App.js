import React, { useState, useEffect } from 'react';
import axios from 'axios';

import FeatureCard from './components/FeatureCard';

const App = () => {
  const [features, setFeatures] = useState([]);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [featuresPerPage, setFeaturesPerPage] = useState(10);
  // Filter by mag_type
  const [filterValue, setFilterValue] = useState('');
  // Comments
  const [comments, setComments] = useState('');
  
  // Obtain Features when loading the page
  useEffect(() => {
    axios.get(`http://localhost:3000/features/index?page=${currentPage}&per_page=${featuresPerPage}&mag_type=${filterValue}`)
      .then(response => {
        setFeatures(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching features:', error);
      });
  }, [currentPage, featuresPerPage, filterValue]);
  
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

  const handleFilterChange = (event) => {
    const value = event.target.value.toLowerCase();
    setFilterValue(value);
  };
  // Handle change on comment input
  const handleCommentChange = (event, featureId) => {
    const { value } = event.target;
    setComments(prevComments => ({...prevComments, [featureId]: value}));
  };

  // POST to endpoint for creating comments
  const postComment = (featureId) => {
    const comment = comments[featureId]

    axios.post(`http://localhost:3000/features/${featureId}/comments`, { body: comment })
      .then(response => {
        console.log('Comment posted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error posting comment:', error);
      });
  };

  return (
    <div style={{paddingLeft:20}}>
      {/* Title */}
      <h1>Features USGS</h1>
      
      {/* Filter by magnitude type */}
      <div style={{marginLeft:40, marginTop:20}}>
        Filter by magnitude type
        <input style={{margin:10}}
          type="text" 
          placeholder={`Filter by magnitude type`} 
          value={filterValue}
          onChange={handleFilterChange} 
        />
      </div>
      
      {/* List of features */}
      <div style={{paddingLeft:20}}>
        <ul>
          {features.map(feature => (
            <div>
              <FeatureCard key={feature.id} feature={feature}></FeatureCard>
              {/*Comment*/}
              <div style={{marginLeft:150}}>
                Leave a comment!<br></br>
                <input type="text" value={comments[feature.id] || ''} onChange={(e) => handleCommentChange(e, feature.id)}></input>
                <button onClick={()=> postComment(feature.id)}>Post Comment</button>
              </div>
              
            </div>
          ))}
        </ul>
      </div>

      {/* Pagination */}
      <div style={{margin:30}}>
        <button onClick={goToPreviousPage} disabled={currentPage === 1} style={{margin:10}}>Previous Page</button>
        <button onClick={goToNextPage} style={{marginRight:10}}>Next Page</button>
        <span style={{marginLeft:15, marginRight:5}}>Features per Page:</span>
        <input type="text" value={featuresPerPage} onChange={handleFeaturesPerPageChange}>
          
        </input>
      </div>
      

    </div>
  );
};

export default App;
