import './Login.css';
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import credentialsContext from '../../context/Credentials/credentialsContext';
import swal from 'sweetalert';

const Login = () => { 
    const navigate = useNavigate();
    const { login } = useContext(credentialsContext);
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false)

    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const response = await login(credentials.email, credentials.password);
        if (response.status) {
            setLoading(false)
            localStorage.setItem('token', response.authToken)
            swal({
                title: "Success",
                text: "You are successfully logged in!",
                icon: "success",
                button: "Ok"
            }).then(() => {
                navigate('/home');
            })
        }
        else {
            setLoading(false)
            swal({
                title: "Error",
                text: "Invalid Credentials! Try Again",
                icon: "error",
                button: "Ok",
            })
        }
    }

    return (
        <div className='login-signup-container' >
            <h3 className='text-center'>Login to continue with Web Notebook</h3>
            <form onSubmit={handleSubmit} className="my-4">
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onchange} aria-describedby="emailHelp" placeholder="Enter email" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onchange} placeholder="Enter password" required minLength={8} />
                </div>
                <div className="btn-container" style={{ textAlign: "center" }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: ' .7rem 4rem' }}>
                        {
                            loading ? <div class="spinner-border text-light" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div> : "Login"

                        }
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login
