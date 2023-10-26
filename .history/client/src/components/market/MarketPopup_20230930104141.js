import './MarketPopup.css';

import React, { useRef, useState } from 'react';

const MarketPopup = ({onClose,itemId, item}) => {

  const [stepNumber, setStepNumber] = useState(1);
  
  const checkoutItem = () => {
    fetch('http://127.0.0.1:4000/api/main/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        item_id: itemId,
      }),
    })
      


  return (
    <div className="marketPopup">
      {
        stepNumber == 1 ? (
          <div className="marketPopup__step1">
            <h2 className="marketPopup__step1__title">Are you sure?</h2>
            <div className="row confirmation-buttons">
              <input type="button" className="col-3 btn btn-primary mr-2 c" value="Yes" onClick={() => setStepNumber(2)}/>
              <input type="button" className="col-3 btn btn-primary ml-2" value="No" onClick={() => onClose()}/>
            </div>
          </div>
        ) : stepNumber == 2 ? (
          <>
          <div className="marketPopup__step2">
            <h2 className="marketPopup__step2__title">Item confirmation</h2>
            <div className="row item-info">
              <p className="col-3">Title:</p>
              <p className="col-9">{item.title}</p>
              <p className="col-3">Description:</p>
              <p className="col-9">{item.description}</p>
              <p className="col-3">Location:</p>
              <p className="col-9">{item.location}</p>
            </div>
          </div>
          <input type="button" className="col-3 btn btn-primary" value="Yes" onClick={() => checkoutItem()}/>
          </>
        ) : null
      }

    </div>
  );
}

export default MarketPopup;
