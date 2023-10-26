import './MarketPopup.css';

import React, { useRef, useState } from 'react';

const MarketPopup = ({onClose,itemId, item}) => {

  const [stepNumber, setStepNumber] = useState(1);
  const [doneeLocation, setDoneeLocation] = useState(localStorage.getItem("location"));
  
  const checkoutItem = () => {
    item['donee_location'] = doneeLocation;

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
        setStepNumber(4);
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
      
  const handleInputChange = (event) => {
    setDoneeLocation(event.target.value);
  };


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
            <h2 className="marketPopup__step__title">Item Confirmation</h2>
            <ul className="nav nav-tabs" id="itemTabs" role="tablist">
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link active"
                  id="title-tab"
                  data-toggle="tab"
                  href="#title"
                  role="tab"
                  aria-controls="title"
                  aria-selected="true"
                >
                  Title
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  id="description-tab"
                  data-toggle="tab"
                  href="#description"
                  role="tab"
                  aria-controls="description"
                  aria-selected="false"
                >
                  Description
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  id="from-tab"
                  data-toggle="tab"
                  href="#from"
                  role="tab"
                  aria-controls="from"
                  aria-selected="false"
                >
                  From
                </a>
              </li>
            </ul>
            <div className="tab-content" id="itemTabsContent">
              <div
                className="tab-pane fade show active"
                id="title"
                role="tabpanel"
                aria-labelledby="title-tab"
              >
                <p>{item.title}</p>
              </div>
              <div
                className="tab-pane fade"
                id="description"
                role="tabpanel"
                aria-labelledby="description-tab"
              >
                <p>{item.description}</p>
              </div>
              <div
                className="tab-pane fade"
                id="from"
                role="tabpanel"
                aria-labelledby="from-tab"
              >
                <p>{item.location}</p>
              </div>
            </div>
          </div>

          <input type="button" className="col-3 btn btn-primary mt-2" style={{"margin-left": "10px"}} value="Yes" onClick={() => setStepNumber(3)}/>
          </>
        ) : stepNumber == 3 ? (
          <>
            <div className="marketPopup__step">
              <h2 className="marketPopup__step__title">Item Pickup Location</h2>
                <form>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Pickup Location</label>
                    <input type="text" class="form-control" value={doneeLocation} onChange={handleInputChange}/>
                  </div>
                </form>
            </div>
            <input type="button" className="col-3 btn btn-primary mt-2" style={{"margin-left": "10px"}} value="Yes" onClick={() => checkoutItem()}/>
          </>
        ) : 
        
        stepNumber == 4 ? (
          <div className='marketPopup__step'>
            <h2 className="marketPopup__step__title">Item checked out!</h2>
            <input type="button" className="col-3 btn btn-primary" value="OK" onClick={() => handleClose()}/>
          </div>
        ) : null
      }

    </div>
  );
}

export default MarketPopup;
