import { useState, useEffect} from 'react';
import CredentialsContext from './credentialsContext';

const CredentialsState = (props) => {
    const [userData, setUserData] = useState({})
    const [token, setToken] = useState('')
    const host = "https://web-notebook-apis.onrender.com/";
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            getUserData(token);
        }
    }, []);

    const login = async (email, password) => {
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, password: password})
        }); 
        const json = await response.json(); 
        getUserData(json.authToken);
        setToken(json.authToken);
        localStorage.setItem('token', json.authToken);
        return json;
    }

    const getUserData = async (authToken) => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : authToken
            }
        });
        const json = await response.json();
        setUserData(json);
        return json;
    }

    const signup = async (name, email, password, cpassword) => {
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: name, email: email, password: password, cpassword: cpassword})
        });
        const json = await response.json();
        return json;
    }

    return (
        <CredentialsContext.Provider value={{login, signup, userData, token}}> 
            {props.children}
        </CredentialsContext.Provider>
    )

}

export default CredentialsState;