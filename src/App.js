import './App.css';

import Main from './components/main'
import {BrowserRouter as Router ,Route , Routes } from 'react-router-dom'; 
import Chaturl from './pages/chaturl';
function App() {
  
  return (
    <div className="App">
      <Router>
          <Main />
         
      </Router>
  
    </div>
  );
}

export default App;
