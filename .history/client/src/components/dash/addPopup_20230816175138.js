import React, { useState } from 'react';

function ImageUpload() {
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
    <div>
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
  );
}

export default ImageUpload;
