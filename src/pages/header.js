import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Header(props) {
  const navigate = useNavigate();
  function logMeOut() {
    axios({
      method: 'POST',
      url: '/logout',
    })
      .then((response) => {
        props.token();
        navigate('/');
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  return (
    <header className="App-header">
      <button
        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded "
        onClick={logMeOut} style={{color : 'white' , top:'9%' , left:'93%', position:'absolute', zIndex:'1'}}
      >
        Logout
      </button>
    </header>
  );
}

export default Header;

