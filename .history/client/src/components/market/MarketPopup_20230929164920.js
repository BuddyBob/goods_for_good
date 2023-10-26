import './MarketPopup.css';

import React, { useRef, useState } from 'react';

const MarketPopup = ({onClose,itemId, item}) => {

  
  

  return (
    <div className="container card">
      <img src={`http://127.0.0.1:4000/api/main/get-image/${itemId}`} className="card-img-top" alt="Uploaded" />
      <div class="card-body">
        <h5 class="card-title">{item.title}</h5>
        <p class="card-text">{item.description}</p>
      </div>
    </div>
  );
}

export default MarketPopup;
