import React from 'react'
import './SelfDismissAlert.css' 

export default function SelfDismissAlert(props) {
    return (
        props.alert && <div className={`alert alert-${props.alert.type === 'Danger'? props.alert.type[0].toLowerCase() + props.alert.type.slice(1) : "primary"} alert-dismissible fade show my-3`} style={{textAlign: 'center'}} role="alert">
            <strong>{props.alert.type}</strong>: {props.alert.msg}
        </div>
    )
}
