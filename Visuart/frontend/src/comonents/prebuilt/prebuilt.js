// import React from "react";
// import Gigcard from "./gigcard/gigcard.js";
// import { gigs } from "../../data";
// import "../prebuilt/prebuilt.scss"
// const Prebuilt = () => {
//   return (
//     <div className="gigs">
//       <div className="container">
//         <span className="breadcrumbs"><i onClick={()=>{
//             window.location.href = "/"
//         }}>VisuArt </i> > Prebuilt Designs></span>
 
//         <h1>Simplify Design</h1>
//         <p>Discover Prebuilt AI Image Artistry</p>
//         <div className="cards">
//           {gigs.map((gig) => (
//             <Gigcard key={gig.id} item={gig} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Prebuilt

import React, { useState, useEffect } from "react";
import Gigcard from "./gigcard/gigcard.js";
import "../prebuilt/prebuilt.scss";

const Prebuilt = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Your API endpoint URL
    const apiUrl = "http://127.0.0.1:5000/dashboard/get_user_designs";
    
    // Get the bearer token from local storage
    const token = localStorage.getItem("token");

    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setImages(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">
          <i
            onClick={() => {
              window.location.href = "/";
            }}
          >
            VisuArt
          </i>{" "}
           Prebuilt Designs
        </span>

        <h1>Simplify Design</h1>
        <p>Discover Prebuilt AI Image Artistry</p>
        <div className="cards">
          {images.map((image) => (
            <Gigcard key={image._id} item={image} />
          ))}
        </div>
        {error && <p>Error: {error.message}</p>}
      </div>
    </div>
  );
};

export default Prebuilt;
