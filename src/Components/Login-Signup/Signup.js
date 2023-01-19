import React, { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import credentialsContext from '../../context/Credentials/credentialsContext';
import swal from 'sweetalert';


const Signup = () => {
  let navigate = useNavigate();
  const { signup } = useContext(credentialsContext);
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  const [loading, setLoading] = useState(false)

  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { name, email, password, cpassword } = credentials;
    const response = await signup(name, email, password, cpassword);
    if (response.status) {
      setLoading(false)
      swal({
        title: "Success",
        text: "You are successfully registered!",
        icon: "success",
        button: "Ok"
      }).then(() => {
        localStorage.setItem('token', response.authToken)
        navigate('/');
      })
    }
    else {
      setLoading(false)
      swal({
        title: "Error",
        text: response['errors'][0]['msg'],
        icon: "error",
        button: "Ok",
      })
    }    
  }

  return (
    <div className='login-signup-container' >
      <h3 className='text-center'>Sign Up to use Web Notebook</h3>
      <form onSubmit={handleSubmit} className="my-4">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onchange} aria-describedby="nameHelp" placeholder="Enter Name" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onchange} aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" autoComplete="true" name='password' value={credentials.password} onChange={onchange} placeholder="Enter password" />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" autoComplete="true" name='cpassword' value={credentials.cpassword} onChange={onchange} placeholder="Enter Confirm password" />
        </div>
        <div className="btn-container" style={{ textAlign: "center" }}>
          <button type="submit" className="btn btn-primary" style={{ padding: ' .7rem 4rem' }}>
            {
              loading ? <div class="spinner-border text-light" role="status">
              <span class="visually-hidden">Loading...</span>
            </div> : "Sign Up" 
            } 
            </button>
        </div>
      </form>
    </div>
  )
}

export default Signup
