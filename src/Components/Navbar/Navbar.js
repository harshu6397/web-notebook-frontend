import React, { useContext} from 'react';
import './Navbar.css';
import logo from './logo.png';
import user from './icons8-user-100.png';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import noteContext from '../../context/notes/noteContext';
import alertContext from '../../context/Alert/alertContext';
import credentialsContext from '../../context/Credentials/credentialsContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchNotes } = useContext(noteContext);
  const { showAlert } = useContext(alertContext);
  const { userData } = useContext(credentialsContext);

  const handleInput = (e) => {
    searchNotes(e.target.value);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    showAlert("Logout Successfully!", "Success")
  }
  
  return (
    <div>
      <nav className='nav-container'>
        <div className="navbar-logo">
          <img className='logo' src={logo} alt="" />
          {
            location.pathname === '/home' 
            ?
            <Link to="/home" className='logo-title'>Web Notebook</Link>
            :
            <Link to="/" className='logo-title'>Web Notebook</Link>
          }
        </div>

        {
          location.pathname === '/home'
            ?
            <>
              <div>
                <input type="search" placeholder='Search' className='search' onChange={handleInput} />
                <div className="user dropdown">
                  <img className='user-img' src={user} alt=""/>
                  <div className="dropdown-content">
                  <span className='block-elt'>{userData['name']}</span>
                  <span className='block-elt'>{userData['email']}</span>
                    <Link to="/" className='logout' onClick={handleLogout}>Logout</Link>
                  </div>
                </div>
              </div>
            </>
            :
            <div className="user"> 
              <Link to="/" className='login'>Login</Link>
              <Link to="/signup" className='signup'>Sign Up</Link>
            </div>
        }

      </nav >
    </div >
  )
}

export default Navbar;
