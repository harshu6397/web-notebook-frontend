import { useState} from 'react';
import AlertContext from './alertContext';

const AlertState = (props) => {
    const [alert, setAlert] = useState(null);

    // Set Alert
    const showAlert = (msg, type) => { 
        setAlert({
            msg: msg,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    }

    return (
        <AlertContext.Provider value={{alert, showAlert}}> 
            {props.children}
        </AlertContext.Provider>
    )

}

export default AlertState;