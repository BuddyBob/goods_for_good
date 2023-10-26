import './MarketPopup.css';

import React, { useRef, useState } from 'react';

const MarketPopup = ({onClose,itemId, item}) => {

  
  

  return (
    <div className="container pop-container">
      <div className="center-content">
        <div className="row add-image-container">
            
            <img src={`http://127.0.0.1:4000/api/main/get-image/${itemId}`} className="uploaded-image" alt="Uploaded" />
           
        </div>
        <div className='row add-title'> 
          <h4>
            {item.title}
          </h4>
        </div>
        <div className='row add-description'>
          <p>
            {item.description}
          </p> 
        </div>
        <div className='row add-location'>
          <p>
            {item.location}
          </p> 
        </div>

{/* 
        <div className="row add-submit-container">
            <button className="btn btn-primary add-submit" onClick={(e) => uploadItem(e)}>Submit</button>
        </div> */}
      </div>
    </div>
  );
}

export default MarketPopup;
