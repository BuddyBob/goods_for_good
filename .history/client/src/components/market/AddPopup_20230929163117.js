import './AddPopup.css';

import React, { useRef, useState } from 'react';

import image from '../../Assets/image-add.png';

const AddPopup = ({onClose}) => {


  

  return (
    <div className="container pop-container">
      <div className="center-content">
        {/* <div className="row add-image-container">
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
                ref={fileInputRef}
            />
            { imageSrc ? (
                <img src={imageSrc} className="uploaded-image" alt="Uploaded" />
            ):(
            <img
                src={image}
                className="add-image"
                onClick={() => fileInputRef.current.click()}
                alt="Upload"
            />
            )}
        </div>
        <div className='row add-title'> 
          <input type="text" className="add-input" placeholder="Title" />
        </div>
        <div className='row add-description'>
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

export default AddPopup;
