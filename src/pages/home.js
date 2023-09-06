import React from 'react';
import { Link} from 'react-router-dom';
import "../styles/Home.css" ;
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatPage from '../pages/chatpage';
import Signin from '../pages/signin';
import Signup from '../pages/signup' ;
import Logo from '../assets/logo.png'
function home() {
 
  return (
    <div>
       <img className="logo" src={Logo} alt='Logo chatbotyy' />
       <h1 className="display-4 fw-light lh-1 text-light"> Welcome to our Website </h1>
      
       <Link to="/Signin" > <button type="button" class="btn btn-outline-light text-light  " >Sign In </button></Link>
       
       <Link to="/Signup" > <button type="button" class="btn btn-outline-light text-light  " >Sign Up</button></Link>
    </div>
  )
}

export default home