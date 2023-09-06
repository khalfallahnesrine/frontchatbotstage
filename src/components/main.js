import React from 'react'
import BackgroundVideo  from '../assets/vd4.mp4';
import Home  from '../pages/home' ;
import Navbar from '../components/navbar' ;
import Footer from '../components/footer';
import ChatPage from '../pages/chatpage';
import Signin from '../pages/signin';
import Signup from '../pages/signup';
import Dashboard from '../pages/dashboard'; 
import { Link} from 'react-router-dom';
import {BrowserRouter as Router ,Route , Routes } from 'react-router-dom'; 
import '../styles/Main.css'
import Profil from '../pages/profil'
import Chatbots from '../pages/chatbots'
import Chatpage from '../pages/chatpage';
import { useParams } from 'react-router-dom';
import Chaturl from '../pages/chaturl';
import Chatupdate from '../pages/chatupdate';
const main = ()=> {
  const currentPath = window.location.pathname;

  const shouldRenderVideo = !currentPath.includes('/Chaturl'); 
  return (
  
    <div className="background-video">
  
    
    {shouldRenderVideo && (<video src={BackgroundVideo} autoPlay loop muted  />)}
   
  <div className="content" >

  {shouldRenderVideo &&(<div style={{position: 'sticky'}}><Navbar /></div>)}
 
  <div>
 
    <div className="div">
    <Routes>
     <Route  path="/Chatpage/:chatbotsId" element={<ChatPage/>}  />

    </Routes>
     </div>
    <div className="div-2"> 
    <Routes>  
    <Route path='/Signin' element={<Signin/>}/> 
    </Routes>
    </div>
    <div className="div-3"> 
    <Routes>  
    <Route path='/Signup' element={<Signup/>}/> 
    </Routes>
    </div>
    
    <div className="div-4"> 
    <Routes>  
    <Route path='/Dashboard' element={<Dashboard/>}/> 
    </Routes>
    <Routes> 
    <Route path="/update/:chatbotsId" element={<Chatupdate />} />
    </Routes>
    </div>
     
    <div className="div-5"> 
    <Routes>  
    <Route path='/Profil' element={<Profil/>}/> 
    </Routes>
    </div>
   
    <Routes>  
    <Route path='/Chatbots' element={<Chatbots/>}/> 
    </Routes>
    
    
    <div className="div-1"> 
    <Routes>  
    <Route path='/' element={<Home/>}/> 
    </Routes>
 
  
    </div>
 
    <div style={{  width: '400%',  
            
            position: 'fixed', top:'0px', display:'flex', justifyContent: 'center', alignItems: 'center',placeItems: 'center', }}>
          <Routes>
          <Route path="/Chaturl/:chatbotsId" element={<Chaturl />} />
          </Routes></div>
       
    <div className="Footer-div " ><Footer /></div>
  
   </div>
   

     
    </div>

    
  
 
      
  
 
         
   
    

</div>


)
}

export default main













