import './MarketPopup.css';

import React, { useRef, useState } from 'react';

const MarketPopup = ({onClose,itemId, item}) => {

  const [stepNumber, setStepNumber] = useState(1);
  

  return (
    <div className="marketPopup">
      {
        stepNumber == 1 && (
          <div className="marketPopup__step1">
            <div className="marketPopup__step1__title">
              <h1>Are you sure you want to buy this item?</h1>
            </div>
            <div className="marketPopup__step1__buttons">
              <button onClick={() => setStepNumber(2)}>Yes</button>
              <button onClick={onClose}>No</button>
            </div>
          </div>
        )
      }

    </div>
  );
}

export default MarketPopup;
