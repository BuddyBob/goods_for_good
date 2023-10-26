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
        item: item
      }),
    }).then((response) => {
      if (response.ok) {
        setStepNumber(3);
      } else {
        throw new Error('Item not found');
      }
    }).catch((error) => {
      console.error(error);
    })
  }

  const handleClose = () => {
    window.location.reload();
    onClose();
  }
      


  return (
    <div className="marketPopup">
      {
        stepNumber == 1 ? (
          <div className="marketPopup__step">
            <h2 className="marketPopup__step__title">Are you sure?</h2>
            <div className="row confirmation-buttons">
              <input type="button" className="col-5 btn btn-primary" style={{"width": "100px", "margin-right": "10px"}} value="Yes" onClick={() => setStepNumber(2)}/>
              <input type="button" className="col-5 btn btn-primary" style={{"width": "100px"}}  value="No" onClick={() => onClose()}/>
            </div>
          </div>
        ) : stepNumber == 2 ? (
          <>
          <div className="marketPopup__step">
            <h2 className="marketPopup__step__title">Item confirmation</h2>
            <div className="row item-info">
              <p className="col-3">Title:</p>
              <p className="col-9">{item.title}</p>
              <p className="col-3">Description:</p>
              <p className="col-9">{item.description}</p>
              <p className="col-3">From</p>
              <p className="col-9">{item.location}</p>
              
            </div>
          </div>
          <input type="button" className="col-3 btn btn-primary mt-2" style={{"margin-left": "10px"}} value="Yes" onClick={() => setStepNumber(3)}/>
          </>
        ) : stepNumber == 3 ? (
          <>
            <div className="marketPopup__step">
              <h2 className="marketPopup__step__title">Item Pickup Location</h2>
              <div className="row item-info">
                <p className="col-3">Location:</p>
                <form>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Pickup Location</label>
                    <input type="password" class="form-control" id="exampleInputPassword1"/>
                  </div>
                </form>
              </div>  
            </div>
          </>
        ) : 
        
        stepNumber == 4 ? (
          <div className='marketPopup__step1'>
            <h2 className="marketPopup__step1__title">Item checked out!</h2>
            <input type="button" className="col-3 btn btn-primary" value="OK" onClick={() => handleClose()}/>
          </div>
        ) : null
      }

    </div>
  );
}

export default MarketPopup;
