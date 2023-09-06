import React, { useState } from 'react';
import '../styles/signin.css';
import Logo from '../assets/logo.png';
import {BrowserRouter as Router ,Route , Routes ,Link} from 'react-router-dom'; 
import Signup from './signup';
import Dashboard from './dashboard' ; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Signin() {
  const [email , setemail] = useState('');
  const [password , setpassword] = useState('');

  const navigate = useNavigate();
  
  const LogInUser= async()=>{

      try {
        if (!email && !password) {
          alert('Please fill in both email and password.');
          return;
        }
        else if (!email){ alert('Please fill in email !');
        return;}
        else if (!password){ alert('Please fill in the password !');
        return;}
        const formData = {
          Email: email,
          password: password
        };
        
        const response = await axios.post('http://127.0.0.1:5000/login', formData);
        if (response.status === 200) {
          const token = response.data.token;
          localStorage.setItem('token', token);
          navigate('/Dashboard');
        } else {
          alert('Login failed. Please check your credentials.');
        }
        
    } catch(error) {
      console.log(error, 'error');
      if (error.response) {
          if (error.response.status === 401) {
              alert("Invalid password");
          } else if (error.response.status === 400) {
              alert("Invalid email");
          }else {
            alert('Login failed. Please check your credentials.');
          }
      }
  

  
};


  };
  return (
    <form className="signin-form">
    <div className="image-container">
      <img src={Logo} className="rounded-circle bg-outline-light logo" alt="Logo Chatbotyy" />
    </div>

    <div className="input-container">
      <input type="text" id="form3Example1m" className="form-control form-control-lg" placeholder="Email Address" value={email} onChange={(e)=>setemail(e.target.value)} />
      <br></br>
      <br></br>
      <input type="password" id="form3Example1n" className="form-control form-control-lg" placeholder="Password"  value={password} onChange={(e)=>setpassword(e.target.value)}/>
      <br></br>
      
      <a href="#!" className="link text-light">Forgot password?</a>
    </div>
    <div className="btn btn-outline-light btn-block mb-4 btn-lg" onClick={LogInUser}>Sign In </div>
 

    <div className="text-center text-white">
      <p>
        Not a member? <Link to="/Signup" className="text-light">Register Now</Link>
      </p>
      <Routes>
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </div>
  </form>
        
  )
}

export default Signin