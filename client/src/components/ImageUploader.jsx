import React, { useState } from 'react';

const ImageUploader = () => {
  const [imageSrc, setImageSrc] = useState(null);

  console.log(imageSrc);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Set the image source once it's loaded
        setImageSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {imageSrc && (
        <div>
          <img src={imageSrc} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
          
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
