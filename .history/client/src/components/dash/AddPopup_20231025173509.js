import './AddPopup.css';

import React, { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { AiOutlineClose } from 'react-icons/ai'
import image from '../../Assets/image-add.png';

const AddPopup = ({onClose}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const fileInputRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const locationRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const failNoti = () => toast("Failed to upload item");

  const [currentLocation, setCurrentLocation] = useState(localStorage.getItem('location'));

  const handleLocationChange = (event) => {
    setCurrentLocation(event.target.value);
  };

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
    const formData = new FormData();

    formData.append('title', titleRef.current.value);
    formData.append('description', descriptionRef.current.value);
    formData.append('location', locationRef.current.value);
    formData.append('image', fileInputRef.current.files[0]);



    try {
      setIsLoading(true);
      const response = await fetch('http://127.0.0.1:4000/api/main/upload-item', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
        },
      });
      if (response.ok) {
        console.log('Upload successful');
        onClose();
      } else {
        console.error('Upload failed');
        failNoti()
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container pop-container1">
       <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
      <div className="center-content">
        <AiOutlineClose className="addpopup-close" onClick={() => onClose()} />
        <div className="row add-image-container">
          {isLoading ? (
            <div class="spinner-border text-warning" role="status" style={{"position": "absolute", "top": "50%"}}>
              <span class="sr-only"></span>
            </div>
          ) : (
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
            ref={fileInputRef}
          />
          )}
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
        <form>
        <div className='row add-title'> 
          <input type="text" className="add-input form-control form-control-lg" placeholder="Title" ref={titleRef}/>
        </div>
        <div className='row add-description'>
          <input className="add-input form-control form-control-lg" placeholder="Description" ref={descriptionRef}/>
        </div>
        <div className='row add-location'>
          <input type="text" className="add-input form-control form-control-lg" placeholder="Location" ref={locationRef} value={currentLocation} onChange={handleLocationChange} />
        </div>
        <div className="row add-submit-container">
            <button className="btn btn-primary add-submit" onClick={(e) => uploadItem(e)}>Submit</button>
        </div>
        </form>
      </div>
    </div>
  );
}

export default AddPopup;
