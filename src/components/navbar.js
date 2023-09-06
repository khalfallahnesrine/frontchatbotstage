import React from 'react';
import {Link } from 'react-router-dom'; 
import '../styles/Navbar.css';
function navbar() {
  return (
    <navbar className="Navbar">
      <div style={{ marginBottom: '16px' , color:'white' , textAlign:'center'  }}>
        <h2> <Link to='/'>Chatboty</Link>  </h2>
      <ul>
        <li><Link to='/' style={{marginRight:'16px' , color:'white' , textDecoration:'none'}}>Home</Link></li>
        <li><Link to='/'style={{marginRight:'16px', color:'white', textDecoration:'none'}}>ContactUs</Link></li>
        <li><Link to='/' style={{color:'white', textDecoration:'none'}}>AboutUs</Link></li></ul>
      </div>
  
  </navbar>
 
             
      
  )
}

export default navbar