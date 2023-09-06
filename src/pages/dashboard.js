import React , {useEffect , useState} from 'react'
import Sidebar from '../components/Sidebar'
import Logout from '../assets/logout.png'
import Chat from '../components/chat'
import Logo from '../assets/cha (2).png'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {BrowserRouter as Router ,Route , Routes } from 'react-router-dom'; 
import Profil from './profil'
import '../styles/dashboard.css'
import Home from './home'
import axios from 'axios';
import Chatpage from './chatpage';
import { useParams } from 'react-router-dom';
import useToken from './usetoken'
import Header from './header'
function Dashboard(props) {
  const [color1, setColor1] = useState('#FFFFFF');
  const [color2, setColor2] = useState('#CFDEF2');
  const [color3, setColor3] = useState('#03224c');
  const [color4, setColor4] = useState('#03224c');
  const [color5, setColor5] = useState('#FFFFFF');
  
  const navigate = useNavigate();
  
  const [userid, setuserid] = useState('');
  const [logoSrc, setLogoSrc] = useState(Logo);
  const [textInput, setTextInput] = useState('chatbotty');
  const [textInput2, setTextInput2] = useState();
  const [initialPrompt, setInitialPrompt] = useState('');
  const [cahtid, setchatid] = useState();
  const [formDatachat, setFormDataChat] = useState({
    id : cahtid ,
    name:textInput,
    prompt:textInput2,
    nameColor : color1,
    senderColor:color2,
    chatbotmsgColor: color3, 
    headerColor: color4,
    bodyColor:color5,
    photo_data :logoSrc ,  
    user_id:userid 
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataChat ((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmitChatForm = async () => {
    try {
        const formDatachat = {
        name:textInput,
       prompt:initialPrompt,
       nameColor : color1,
    senderColor:color2,
    chatbotmsgColor: color3, 
    headerColor: color4,
    bodyColor:color5,
    photo_data :logoSrc , 
  
      };
      const isAuthenticated = localStorage.getItem('token');
      const headers = {
               Authorization: `Bearer ${isAuthenticated}`,
       
    };
    
      
      const response = await axios.post('http://127.0.0.1:5000/createchtbot', formDatachat, {
        headers: headers, });
        if (response.status === 200) {
          const { message, chatbot_id } = response.data;
          console.log('Chatbot created successfully:', message);
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
  const handleColorChange1 = (event) => {
    const newColor1 = event.target.value ; 
    setColor1(newColor1);
  };
  const handleColorChange2 = (event) => {
    const newColor2 = event.target.value ; 
    setColor2(newColor2);
  };
  const handleColorChange3 = (event) => {
    const newColor3 = event.target.value ; 
    setColor3(newColor3);
  };
  const handleColorChange4 = (event) => {
    const newColor4 = event.target.value ; 
    setColor4(newColor4);
  };
  const handleColorChange5 = (event) => {
    const  newColor5 =  event.target.value ; 
    setColor5(newColor5);
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
  const [isChatOpen, setIsChatOpen] = useState(true);
  const handleRegenerate = () => {
    const lastUserMessage = chatHistory[chatHistory.length - 1].message;
  
      setUserPrompt(lastUserMessage);
  
     fetch("/openaires", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: lastUserMessage })
    })
    .then(response => response.json())
    .then(data => {
      const newResponseEntry = {
        type: "chatbot",
        message: data.answer
      };
      setChatHistory([...chatHistory, newResponseEntry]);
    })
    .catch(error => {
      console.error("Error regenerating chatbot response:", error);
    });
  };
  
        const handleToggleChat = () => {
          setIsChatOpen(prevState => !prevState);
        };
       

        const handleTextChange = (event) => {
          setTextInput(event.target.value);
        };
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
        const textColoruser = isColorDark(color2) ? 'white' : 'black';
        const textColorchatbot = isColorDark(color3) ? 'white' : 'black';
        
        const [userPrompt, setUserPrompt] = useState('');
        
        const [chatHistory, setChatHistory] = useState([]);
        const [chatbotResponse, setChatbotResponse] = useState('');
   
        //const handleLogout = async () => {
         // try {
              // Make a GET request to the logout endpoint
           //   await axios.get('http://127.0.0.1:5000/logout');
  
              // Perform any additional cleanup or redirect if needed
              // For example:
            //  window.location.href = '/'; // Redirect to the login page after logout
         // } catch (error) {
             // console.error('Logout error:', error);
              // Handle the error here
         // }
    //  };
      
        const handleresult = async (cahtid) =>{
          navigate('/Chatpage/cahtid');
        }
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
        const { chatbotId } = useParams();
        useEffect(() => {
          async function fetchChatbotData() {
            try {
              const isAuthenticated = localStorage.getItem('token');
              const headers = {
                Authorization: `Bearer ${isAuthenticated}`,
              };
      
              const response = await axios.get(`http://127.0.0.1:5000/chatbot/${chatbotId}`, {
                headers: headers,
              });
      
              const chatbotData = response.data; // This is the data of the selected chatbot
              // Set your state using the chatbotData
      
            } catch (error) {
              console.error('Error fetching chatbot data:', error);
            }
          }
      
          fetchChatbotData();
        }, [chatbotId]);
        const { removeToken } = useToken();
        const handleLogout = () => {
          // Assuming removeToken is a function that logs the user out
          removeToken(); // Call the removeToken function to log the user out
      
          // Redirect the user to the login page or perform other necessary actions
          // For example, navigate to the login page using react-router-dom
          // navigate('/login');
        };
        const handllog = (event) =>{  event.preventDefault();
      
          fetch("/initialpompt", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ initprompt: '' })
          })
            .then(response => {
              if (response.ok) {
                // Handle successful response (status code 200)
                // You might not need to parse JSON in this case
                console.log("Request was successful");
              } else {
                // Handle error responses or non-JSON responses
                console.error("Request failed with status:", response.status);
              }
            })
            .catch(error => {
              console.error("Request error:", error);
            });
        };
        const [chatbotResponseReceived, setChatbotResponseReceived] = useState(false);

  return (

   <div className="dashboard-container">
     
       {/* <button className=' btn btn-outline-light' style={{ position:'absolute',  top:'9%', left: '95%',zIndex:'1', fontSize: '12px' }} onClick={handleLog}> 
         <img   src={Logout} style={{ width: '25px', height: '25px' }} alt="Logout"  /> 
       
       </button> */}
  
     <div     onClick={handllog} >  <Header token={removeToken} /></div>
         <div  style={{top:'8% '  , position:'absolute'}}><Sidebar/></div>
    
    <div class="col-md mb-4">
     <div   class="form-outline">
     <h1 class="mt-5" style={{color : 'white' ,position:'absolute',  top:'3%', left:'15%',right:'53%'}}> Create your own Chatbot now ! </h1>
     <div style={{border: '1px solid white',padding :'10px',top:' 15%', left: '15%' ,position:'absolute', width:'35%', height:'500px'}}>
    
     <input type="text"  class="form-control form-control-lg" value={textInput} onChange={handleTextChange}  placeholder='Chatbot name ' />
     <div style={{marginTop:"3%"}}>
     <label className='text text-light ' style={{ marginRight:"2%"}}> Select your chatbot name color : </label>
     <input type="color"      value={color1} onChange={handleColorChange1}/></div>
     
     <div style={{marginTop:"3%"}}>
     <label className='text text-light ' style={{ marginRight:"2%"}} > Select the sender message color : </label>
     <input type="color"      value={color2} onChange={handleColorChange2}/></div>
     <div style={{marginTop:"3%"}}>
     <label className='text text-light ' style={{ marginRight:"2%"}}> Select the chatbot message color : </label>
     <input type="color"      value={color3} onChange={handleColorChange3}/></div>
     <div style={{marginTop:"3%"}}>
     <label className='text text-light ' style={{ marginRight:"2%"}}> Select the header color : </label>
     <input type="color"      value={color4} onChange={handleColorChange4}/></div>
     <div style={{marginTop:"3%"}}>
     <label className='text text-light ' style={{ marginRight:"2%"}}> Select the body color : </label>
     <input type="color"      value={color5} onChange={handleColorChange5}/></div>
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

    <button className=' btn btn-outline-light' onClick={handleSubmitChatForm} title="This is the final step! By clicking on this button, you will have your own chatbot with all the information accurately set. Please ensure that all the information is correct before proceeding.">Generate chatbot</button></div>
   
    
  </div>
     <br></br>
     </div>   </div> 
       
    <div class="container py-5 " style={{position:'absolute',  marginLeft:'60%', marginTop :'5.8%' ,maxWidth: '1500%', maxHeight:'400px' , fontSize: '120%' }}>
  
      <div class="row d-flex justify-content-center"  className={isChatOpen ? 'chat-container' : 'chat-container minimized'}>
        <div class="col-md-8 col-lg-6 col-xl-4" >
       
          <div class="card" id="chat1" style={{ borderRadius: '10px'}}>
            <div 
              class="card-header d-flex justify-content-between align-items-center p-3  text-white border-bottom-0"
              style={{  backgroundColor : color4}}>
              <i class="fas fa-angle-left"></i>
              <p class="mb-0 fw-bold" style={{color: color1}}>{textInput}  </p>
              <i class="fas fa-times"></i>
              <button type="button" class="btn-close " aria-label="Close"  onClick={handleToggleChat}></button>
              

            </div>
            <div class="card-body" style={{ backgroundColor : color5}}>
            <div class="chat-messages" style={{ maxHeight: '225px', height:'225px', overflowY: 'auto' }}>
       
              <div class="d-flex flex-row justify-content-start mb-4"  >
              {logoSrc ? 
              <img className="rounded-circle bg-outline-light logo" src={logoSrc} alt="avatar 1" style={{width:' 30px' , height: '100%' }}/> : <p>No logo selected</p>
              }
                <div class="p-3 ms-3" style={{ borderRadius: '15px' ,  backgroundColor: color3 , color : 'white'}}>
                <p class="small mb-0" style={{ color: textColorchatbot }} >Hello, Please start the changes to create your own chatbot.</p>
                 </div>
              </div>
  
              <div class="d-flex flex-row justify-content-end mb-4">
              <div class="p-3 ms-6" style={{ borderRadius: '15px' , backgroundColor: color2 }}>
                <p class="small mb-0" style={{ color: textColoruser }}>This is the sender message </p>
                </div>
                
                <img  className="rounded-circle bg-outline-light logo" src={Logo} alt="avatar 1" style={{width: '30px' , height: '100%'}}/>
                  
              </div>
  
              <div class="d-flex flex-row justify-content-start mb-4">
              {logoSrc ? 
              <img className="rounded-circle bg-outline-light logo" src={logoSrc} alt="avatar 1" style={{width:' 30px' , height: '100%' }}/> : <p>No logo selected</p>
              }
              
               <div class="p-3 ms-6" style={{ borderRadius: '15px' , backgroundColor: color3 , color :textColorchatbot}}>
               
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
          
          <div style={{ borderRadius: '15px', backgroundColor: color2,  color: textColoruser, marginRight:'2px' }} className="message user">
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
          <div style={{ borderRadius: '15px', backgroundColor: color3, color: textColorchatbot }} className="message chatbot">
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
    {chatHistory.length > 0 && (chatbotResponseReceived)&& (
      <button
        class="btn btn-outline-dark"
        id="regenerate-button"
        type="button"
        onClick={handleRegenerate}
      >
        Regenerate
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

export default Dashboard