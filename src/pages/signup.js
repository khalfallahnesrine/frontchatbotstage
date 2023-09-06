import React , {useState} from 'react'
import {BrowserRouter as Router ,Route , Routes ,Link , useNavigate } from 'react-router-dom'; 
import Logo from '../assets/logo.png'
import Signin from './signin';
import '../styles/signup.css'; 
import axios from 'axios';
import Dashboard from './dashboard';
function Signup() {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    Firstname: firstname,
    Lastname:lastname,
    Email: email, 
    password: password
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const formData = {
        Firstname: firstname,
        Lastname: lastname,
        Email: email,
        password: password
      };

    
      
      const response = await axios.post('http://127.0.0.1:5000/create', formData); // Send the POST request
      const token = response.data.token; // Get the token from the response

      // Log the token for debugging purposes
      console.log('Token:', token);

      // Now you can navigate to the dashboard page
      navigate('/Dashboard');
    } catch (error) {
      if (!firstname && ! lastname && !email && !password) {
        alert('Please, fill in the form .');
        return;
      }
      else if (!firstname){ alert('firstname is required !');
      return;}
      else if (!lastname){ alert('lastname is required !');
      return;}
      else if (!email){ alert(' email is required !');
      return;}
      else if (!password){ alert('password is required!');
      return;}
      console.error('Error:', error);
       if (error.response){  if (error.response) {
        if (error.response.status === 400) {
          alert("Email address already used");
        }else {
          alert('Sign Up failed. Please check your credentials.');
        }

    }}
      // Handle the error here
    }
  };
  
  return (
    
    <form className="signup-form">
    <div className="image-container">
      <img src={Logo} className="logo" alt="Logo Chatbotyy" />
    </div>
    <div className="form-container">
      <div className="form-outline form-inline">
        <input type="text" id="firstName" className="form-control form-control-lg" placeholder="First Name"  value={firstname} onChange={(e) => setFirstName(e.target.value)} />
     
        <input type="text" id="lastName" className="form-control form-control-lg" placeholder="Last Name" value={lastname} onChange={(e) => setLastName(e.target.value)}  required/>
      </div>
      <div className="form-outline">
        <input type="text" id="email" className="form-control form-control-lg" placeholder="Email Address"  value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="form-outline">
        <input type="password" id="password" className="form-control form-control-lg" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)} required/>
      </div>
    </div>
    <div className="button-container">
      <button type="button" className="btn btn-outline-light btn-block btn-lg mb-6" onClick={handleSubmit}>
        Sign up
      </button>
    </div>
    <br></br>
    <div className="text-center text-white">
      <p>
        Already a member? <Link to="/Signin" className="text-light">Sign In Now</Link>
      </p>
      <Routes>
        <Route path="/Signin" element={<Signin />} />
      </Routes>
    </div>
  </form>
 
  )
}

export default Signup