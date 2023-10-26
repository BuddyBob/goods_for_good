import './AddPopup.css';

import { DirectionsRenderer, GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import React, { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { AiOutlineClose } from 'react-icons/ai'
import { Rating } from 'react-simple-star-rating'
import image from '../../Assets/image-add.png';

const ConfirmPopup = ({props, onClose}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const fileInputRef = useRef(null);
  const [donorRating, setDonorRating] = useState(0)
  const [doneeRating, setDoneeRating] = useState(0)
  const [duration, setDuration] = useState(null);

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

  const returnDuration = async (item) => {
    return new Promise((resolve, reject) => {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {origin: item.location,destination: item.donee_location,travelMode: window.google.maps.TravelMode.DRIVING,},
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDuration(result.routes[0].legs[0].duration.text);
            resolve(result.routes[0].legs[0].duration.text);
          } else {reject(`error fetching directions ${result}`);}
        }
      );
    });
  };

  
  
  const confirmDelivery = async (e) => {
    e.preventDefault();



    try {
      const dur = await returnDuration(props.item);
      console.log(dur)
    } catch (error) {console.error(error);}
    
    try {
      // formData.append('image', fileInputRef.current.files[0]);

      const response = await fetch('http://127.0.0.1:4000/api/main/confirm-delivery', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          item_id: props.itemId,
          item: props.item,
          donor_rating: donorRating,
          donee_rating: doneeRating,
          dur: duration
        })
      });
      if (response.ok) {
        console.log('Upload successful');
        onClose("success");
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
    <div className="container pop-container1">
       <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
      <div className="center-content">
        <AiOutlineClose className="addpopup-close" onClick={() => onClose("exit")} />
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
