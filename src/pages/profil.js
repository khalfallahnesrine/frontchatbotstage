import React  , { useState}from 'react'
import Sidebar from '../components/Sidebar'
import photoprofil from '../assets/utilisateur.png'
import Chatbots from './chatbots'
function Profil() {

    const [imagePreview, setImagePreview] = useState(photoprofil);
  
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    };
  
    const handleImageClick = () => {
      const fileInput = document.getElementById('profileImageInput');
      fileInput.click();
    };
      const [Firstname, setName] = useState('John ');
      const [Lastname, setlastName] = useState(' Doe');
      const [email, setEmail] = useState('johndoe@example.com');
      const [showLabels, setShowLabels] = useState(false);
      const [newNameInput, setNewNameInput] = useState('');
      
      const [newLastNameInput, setNewLastNameInput] = useState('');
      const [newEmailInput, setNewEmailInput] = useState('');    
      const handleButtonClick = () => {
        setShowLabels(!showLabels);
      };
      const handleNameInputChange = (event) => {
        setNewNameInput(event.target.value);
      };
      const handleLastNameInputChange = (event) => {
        setNewLastNameInput(event.target.value);
      };
      const handleEmailInputChange = (event) => {
        setNewEmailInput(event.target.value);
      };
    
      const handleSaveChanges = () => {
        if (newNameInput !== '') {
          setName(newNameInput);
        }
        if (newLastNameInput !== '') {
          setlastName(newLastNameInput);
        }
        if (newEmailInput !== '') {
          setEmail(newEmailInput);
        }
        setShowLabels(false);
        setNewNameInput('');
        setNewLastNameInput('');
        setNewEmailInput('');
      };
  return (
   <div style={{display: 'grid' , gridTemplateColumns: '1fr 1fr', justifyContent: 'space-between'  }}>
     <div style={{  top:'10%' , zIndex:'1'}}><Sidebar/></div>
     <div>
        <div style={{backgroundColor: 'transparent' , top: '5%' , left:'13%'  , zIndex:'1' , border: '1px solid white', padding: '10px'}}>
         <div  style={{display: 'grid', gridTemplateColumns: 'auto auto'  }}>
         <div  style={{  border: '1px solid white', padding: '10px'}}>
         <input type="file" accept="image/*" onChange={handleImageChange}  style={{ display: 'none' , zIndex:'1' }} id="profileImageInput" />
                
         <label htmlFor="profileImageInput" style={imagePreview ? { display: 'none' } : {}}> Ajouter une image de profil</label>
                {imagePreview ? (
               <img src={imagePreview}  alt="Imagedeprofil" style={{width: '100px', height: '100px' , marginTop: '10px', cursor: 'pointer' }} onClick={handleImageClick} />
                 ) : null}   
                 <div  style={{ marginTop:'5%' , marginLeft : '2%', color : 'white'}}  >
                <h5 style={{color : 'white'}} > { Firstname} {Lastname} </h5>

                <p style={{color : 'white'}}>Email</p> </div>
                 <div style={{marginTop : '2px'}}>
                 <button type="button" class="btn btn-outline-light" data-mdb-ripple-color="light" onClick={handleButtonClick}
                style={{zIndex: '1' , marginTop :'10px',marginRight : '1%',}}>
                 Edit profile
              </button></div>
</div>
              <div>
            {showLabels && (
            <div class="ms-3 text-dark" style={{marginTop: '10px' , zIndex : '1' }}>
              
                   
                    <div class="row">
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <input type="text" id="form3Example1m" class="form-control form-control-lg" value={newNameInput} onChange={handleNameInputChange}  placeholder='First Name'/>
                    </div>
                  </div>
                  <div class="col-md-6 mb-4">
                    <div class="form-outline">
                      <input type="text" id="form3Example1n" class="form-control form-control-lg" value={newLastNameInput} onChange={handleLastNameInputChange}     placeholder='Last Name' />
                    </div>
                  </div>
                </div>
                  <div class="col-md mb-4">
                    <div class="form-outline">
                      <input type="Password" id="form3Example1n" class="form-control form-control-lg" placeholder='Password ' />
                      <button className ='btn btn-outline-light'  style={{marginTop :'10px'}} onClick={handleSaveChanges}>Save Changes</button>
                    </div>
                  </div>
            </div>
            )}</div>
            <br></br>
          <div style={{  border: '1px solid white', padding: '10px', marginTop : '20px'}}>
          <p class="mb-1 h5 text-light">0</p>
           <p class="small  mb-0 text-light ">chatbots</p>
          </div>
        <br></br>
          
          </div>
          <div  class="d-flex justify-content-between align-items-center mb-4"  style={{  border: '1px solid white', padding: '10px', marginTop : '20px'}}>
          <p class="lead fw-normal mb-0 text-light ">Recent Work :  </p>
          <p class="mb-0 text-light "><a href="/Chatbots" class="text-light">Show all</a></p>
          </div>
          <div style={{  border: '1px solid white', padding: '10px', marginTop : '20px' }}>
          <div class="row g-2"> <div class="col mb-2">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                  alt="image1" class="w-100 rounded-3"/>
              </div>
              <div class="col mb-2">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                  alt="image1" class="w-100 rounded-3"/>
              </div></div>
         </div>
        </div>
      </div>
    </div>

  
       




   
  )
}

export default Profil