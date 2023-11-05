import React from "react";
import "./saved.scss";
import { gigs } from "../../data";
import Gigcard from "../../comonents/prebuilt/gigcard/gigcard";
import lame from "../profile/link_6994770.png";
// import {ana} from"../../../bg-01.jpg"
const Saved = () => {
  //  const i = {
  //    id:1900,
  //    img: "https://icons.veryicon.com/png/o/miscellaneous/smile-preference/add-255.png"
  //  }
  return (
    <div className="Saved">
      <div className="container1">
        <div className="extra">
          <div className="ppname">
            <img src="img/ana.jpg"></img>
            <div className=" nameetc">
              <h3></h3>
              <label className="link">
                <img src={lame} />
                <h5>LINK</h5>
              </label>

              <button onClick={()=>{
                window.location.href ="/editprofile"
              }}>Edit Profile</button>
              <div className="info">
                <p>
                  10 <b>Saved posts</b>
                </p>
                <p>
                  5 <b>Uploaded Designs</b>
                </p>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <h1>SAVED/ </h1>
        <p onClick={()=>{
            window.location.href ="/profile"
        }}>YOUR DESIGNS</p>
        <div className="yourdesigns">
          <div className="cards">
            {gigs.map((gig) => ( gig.state ?
              <Gigcard key={gig.id} item={gig} />: <></>
            ))}

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saved;