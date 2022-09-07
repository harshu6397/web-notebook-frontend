import './Login.css';
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../../context/Alert/alertContext'
import credentialsContext from '../../context/Credentials/credentialsContext';

const Login = () => { 
    const navigate = useNavigate();
    const { showAlert } = useContext(alertContext);
    const { login } = useContext(credentialsContext);
    const [credentials, setcredentials] = useState({ email: "", password: "" })

    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        login(credentials.email, credentials.password).then((data) => {
            if (data.status) {
                showAlert("You are logged in", "Success")
                localStorage.setItem('auth-token', data.authToken)
                navigate('/home');
            }
            else {
                showAlert("Invalid Credentials", "Danger")
                console.log("ERROR") 
            }
        })
    }

    return (
        <div className='login-signup-container' >
            <form onSubmit={handleSubmit} className="my-4">
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onchange} aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onchange} placeholder="Enter password" />
                </div>
                <div className="btn-container" style={{ textAlign: "center" }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: ' .7rem 4rem' }}>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login
