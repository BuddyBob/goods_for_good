import './MarketPopup.css';

import React, { useRef, useState } from 'react';

const MarketPopup = ({onClose,itemId, item}) => {

  
  

  return (
    <div className="container card">
      <div className="center-content">
        <div className="row add-image-container">
            
            <img src={`http://127.0.0.1:4000/api/main/get-image/${itemId}`} className="uploaded-image" alt="Uploaded" />
           
        </div>
      
      </div>
    </div>
  );
}

export default MarketPopup;
