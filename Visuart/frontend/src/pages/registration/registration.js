// import React from 'react'
// import "./register.scss"
// const Register = () => {
//     return (
//       <div className="register">
//         <div className="container">
//           <form action="/">
//             <h1>
//             VisuArt
//             </h1>
           
//             <label for="Email">Email:</label>
  
//             <input type="email" id="email" name="email" val="xyz@gmail.com" />
//             <label for="Phone">Phone No:</label>
  
//             <input type="tel" id="Phone No." name="Phone No." />
//             <label for="password">Password:</label>
  
//             <input type="password" id="password" name="password" />
//             <label for="password">Retype Password:</label>
  
//             <input type="password" id="password" name="retype password" />
  
//             <button>Register</button>
//           </form>
//         </div>
//       </div>
//     );
//   };
//   export default Register

import React from 'react';
import './register.scss';

const Register = () => {
  const handleRegister = async (event) => {
    event.preventDefault(); // Prevent form submission

    try {
      const url = 'http://127.0.0.1:5000/auth/register';

      const data = {
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value,
        retypePassword: document.getElementById('retypePassword').value,
      };

      if (data.password !== data.retypePassword) {
       
        console.error('Password and retype password do not match.');
        return;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Registration successful:', responseData);
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="register">
      <div className="container">
        <form onSubmit={handleRegister}>
          <h1>VisuArt</h1>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" defaultValue="xyz@gmail.com" />
          <label htmlFor="phone">Phone No:</label>
          <input type="tel" id="phone" name="phone" />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
          <label htmlFor="retypePassword">Retype Password:</label>
          <input type="password" id="retypePassword" name="retypePassword" />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
