import React , { useState, useEffect } from 'react'
import '../styles/chatpage.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar'
import Logo from '../assets/cha (2).png'
import { useNavigate } from 'react-router-dom';
function Chatupdate(props) {
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
  function isColorDark(color) {
    // Convert color to RGB
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;
  
    // Calculate luminance
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  
    // Return true if luminance is below a certain threshold, indicating a dark color
    return luminance < 128;
  }
  const textColoruser = isColorDark(senderColor) ? 'white' : 'black';
  const textColorchatbot = isColorDark(chatbotmsgColor) ? 'white' : 'black';
  const navigate = useNavigate();
 
  const handleUpdate  = async () => {
    try {
        const formDatachat = {
          
          name: chatbotname,
          prompt: initialPrompt,
          senderColor:senderColor,
          chatbotmsgColor: chatbotmsgColor,
          headerColor: headerColor,
          bodyColor:bodyColor,
          photo_data:logoSrc,
          nameColor:chatbotnamecolor, 
          id : chatbotsId ,
  
      };
      const isAuthenticated = localStorage.getItem('token');
      const headers = {
               Authorization: `Bearer ${isAuthenticated}`,
       
    };
    
      
      const response = await axios.put( `http://127.0.0.1:5000/updatechatbot/${chatbotsId}`, formDatachat, {
        headers: headers, });
        if (response.status === 200) {
          const { message, chatbot_id } = response.data;
          console.log('Chatbot updated successfully:', message);
          console.log('New Chatbot ID:', chatbot_id);
          navigate(`/Chatpage/${chatbot_id}`);
        } else {
          console.log('Unexpected response status:', response.status);
        };
    } catch (error) {
     
      console.error('Error:', error);
       if (error.response){  if (error.response) {
        if (error.response.status === 400) {
          alert("Please fill the prompt input to personalize your chatbot!");
        }else {
          alert('failed. Please check your INPUTS.');
        }

    }}
      // Handle the error here
    }
  };
  //const handleUpdate = async (e) => {
   // e.preventDefault();
   // try {
    //  const isAuthenticated = localStorage.getItem('token');
     // const headers = {
     //   Authorization: `Bearer ${isAuthenticated}`,
     // };

     // const response = await axios.put(
      //  `http://127.0.0.1:5000/updatechatbot/${chatbotsId}`,
       // formData, 
        //{ headers: headers }
     // );

      //if (response.status === 200) {
        // Chatbot updated successfully
       // console.log('Chatbot updated successfully:', response.data);
        //navigate(`/Chatpage/${chatbotsId}`);
        // Handle navigation or display a success message
     // } else {
      //  console.log('Unexpected response status:', response.status);
     // }
    //}// catch (error) {
     // //console.error('Error updating chatbot:', error);
     // // Handle the error here
   // }
 // };
  
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
const handleTextChange = (event) => {
    setChatbotname(event.target.value);
  };
  const handleColorChange1 = (event) => {
    const newColor1 = event.target.value ; 
    setChatbotnamecolor(newColor1);
  };
  const handleColorChange2 = (event) => {
    const newColor2 = event.target.value ; 
    setSenderColor(newColor2);
  };
  const handleColorChange3 = (event) => {
    const newColor3 = event.target.value ; 
    setChatbotmsgColor(newColor3);
  };
  const handleColorChange4 = (event) => {
    const newColor4 = event.target.value ; 
    setheaderColor(newColor4);
  };
  const handleColorChange5 = (event) => {
    const  newColor5 =  event.target.value ; 
    setbodyColor(newColor5);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    
    <div className="dashboard-container">
     
    <div  style={{top:'8% '  , position:'absolute'}}><Sidebar/></div>

<div class="col-md mb-4">
 <div   class="form-outline">
 <h1 class="mt-5" style={{color : 'white' ,position:'absolute',  top:'3%', left:'15%',right:'53%'}}> Create your own Chatbot now ! </h1>
 <div style={{border: '1px solid white',padding :'10px',top:' 15%', left: '15%' ,position:'absolute', width:'35%', height:'500px'}}>

 <input type="text"  class="form-control form-control-lg" value={chatbotname} onChange={handleTextChange}  placeholder='Chatbot name ' />
 <div style={{marginTop:"3%"}}>
 <label className='text text-light ' style={{ marginRight:"2%"}}> Select your chatbot name color : </label>
 <input type="color"      value={chatbotnamecolor} onChange={handleColorChange1}/></div>
 
 <div style={{marginTop:"3%"}}>
 <label className='text text-light ' style={{ marginRight:"2%"}} > Select the sender message color : </label>
 <input type="color"      value={senderColor} onChange={handleColorChange2}/></div>
 <div style={{marginTop:"3%"}}>
 <label className='text text-light ' style={{ marginRight:"2%"}}> Select the chatbot message color : </label>
 <input type="color"      value={chatbotmsgColor} onChange={handleColorChange3}/></div>
 <div style={{marginTop:"3%"}}>
 <label className='text text-light ' style={{ marginRight:"2%"}}> Select the header color : </label>
 <input type="color"      value={headerColor} onChange={handleColorChange4}/></div>
 <div style={{marginTop:"3%"}}>
 <label className='text text-light ' style={{ marginRight:"2%"}}> Select the body color : </label>
 <input type="color"      value={bodyColor} onChange={handleColorChange5}/></div>
 <input type="file" accept=".png,.jpg,.jpeg" onChange={handleFileChange} /> 
  <br></br>

  <textarea
value={initialPrompt}
style={{ marginTop: "2%" }}
placeholder="Chatbot function expl : I want this chatbot understand in...."
className="form-control"
id="exampleFormControlTextarea1"
rows="3"
onChange={(e) => setInitialPrompt(e.target.value)}
/><div style ={{marginTop:'10px'}}> 
<button className=' btn btn-outline-light' style={{ marginRight: '10px' }} onClick={handleinitprompt } title="By clicking on this button, the chatbot next to you will operate according to the specifications you've provided in the text. You can test and make changes on it as needed. Once everything is confirmed, you can click on 'Generate chatbot response' to finalize and create your chatbot">save</button>

<button className=' btn btn-outline-light' onClick={handleUpdate} title="This is the final step! By clicking on this button, you will have your own chatbot with all the information accurately set. Please ensure that all the information is correct before proceeding.">Update chatbot</button></div>


</div>
 <br></br>
 </div>   </div> 
   
<div class="container py-5 " style={{position:'absolute',  marginLeft:'60%', marginTop :'5.8%' ,maxWidth: '1500%', maxHeight:'400px' , fontSize: '120%' }}>

  <div class="row d-flex justify-content-center"  className={isChatOpen ? 'chat-container' : 'chat-container minimized'}>
    <div class="col-md-8 col-lg-6 col-xl-4" >
   
      <div class="card" id="chat1" style={{ borderRadius: '10px'}}>
        <div 
          class="card-header d-flex justify-content-between align-items-center p-3  text-white border-bottom-0"
          style={{  backgroundColor : headerColor}}>
          <i class="fas fa-angle-left"></i>
          <p class="mb-0 fw-bold" style={{color: chatbotnamecolor}}>{chatbotname}  </p>
          <i class="fas fa-times"></i>
          <button type="button" class="btn-close " aria-label="Close"  onClick={handleToggleChat}></button>
          

        </div>
        <div class="card-body" style={{ backgroundColor : bodyColor}}>
        <div class="chat-messages" style={{ maxHeight: '225px', height:'225px', overflowY: 'auto' }}>
   
          <div class="d-flex flex-row justify-content-start mb-4"  >
          {logoSrc ? 
          <img className="rounded-circle bg-outline-light logo" src={logoSrc} alt="avatar 1" style={{width:' 30px' , height: '100%' }}/> : <p>No logo selected</p>
          }
            <div class="p-3 ms-3" style={{ borderRadius: '15px' ,  backgroundColor: chatbotmsgColor , color : 'white'}}>
            <p class="small mb-0" style={{ color: textColorchatbot }} >Hello, Please start the changes to create your own chatbot.</p>
             </div>
          </div>

          <div class="d-flex flex-row justify-content-end mb-4">
          <div class="p-3 ms-6" style={{ borderRadius: '15px' , backgroundColor:senderColor }}>
            <p class="small mb-0" style={{ color: textColoruser }}>This is the sender message </p>
            </div>
            
            <img  className="rounded-circle bg-outline-light logo" src={Logo} alt="avatar 1" style={{width: '30px' , height: '100%'}}/>
              
          </div>

          <div class="d-flex flex-row justify-content-start mb-4">
          {logoSrc ? 
          <img className="rounded-circle bg-outline-light logo" src={logoSrc} alt="avatar 1" style={{width:' 30px' , height: '100%' }}/> : <p>No logo selected</p>
          }
          
           <div class="p-3 ms-6" style={{ borderRadius: '15px' , backgroundColor:chatbotmsgColor  , color :textColorchatbot}}>
           
              <p class="small mb-0">this is your chatbot messsage </p></div>
            <div class="ms-3" style={{borderradius:'15px'}}>
              <div class="bg-image">
                <a href="#!">
                  <div class="mask"></div>
                </a>
                </div>
             </div>
           </div>
           <div id="responseDiv" >
           <div class="chat-messages" style={{ maxHeight: '225px'}}>
{chatHistory.map((entry, index) => (
<div key={index}>
  {entry.type === "user" && (
    <div class="d-flex flex-row justify-content-end mb-4">
      
      <div style={{ borderRadius: '15px', backgroundColor: senderColor,  color: textColoruser, marginRight:'2px' }} className="message user">
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
      <div style={{ borderRadius: '15px', backgroundColor: chatbotmsgColor, color: textColorchatbot }} className="message chatbot">
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
            <br></br>
            <div class="input-group-append">
             <button class="btn btn-outline-dark" id="gpt-button"  type="button"  onClick={handleFormSubmit} >Ask Chatbot</button>
             
             
             </div>
           
          </div>
        


        </div>
      </div>

    </div>
    </div>
  
</div>

  
</div>  






  )
}

export default Chatupdate
