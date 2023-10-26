import './AddPopup.css'

import React, { useState } from 'react'

import image from '../../Assets/image-add.png'

const AddPopup = () => {
    const [imageSrc, setImageSrc] = useState(null);

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
  
        reader.onload = function (e) {
          setImageSrc(e.target.result);
        };
  
        reader.readAsDataURL(file);
      }
    };
  
    return (
    <div className="container pop-container">
        <div className="center-content">
            <div className="row add-image-container">
                
                <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
                ref={(input) => (this.fileInput = input)}
                />
                <img
                src={imageSrc ? imageSrc : 'image-placeholder.png'}
                className="add-image"
                onClick={() => this.fileInput.click()}
                alt="Upload"
                />
                {imageSrc && <img src={imageSrc} className="uploaded-image" alt="Uploaded" />}
            
            </div>
            <div className='row add-title'> 
                <input type="text" className="add-input" placeholder="Title"/>
            </div>
            <div className='row add-description'>
                <textarea className="add-description-input" placeholder="Description"/>
            </div>

            <div className='row add-location'>
                <input type="text" className="add-input" placeholder="Location"/>
            </div>
        </div>
    </div>
    )
}

export default AddPopup