import React from 'react'
import '../styles/footer.css'
import { Link } from 'react-router-dom'
function footer() {
  return (
    
    <footer className="footer">
      <div style={{ marginBottom: '16px' , color:'white' , textAlign:'center'  }}>
      <Link to='/' style={{marginRight:'16px' , color:'white' , textDecoration:'none'}}>Home</Link>
      <Link to='/' style={{marginRight:'16px', color:'white', textDecoration:'none'}}>ContactUs</Link>
      <Link to='/' style={{color:'white', textDecoration:'none'}}>AboutUs</Link>
      </div>
    <div className="container">
      <p>© {new Date().getFullYear()} Chatboty</p>
    </div>

  </footer>
  )
}

export default footer
