// import React from "react";
// import "./forgotpass.scss";
import google from "../../../src/login/google.png";
import facebook from "../../../src/login/facebook.png";
import twiter from "../../../src/login/twitter.png"
// // import v from "./letter-v.png"
// const Forgotpass = () => {
//   return (
//     <div className="forgotpass">
//       <div className="container">
//         <form action="/">
//           <h1>
//           VisuArt
//           </h1>
         
//           <label for="Email">Email:</label>

//           <input type="email" id="email" name="email" val="xyz@gmail.com" />
//           <button>Recover Account</button>
//           <p>or sign in using</p>
//           <div className="ima">
//             <img src={google} />
//             <img src={facebook} />
//             <img  className='x' src={twiter} />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default Forgotpass;

import React from 'react';
import './forgotpass.scss';

const Forgotpass = () => {
  const handleRecoverAccount = async (event) => {
    event.preventDefault(); // Prevent form submission

    try {
      const url = 'http://127.0.0.1:5000/auth/forgot_password';

      const data = {
        email: document.getElementById('email').value,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Password recovery request successful:', responseData);
      } else {
        const errorData = await response.json();
        console.error('Password recovery request failed:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="forgotpass">
      <div className="container">
        <form onSubmit={handleRecoverAccount}>
          <h1>VisuArt</h1>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" defaultValue="xyz@gmail.com" />
          <button type="submit">Recover Account</button>
          <p>or sign in using</p>
          <div className="ima">
            <img src={google} alt="Google" />
            <img src={facebook} alt="Facebook" />
            <img className="x" src={twiter} alt="Twitter" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgotpass;
