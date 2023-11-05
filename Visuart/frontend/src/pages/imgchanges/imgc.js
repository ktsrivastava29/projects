// import React from "react";
// import "../imgchanges/imgc.scss";
// import menu from "../texttoimg/menu.png";
// const Imgc = () => {
//   return (
//     <div className="imgc">
//       <div className="h1">
//         <h1>AI-Powered Image Enhancement and Painting transformation </h1>
//       </div>
//       <div className="container">
//         <div className="desc">
//           <p>
//             Transform your photos into stunning works of art with the magic of
//             artificial intelligence. Our cutting-edge technology brings your
//             images to life in ways you've never imagined.
//             <hr />
//             Whether you want to enhance the clarity and vibrancy of your photos
//             or turn them into beautiful paintings, we've got you covered
//           </p>
//         </div>

//         <div className="prompt">
//           <div className="img">
//             <img src={menu}></img>
//           </div>
//           <div className="desc-prompt">
//             <label for="file-upload" class="custom-file-input">
//               <input type="file" id="file-upload" />
//               <span class="custom-file-label">Choose a file</span>
//             </label>
//           </div>
//         </div>
//         <div className="buttons">
//           <button>Image Enhancement</button>
//           <button>Image to Sketch</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Imgc;


import React, { useState } from 'react';
import '../imgchanges/imgc.scss';
import menu from '../texttoimg/menu.png';
import del_ from "../texttoimg/close_6318592.png"
import cat from "../texttoimg/images.jpg"

const Imgc = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(cat);
  const [showOverlay, setShowOverlay] = useState(true);
  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    setSelectedImage(file); // Store the file itself, not the URL
  };
  

  const handleImageEnhancement = async () => {
    if (!selectedImage) {
      alert('Please select an image to enhance.');
      return;
    }

    try {
      const url = 'http://127.0.0.1:5000/dashboard/imgToImg';
      const token = localStorage.getItem('token');

      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        setGeneratedImage(responseData.image_url);
        setShowOverlay(true);
      } else {
        console.error('Image enhancement request failed:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const closeOverlay = () => {
    // Hide the overlay
    setShowOverlay(false);
  };

  const handleImageToSketch = async () => {
    if (!selectedImage) {
      alert('Please select an image to convert to a sketch.');
      return;
    }

    try {
      const url = 'http://127.0.0.1:5000/dashboard/imgToSharp';
      const token = localStorage.getItem('token');

      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        setGeneratedImage(responseData.image_url);
        setShowOverlay(true);
      } else {
        console.error('Image to sketch request failed:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="imgc">
      <div className="h1">
        <h1>AI-Powered Image Enhancement and Painting Transformation</h1>
      </div>
      <div className="container">
        <div className="desc">
          <p>
            Transform your photos into stunning works of art with the magic of
            artificial intelligence. Our cutting-edge technology brings your
            images to life in ways you've never imagined.
            <hr />
            Whether you want to enhance the clarity and vibrancy of your photos
            or turn them into beautiful paintings, we've got you covered.
          </p>
        </div>

        <div className="prompt">
          <div className="img">
          <img src={selectedImage ? URL.createObjectURL(selectedImage) : menu} alt="Selected Image" />

          </div>
          <div className="desc-prompt">
            <label htmlFor="file-upload" className="custom-file-input">
              <input type="file" id="file-upload" accept="image/*" onChange={handleImageUpload} />
              <span className="custom-file-label">Choose a file</span>
            </label>
          </div>
        </div>
        <div className="buttons">
          <button onClick={handleImageEnhancement}>Image Enhancement</button>
          <button onClick={handleImageToSketch}>Image to Sketch</button>
        </div>
        {showOverlay && (
          <div className="image-overlay" >
            <div className="generated-image">
              <img  className="close" src={del_} onClick={closeOverlay}/>
              <img src={generatedImage} alt="Generated Image" />
              <button>Save</button>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Imgc;
// {generatedImage && (
//   <div className="generated-image-container">
//     <p>Generated Image:</p>
//     <img src={generatedImage} alt="Generated Image" />
//   </div>
// )}
