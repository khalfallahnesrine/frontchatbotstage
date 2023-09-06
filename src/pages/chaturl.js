import React , { useState, useEffect } from 'react'
import '../styles/chatpage.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
function Chaturl() {
  const { chatbotsId } = useParams();
  console.log("chatbotsId:", chatbotsId); 
  const [chatbotData, setChatbotData] = useState(null);
  const [chatbotname, setChatbotname] = useState("");
  const [chatbotnamecolor, setChatbotnamecolor] = useState("");
  const [headerColor, setheaderColor] = useState("");
  const [bodyColor, setbodyColor] = useState("");
  const [initialPrompt, setInitialPrompt] = useState('');
  const [senderColor, setSenderColor] = useState("");
  const [chatbotmsgColor, setChatbotmsgColor] = useState("");
  const [logoSrc, setLogoSrc] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [userPrompt, setUserPrompt] = React.useState('');
  const handleToggleChat = () => {
    setIsChatOpen(prevState => !prevState);
  };
  const [chatbotResponseReceived, setChatbotResponseReceived] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newUserMessage = {
      type: "user",
      message: userPrompt
    };
    setChatHistory([...chatHistory, newUserMessage]);
    setUserPrompt('');
    fetch("/openaires", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: userPrompt })
    })
      .then(response => response.json())
      .then(data => {
        const newChatEntry = {
          type: "user",
          message: userPrompt
        };
        const newResponseEntry = {
          type: "chatbot",
          message: data.answer
        };
        setChatHistory([...chatHistory, newChatEntry, newResponseEntry]);
        setChatbotResponseReceived(true);
      });
      setChatbotResponseReceived(false);
  };
 

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://127.0.0.1:5000/chatboturl/${chatbotsId}`);
        
        if (response.status === 200) {
          const responseData = await response.json();
          setChatbotData(responseData);
          setChatbotname(responseData.name);
          setChatbotnamecolor(responseData.nameColor);
          setInitialPrompt(responseData.prompt);
          setSenderColor(responseData.senderColor);
          setChatbotmsgColor(responseData.chatbotmsgColor);
          setLogoSrc(responseData.photo_data);
          setheaderColor(responseData.headerColor);
          setbodyColor(responseData.bodyColor);
  
          try {
            const initPromptResponse = await fetch("/initialpompt", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ initprompt: responseData.prompt })
            });
  
            // Handle initPromptResponse if needed
            const initPromptData = await initPromptResponse.json();
            // Do something with initPromptData
            
          } catch (error) {
            console.error('Error sending initial prompt:', error);
          }
        } else if (response.status === 404) {
          console.error('Chatbot not found');
        } else {
          console.error('Error fetching data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    fetchData();
  }, [chatbotsId]);
  
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents the default behavior (line break in textarea)
      handleFormSubmit(); // Call your function to handle the form submission
    }
  }
  const handleKeyUp = (event) => {
    if (event && event.key === 'Enter') {
      event.preventDefault();
      handleFormSubmit();
    }
  };
  return (
    
    <div  class="container-full" style={{position:'relative',marginRight:'25%', maxHeight:'100%',height:'1500px',width:'100%'   , fontSize: '100%' , marginTop:'0%'}}>
  
    <div class="row d-flex justify-content-center" className={isChatOpen ? 'chat-container' : 'chat-container minimized'} >
      <div class="col-md-8 col-lg-6 col-xl-4" >
     
        <div class="card" id="chat1" style={{ borderRadius: '10px'}}>
          <div 
            class="card-header d-flex justify-content-between align-items-center p-3  text-white border-bottom-0"
            style={{ borderTopLeftRadius: '5px' ,  borderTopRightRadius: '0px' , backgroundColor : headerColor}}>
            <i class="fas fa-angle-left"></i>
            <p class="mb-0 fw-bold" style={{color: 'white'}}>{chatbotname}  </p>
            <i class="fas fa-times"></i>
            

          </div>
          <div class="card-body" style={{ backgroundColor : bodyColor, maxHeight: '725px',height:'725px'}}>
          <div class="chat-messages" style={{ maxHeight: '725px', overflowY: 'auto' }}>
     
  
            
             <div id="responseDiv" >
             <div class="chat-messages" style={{ maxHeight: '500px', overflowY: 'auto' }}>
{chatHistory.map((entry, index) => (
  <div key={index}>
    {entry.type === "user" && (
      <div class="d-flex flex-row justify-content-end mb-4">
      <div class="p-3 ms-6 small mb-0" style={{ borderRadius: '15px' ,  backgroundColor: senderColor,  color: 'black', marginRight:'2px' }}  className="message user">
              
          {entry.message}</div>
          {logoSrc ? 
        <img className="rounded-circle bg-outline-light logo" src={logoSrc} alt="avatar 1" style={{width:' 30px' , height: '100%', left:'2px' }}/> : <p>No logo selected</p>
        }
        
        <div class="ms-3" style={{ borderradius: '15px' }}>
          <div class="bg-image">
            <a href="#!">
              <div class="mask"></div>
            </a>
          </div>
        </div>
      </div>
    )}

    {entry.type === "chatbot" && (
      <div class="d-flex flex-row justify-content-start mb-4">
        {logoSrc ? 
        <img className="rounded-circle bg-outline-light logo" src={logoSrc} alt="avatar 1" style={{width:' 30px' , height: '100%' }}/> : <p>No logo selected</p>
        }
        <div class="p-3 ms-3 small mb-0" style={{ borderRadius: '15px' ,  backgroundColor: chatbotmsgColor , color : 'white'}}  className="message chatbot">
              
      {entry.message.split('<br>').map((line, index) => (
      <div key={index}>{line}</div>
      
    ))}
  
        </div>
        <div class="ms-3" style={{ borderradius: '15px' }}>
          <div class="bg-image">
            <a href="#!">
              <div class="mask"></div>
            </a>
          </div>
        </div>
      </div>
    )}
  </div>
))}
</div>
</div>
</div> 

          
<div class="form-outline" style={{top:'73%',width:'98%', position:'fixed'}}>
{chatHistory.length > 0 && (!chatbotResponseReceived)&& (
      <button
        class="btn btn-outline-dark"
        id="receive-response-button"
        type="button"
        onClick={handleFormSubmit}
        style={{ marginBottom: '2px' }} 
        disabled
      >
         Response ...
      </button>
    )}
    <div style={{marginTop:'1%'}} >
            <textarea class="form-control"  id="userPrompt" value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)}
              rows="4" placeholder='Type your message'></textarea>
              <div class="input-group-append" style={{marginTop:'3px'}}>
               <button class="btn btn-outline-dark" id="gpt-button"  type="button"  onClick={handleFormSubmit} >Ask Chatbot</button>
               </div></div>
            </div>
            </div>
          </div>
        </div>

      </div>
      </div>
    
    
 
 

 


  )
}

export default Chaturl
