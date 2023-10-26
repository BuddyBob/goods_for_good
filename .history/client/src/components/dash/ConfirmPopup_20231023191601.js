import './AddPopup.css';

import React, { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { AiOutlineClose } from 'react-icons/ai'
import { Rating } from 'react-simple-star-rating'
import ReturnMapData from './ReturnMapData';
import image from '../../Assets/image-add.png';

const ConfirmPopup = ({props, onClose}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const fileInputRef = useRef(null);
  const [donorRating, setDonorRating] = useState(0)
  const [doneeRating, setDoneeRating] = useState(0)

  console.log(props)
  const failNoti = () => toast("Failed to confirm delivery");

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
  
  const confirmDelivery = async (e) => {
    e.preventDefault();


    

    try {
      const response = await fetch('http://127.0.0.1:4000/api/main/confirm-delivery', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            item_id: props.itemId,
            item: props.item,
            donor_rating: donorRating,
            donee_rating: doneeRating,
            duration: null
        })
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
    }
  };
  
  const handleRating = (rate) => {
    setDonorRating({"donor": rate})
    console.log(rate)
  }

  const handleRating2 = (rate) => {
    setDoneeRating({"donee": rate}) //
    console.log(rate)
  }

  return (
    <div className="container pop-container">
       <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
      <div className="center-content">
        <AiOutlineClose className="addpopup-close" onClick={() => onClose()} />
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
        <form>
        
            <p className="add-description text-center">Rate the Donor</p>
            <Rating
            onClick={handleRating}
            />

            <p className="add-description text-center mt-4">Rate the Donee</p>
            <Rating
            onClick={handleRating2}
            />
            
            <div className="row add-submit-container">
                <button className="btn btn-primary mt-4 add-submit" onClick={(e) => confirmDelivery(e)}>Submit</button>
            </div>
        
        </form>
      </div>
    </div>
  );
}

export default ConfirmPopup;
