import './AddPopup.css';

import React, { useRef, useState } from 'react';

import image from '../../Assets/image-add.png';

const MarketPopup = ({onClose,itemId, item}) => {

  
  

  return (
    <div className="container pop-container">
      <div className="center-content">
        <div className="row add-image-container">
            
            <img src={`http://127.0.0.1:4000/api/main/get-image/${itemId}`} className="uploaded-image" alt="Uploaded" />
           
        </div>
        <div className='row add-title'> 
          <p className="market-popup-title">
            {item.title}
          </p>
        </div>
        {/* <div className='row add-description'>
          <textarea className="add-description-input" placeholder="Description" ref={descriptionRef}/>
        </div>
        <div className='row add-location'>
          <input type="text" className="add-input" placeholder="Location" ref={locationRef}/>
        </div>
        <div className="row add-submit-container">
            <button className="btn btn-primary add-submit" onClick={(e) => uploadItem(e)}>Submit</button>
        </div> */}
      </div>
    </div>
  );
}

export default MarketPopup;
