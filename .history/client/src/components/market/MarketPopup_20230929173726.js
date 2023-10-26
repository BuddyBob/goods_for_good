import './MarketPopup.css';

import React, { useRef, useState } from 'react';

const MarketPopup = ({onClose,itemId, item}) => {

  const [stepNumber, setStepNumber] = useState(1);
  

  return (
    <div className="marketPopup">
      {
        stepNumber == 1 && (
          <div className="marketPopup__step1">
            <h2 className="marketPopup__step1__title">Are you sure?</h2>
            <div className="row confirmation-buttons">
              <input type="button" className="col-3 btn btn-primary mr-2" value="Yes" onClick={() => setStepNumber(2)}/>
              <input type="button" className="col-3 btn btn-primary ml-2 c" value="No" onClick={() => onClose()}/>
            </div>
          </div>
        )
      }

    </div>
  );
}

export default MarketPopup;
