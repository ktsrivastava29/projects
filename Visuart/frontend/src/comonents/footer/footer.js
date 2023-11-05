import React from "react";
import "./footer.scss"
const Footer = () => {
  return (
    <div className="footer">
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>Join our Creative Community!</h1>
            <div className="title">
              <img src="img\message.png" alt="" />
              <p>
                Exclusive access to AI text-to-image and sketch-to-image updates
              </p>
            </div>
            <div className="title">
              <img src="img\message.png" alt="" />

              <p>Tips and tricks for unleashing your creativity</p>
            </div>
            <div className="title">
              <img src="img/message.png" alt="" />

              <p>Exciting design resources and freebies</p>
            </div>
          </div>
          <div className="signup">
          Enter your email address :-
            <input type="email" placeholder="xyz@example.com" />
            <button>Sign Up!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
