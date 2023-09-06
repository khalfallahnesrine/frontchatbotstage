import React ,  { useState, useEffect } from 'react'
import axios from 'axios';
import Sidebar  from '../components/Sidebar'
import '../styles/chatbot.css' ;
import Logout from '../assets/logout.png'
import { Link } from 'react-router-dom';  

import Chaturl from './chaturl';
function Chatbots() {
  const [chatbots, setChatbots] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    prompt: '',
    senderColor: '',
    chatbotmsgColor: '',
    headerColor: '',
    bodyColor: '',
    photo_data: '',
    nameColor: '',
  });
  useEffect(() => {
    async function fetchChatbots() {
      try {
        const token = localStorage.getItem('token'); 
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get('/chatbots', {
          headers: headers,
        });

        setChatbots(response.data);
      } catch (error) {
        console.error('Error fetching chatbots:', error);
      }
    }

    fetchChatbots();
  }, []);
  const handleLogout = async () => {
    try {
          await axios.get('http://127.0.0.1:5000/logout');

       
        window.location.href = '/';  } catch (error) {
        console.error('Logout error:', error);
        
    }
};
const handleUpdateChatbot = async (chatbotId) => {
  try {
    const isAuthenticated = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${isAuthenticated}`,
    };

    const response = await axios.put(`http://127.0.0.1:5000/updatechatbot/${chatbotId}`, formData, {
      headers: headers,
    });

    console.log('Chatbot Updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating chatbot:', error);
  }
};
const handleDeleteChatbot = async (chatbotId) => {
  try {
    const token = localStorage.getItem('token'); 
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await axios.delete(`/deletechatbot/${chatbotId}`, {
      headers: headers,
    });

    // Remove the deleted chatbot from the list
    setChatbots(prevChatbots => prevChatbots.filter(chatbot => chatbot.id !== chatbotId));
  } catch (error) {
    console.error('Error deleting chatbot:', error);
  }
};
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
  return (
    <div > 
    <div  style={{top:'10% '  , position:'absolute'}}><Sidebar/></div>
   
    
    <div
        style={{
          top: '12%',
          zIndex: '1',
          display: 'flex',
          left: '15%',
          width: '80%',
          justifyContent: 'center',
          position: 'absolute',
          overflow: 'auto',
        }}
        className="table-responsive"
      >  <table  class="table ">
        <thead>
        <tr>
        <th class="th-sm"  scope="col"></th>
      <th class="th-sm" scope="col"></th>
        <th class="th-sm" scope="col"></th>
        <th class="th-sm" scope="col"></th>
      <th class="th-sm" scope="col"> <button className="btn btn-gradient mr-6"
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
  >
    Previous
  </button>   <button className="btn btn-gradient mr-6"
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={endIndex >= chatbots.length}
  >
    Next
  </button></th>
  
     
      </tr>
  </thead>
  
  <tbody >
  {chatbots.slice(startIndex, endIndex).map((chatbot, index) => (
  
              <tr key={chatbot.id}>

                <th scope="row">{index + 1}</th>
                
                <td>  <div className="avatar">
          <img src={chatbot.photo_data} alt="Chatbot Avatar" />
        </div> </td>
          <td> {chatbot.name}</td>
          <td>  <Link to={`/Chaturl/${chatbot.id}`}  target="_blank" style={{color:'black'}}>http://localhost:3000/Chaturl/{chatbot.id} </Link></td>
                <td>
                  <Link to={`/Chatpage/${chatbot.id}`} className="btn btn-gradient mr-6"  style={{ marginRight: '5px' }} >TEST</Link> 
                  <Link to={`/update/${chatbot.id}`} className="btn btn-gradient mr-2">UPDATE</Link>{' '} 
                 <button className="btn btn-gradient" onClick={() => handleDeleteChatbot(chatbot.id)} >DELETE</button>
                </td>
              </tr>
            ))}
    </tbody>
  

        </table>
      
    </div>
   

    </div>
  )
}

export default Chatbots