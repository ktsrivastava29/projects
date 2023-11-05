// import React from "react";
// import "./login.scss";
// import google from "./google.png";
// import facebook from "./facebook.png";
// import twiter from "./twitter.png"
// import v from "./letter-v.png"
// const Login = () => {
//   return (
//     <div className="login">
//       <div className="container">
//         <form action="/">
//           <h1>
//           VisuArt
//           </h1>
         
//           <label for="Email">Email:</label>

//           <input type="email" id="email" name="email" val="xyz@gmail.com" />

//           <label for="password">Password:</label>

//           <input type="password" id="password" name="password" />

//           <button>Login</button>
//           <p>or sign in using</p>
//           <div className="ima">
//             <img src={google} />
//             <img src={facebook} />
//             <img  className='x' src={twiter} />
//           </div>
//         </form>{" "}
//       </div>
//     </div>
//   );
// };
// export default Login;

import React, { useState } from "react";
import "./login.scss";
import google from "./google.png";
import facebook from "./facebook.png";
import twiter from "./twitter.png";
// import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  // const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // Save the token in local storage
        localStorage.setItem("token", token);
        console.log(token, "token");
        // Update the token state
        setToken(token);
        // history.push("/");
      } else {
        // Handle login error, e.g., show an error message
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <form onSubmit={handleLogin}>
          <h1>VisuArt</h1>

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
          <p className="recover"onClick={()=>{window.location.href = "/recovery"}}>Forgot Password?</p>
          <p>or sign in using</p>
          <div className="ima">
            <img src={google} alt="Google" />
            <img src={facebook} alt="Facebook" />
            <img className="x" src={twiter} alt="Twitter" />
          </div>
        </form>{" "}
      </div>
    </div>
  );
};

export default Login;
