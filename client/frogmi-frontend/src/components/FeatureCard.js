import React from 'react';
import './FeatureCard.css';

const FeatureCard = ({ feature }) => {
  return (
    <div className="feature-card">
        <h2>{feature.attributes.title}</h2>
        <p style={{paddingLeft:0}}>
            External id: {feature.attributes.external_id}<br></br>
            Magnitude: {feature.attributes.magnitude}<br></br>
            Magnitude type: {feature.attributes.mag_type}<br></br>
            Time: {feature.attributes.time}<br></br>
            Place: {feature.attributes.place}<br></br>
            Tsunami: {feature.attributes.tsunami}<br></br>
            Longitude: {feature.attributes.coordinates.longitude}<br></br>
            Latitude: {feature.attributes.coordinates.latitude}<br></br>
            URL: <a href={feature.links.external_url}>{feature.links.external_url}</a>
        </p>
    </div>
  );
};

export default FeatureCard;
