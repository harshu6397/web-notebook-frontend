import React, { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../../context/Alert/alertContext';
import credentialsContext from '../../context/Credentials/credentialsContext';

const Signup = () => {
  let navigate = useNavigate();
  const { showAlert } = useContext(alertContext);
  const { signup } = useContext(credentialsContext);
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    console.log("On handle submit")
    e.preventDefault()
    const { name, email, password, cpassword } = credentials;
    signup(name, email, password, cpassword).then((data) => {
      console.log(data)
      if (data.status) {
        showAlert("You are successfully registered!", "Success")
        localStorage.setItem('auth-token', data.authToken)
        navigate('/')
      }
      else {
        showAlert(data['errors'][0]['msg'], "Danger")
        console.log("ERROR")
      }
    })
  }

  return (
    <div className='login-signup-container' >
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
          <button type="submit" className="btn btn-primary" style={{ padding: ' .7rem 4rem' }}>Sign Up</button>
        </div>
      </form>
    </div>
  )
}

export default Signup
