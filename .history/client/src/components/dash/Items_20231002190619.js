import React, { useEffect, useState } from 'react';

function Items({type}) {
  const [items, setItems] = useState([]);
  const [itemIds, setItemIds] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:4000/api/main/get-items', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("accessToken"),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //If the user is a donor we simply need to access donor market items
        //if the user is a donee we need to donor market (all items user has claimed)
        request:localStorage.getItem("userType")
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('No items found');
        }
      })
      .then((data) => {
        console.log(data)
        setItems(data.items);
        setItemIds(data.item_ids);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const fetchImage = (itemId) => {
    fetch(`http://127.0.0.1:4000/api/main/get-image/${itemId}`)
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error('Image not found');
        }
      })
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          const imageData = reader.result;
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // Fetch image data for each item
    itemIds.forEach((itemId) => {
      fetchImage(itemId);
    });
  }, [itemIds]);

  



  return (
    <>
      {items.map((item, index) => (
        <div className="col">
            <div className="status">
              <p className="status-text">{item.status}</p>
            </div>
            
            <div key={itemIds[index]} className="card-item mb-4">
                <img src={`http://127.0.0.1:4000/api/main/get-image/${itemIds[index]}`} className="card-img-top img-fluid item-image" alt="Item" />
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">{item.location}</p>
                </div>
            </div>
          </div>
      ))}
      
    </>
 
  );

}

export default Items;