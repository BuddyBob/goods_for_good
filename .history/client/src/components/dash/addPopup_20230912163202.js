import './AddPopup.css';

import React, { useRef, useState } from 'react';

import image from '../../Assets/image-add.png';

const AddPopup = ({onClose}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const fileInputRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const locationRef = useRef(null);

  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setImageSrc(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };
  
  const uploadItem = async (e) => {
    e.preventDefault();
  
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("title", titleRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("location", locationRef.current.value);
    formData.append("image", fileInputRef.current.files[0]);
  
    // Now you can send formData to your server, which should handle the file upload with GridFS
    try {
      const response = await fetch('http://127.0.0.1:4000/api/main/upload-item', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
        },
      });
      console.log(response)
      if (response.ok) {
        console.log('Upload successful');
        onClose();
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error(error);
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
          <input type="text" className="add-input" placeholder="Title" ref={titleRef}/>
        </div>
        <div className='row add-description'>
          <textarea className="add-description-input" placeholder="Description" ref={descriptionRef}/>
        </div>
        <div className='row add-location'>
          <input type="text" className="add-input" placeholder="Location" ref={locationRef}/>
        </div>
        <div className="row add-submit-container">
            <button className="btn btn-primary add-submit" onClick={(e) => uploadItem(e)}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default AddPopup;
