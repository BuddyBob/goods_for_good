import './MarketPopup.css';

import React, { useRef, useState } from 'react';

const MarketPopup = ({onClose,itemId, item}) => {

  const [mainPopup, setMainPopup] = useState(false);
  

  return (
    <div>
    {!mainPopup ? (
      <input
        type="button"
        className="btn btn-primary claim-1"
        value="Claim"
        onClick={() => setMainPopup(true)} // Use an arrow function to call setMainPopup
      />
    ) : (
      <div className="card-item marketPopup">
        <div className="card-body">
          <h4 className="card-title">{item.title}</h4>
          <p className="card-text">{item.description}</p>
          <p className="card-text">{item.location}</p>
          <p className="card-text">{item.status}</p>
          <input
            type="button"
            className="btn btn-primary claim-1"
            value="Close"
            onClick={() => setMainPopup(false)} // Use an arrow function to call setMainPopup
          />
        </div>
      </div>
    )}

    </div>
  );
}

export default MarketPopup;
