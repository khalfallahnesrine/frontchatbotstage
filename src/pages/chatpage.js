import React , { useState, useEffect } from 'react'
import '../styles/chatpage.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
function Chatpage(props) {
  const { chatbotsId } = useParams();
  console.log("chatbotsId:", chatbotsId); 
  const [chatbotData, setChatbotData] = useState({});
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
  const [userPrompt, setUserPrompt] = useState('');
  const [chatbotResponseReceived, setChatbotResponseReceived] = useState(false);

  const handleToggleChat = () => {
    setIsChatOpen(prevState => !prevState);
  };
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
  const handleinitprompt = (event) => {
    event.preventDefault();

    fetch("/initialpompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ initprompt: initialPrompt })
    })
      .then(response => response.json())
      
  };
  useEffect(() => {
    async function fetchChatbotData() {
        try {
          const isAuthenticated = localStorage.getItem('token');
          const headers = {
                   Authorization: `Bearer ${isAuthenticated}`,
           
        };
        const response = await axios.get(`http://127.0.0.1:5000/chatbots/${chatbotsId}`,  {
          headers: headers, });
          console.log("Fetching chatbot data for ID:", chatbotsId);
            const data = response.data;

            setChatbotData(data);
            setChatbotname(data.name);
            setChatbotnamecolor(data.nameColor);
            setInitialPrompt(data.prompt);
            setSenderColor(data.senderColor);
            setChatbotmsgColor(data.chatbotmsgColor);
            setLogoSrc(data.photo_data);
            setheaderColor(data.headerColor);
            setbodyColor(data.bodyColor);
            // ... set other variables for other data fields
            try {
              const initPromptResponse = await fetch("/initialpompt", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ initprompt: data.prompt })
              });
    
              // Handle initPromptResponse if needed
              const initPromptData = await initPromptResponse.json();
              // Do something with initPromptData
              
            }
             catch (error) {
              console.error('Error sending initial prompt:', error);
            }
          }
           catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchChatbotData();
}, [chatbotsId]);
  return (
    
    <div class="container py-5 " style={{position:'absolute',  marginLeft:'35%', top :'5%' ,maxWidth: '2000%', maxHeight:'50px' , fontSize: '100%' }}>
  
    <div class="row d-flex justify-content-center" className={isChatOpen ? 'chat-container' : 'chat-container minimized'} >
      <div class="col-md-8 col-lg-6 col-xl-4" >
     
        <div class="card" id="chat1" style={{ borderRadius: '10px'}}>
          <div 
            class="card-header d-flex justify-content-between align-items-center p-3  text-white border-bottom-0"
            style={{ borderTopLeftRadius: '5px' ,  borderTopRightRadius: '0px' , backgroundColor : headerColor}}>
            <i class="fas fa-angle-left"></i>
            <p class="mb-0 fw-bold" style={{color: chatbotnamecolor}}>{chatbotname}  </p>
            <i class="fas fa-times"></i>
            <button type="button" class="btn-close " aria-label="Close"  onClick={handleToggleChat}></button>
            

          </div>
          <div class="card-body" style={{ backgroundColor : bodyColor}}>
          <div class="chat-messages" style={{ maxHeight: '400px', overflowY: 'auto' }}>
     
  
            
             <div id="responseDiv" >
             <div class="chat-messages" style={{ maxHeight: '400px'}}>
{chatHistory.map((entry, index) => (
  <div key={index}>
    {entry.type === "user" && (
      <div class="d-flex flex-row justify-content-end mb-4">
        
        <div style={{ borderRadius: '15px', backgroundColor: senderColor,  color: 'black', marginRight:'2px' }} className="message user">
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
        <div style={{ borderRadius: '15px', backgroundColor: chatbotmsgColor, color: 'white'}} className="message chatbot">
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

            <div class="form-outline">
            {chatHistory.length > 0 && (!chatbotResponseReceived)&& (
      <button
        class="btn btn-outline-dark"
        id="receive-response-button"
        type="button"
        onClick={handleFormSubmit}
        style={{ marginBottom: '10px' }} 
        disabled
      >
         Response ...
      </button>
    )}
            <textarea class="form-control"  id="userPrompt" value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)}
              rows="4" placeholder='Type your message'></textarea>
              <div class="input-group-append">
               <button class="btn btn-outline-dark" id="gpt-button"  type="button"  onClick={handleFormSubmit} >Ask Chatbot</button>
               </div>
             
            </div>
          
  

          </div>
        </div>

      </div>
      </div>
    
  </div>

    
 
 

 


  )
}

export default Chatpage
