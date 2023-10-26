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
        <h1>Are you sure you want to claim this item?</h1>
        <input
          type="button"
          className="btn btn-primary claim-2"
          value="Yes"
          onClick={() => {
            setMainPopup(true);
            onClose();
          }}
        />
        <input
          type="button"
          className="btn btn-primary claim-2"
          value="No"
          onClick={() => {
            setMainPopup(true);
            onClose();
          }}
        />
      </div>
    )}

    </div>
  );
}

export default MarketPopup;
