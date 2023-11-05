// import React from "react";
// import "./ttoimg.scss";
// import menu from "./menu.png"
// const Ttoimg = () => {
//   return (
//     <div className="ttoimg">
//       <div className="h1">
//         <h1>AI generator</h1>
//       </div>
//       <div className="container">
//         <div className="desc">
//           <p>
//             Generate an image using AI! An image will be generated based on a
//             description about the image, this is often called a prompt.
//             <hr />A good prompt needs to describe the subject of the image (what
//             the image is about) and how the image should look, so things like if
//             it's a painting or a sketch, realistic or stylized.
//           </p>
//         </div>

//         <div className="prompt">
//           <div className="img">
//             <img src={menu}></img>
//           </div>
//           <div className="desc-prompt">
//             <label>Description prompt</label>
//             <textarea
//               className="big"
//               columns="40"
//               placeholder="futuristic lighthouse, flash light, hyper realistic, epic composition, cinematic, landscape vista photography, landscape veduta photo & tdraw, detailed landscape painting rendered in enscape, miyazaki, 4k detailed post processing, unreal engineered"
//             />
//             {/* <label class="pad-5">Remove (negative prompt)</label>
//             <textarea
//               className="small"
//               type="text"
//               placeholder="What do you want to avoid ?"
//             /> */}
//           </div>
//         </div>
//         <button>Generate</button>
//       </div>
//     </div>
//   );
// };

// export default Ttoimg;

import React, { useState } from "react";
import "./ttoimg.scss";
import menu from "./menu.png";
import del_ from"./close_6318592.png"
import newimage from "./images.jpg";

const Ttoimg = () => {
  const [imageSrc, setImageSrc] = useState( newimage ); // State to store the image source

  const [showOverlay, setShowOverlay] = useState(true);
  
  const generateImage = async () => {
    // Your API endpoint for image generation
    const apiUrl = "http://127.0.0.1:5000/dashboard/textToImg";

    // Get the user input (description prompt) from the textarea
    const descriptionPrompt = document.querySelector(".big").value;

    // Get the bearer token from local storage
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: descriptionPrompt }),
      });

      if (response.ok) {
        const responseData = await response.json();
        // Set the image source based on the response
        setImageSrc(responseData.image_url);
        setShowOverlay(true);
      } else {
        // Handle the error here
      }
    } catch (error) {
      // Handle any network or other errors here
    }
  };
  const closeOverlay = () => {
    // Hide the overlay
    setShowOverlay(false);
  };

  return (
    <div className="ttoimg">
      <div className="h1">
        <h1>AI generator</h1>
      </div>
      <div className="container">
        <div className="desc">
          <p>
            Generate an image using AI! An image will be generated based on a
            description about the image, this is often called a prompt.
            <hr />A good prompt needs to describe the subject of the image (what
            the image is about) and how the image should look, so things like if
            it's a painting or a sketch, realistic or stylized.
          </p>
        </div>

        <div className="prompt">
          <div className="img">
            <img onClick = {()=>{window.location.href = "/imgchnage"}}src={menu} alt="menu" />
          </div>
          <div className="desc-prompt">
            <label>Description prompt</label>
            <textarea
              className="big"
              columns="40"
              placeholder="futuristic lighthouse, flash light, hyper realistic, epic composition, cinematic, landscape vista photography, landscape veduta photo & tdraw, detailed landscape painting rendered in enscape, miyazaki, 4k detailed post processing, unreal engineered"
            />
          </div>
        </div>
        <button onClick={generateImage}>Generate</button>
        {showOverlay && (
          <div className="image-overlay" >
            <div className="generated-image">
              <img  className="close" src={del_} onClick={closeOverlay}/>
              <img src={imageSrc} alt="Generated Image" />
              <button>Save</button>
            </div>
          </div>
        )}
      </div>
     
      </div>
  );
};

export default Ttoimg;
// <div className="image-section">
// {imageSrc && (
//   <div className="generated-image">
//     <img src={imageSrc} alt="Generated Image" />
//     <button>Save Image</button>
//   </div>
// )}
// </div>