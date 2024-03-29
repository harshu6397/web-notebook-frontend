import React from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import NoteState from './context/notes/NoteState';
import CredentialsState from './context/Credentials/CredentialsState';
import Signup from './Components/Login-Signup/Signup';
import Login from './Components/Login-Signup/Login';
 

function App() {
  return (
    <> 
      <CredentialsState>
      <NoteState>
      <Router>
      <Navbar/>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Login/> } />
          <Route exact path="/home" element={<Home/>} />
          <Route exact path="/signup" element={<Signup/>} />
        </Routes>
      </div>
      </Router>
      </NoteState>
      </CredentialsState>
    </>
  );
}

export default App;
