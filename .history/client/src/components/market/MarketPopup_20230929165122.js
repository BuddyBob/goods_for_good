import './MarketPopup.css';

import React, { useRef, useState } from 'react';

const MarketPopup = ({onClose,itemId, item}) => {

  
  

  return (
    <div className="card" style={{"width": "18rem", "position": "absolute"}}>
      <img src={`http://127.0.0.1:4000/api/main/get-image/${itemId}`} className="card-img-top" style={{"width": "18rem"}} alt="Uploaded" />
      <div class="card-body">
        <h5 class="card-title">{item.title}</h5>
        <p class="card-text">{item.description}</p>
      </div>
    </div>
  );
}

export default MarketPopup;
