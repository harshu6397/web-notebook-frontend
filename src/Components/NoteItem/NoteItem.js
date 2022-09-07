import React, { useContext, useState } from 'react'
import './NoteItem.css';
import noteContext from "../../context/notes/noteContext";
import alertContext from '../../context/Alert/alertContext';

const NoteItem = ({ note, updateNote }) => {
    const [copied, setCopied] = useState(false);
    const context1 = useContext(noteContext);
    const context2 = useContext(alertContext);
    const { deleteNote } = context1;
    const { showAlert } = context2;

    const handleClick = () => {
        deleteNote(note._id);
        showAlert("Note Deleted Successfully", "success");
    }

    const handleCopy = () => {
        setCopied(true);
        navigator.clipboard.writeText(`${note.title} - ${note.description}`);
    }

    return (
        <div>
            <div className="card note-card">
                <div className="tag">{note.tag}</div>
                <h3 className="card-title">{note.title}</h3>
                <p className="note-content">
                    {note.description}
                </p>
                <i className="uil uil-trash-alt icon" title="Delete Now" onClick={handleClick}></i>
                <i className="uil uil-edit icon" title="Edit Now" onClick={() => { updateNote(note) }}></i>
                {
                    copied ? (<div className="copied" style={{float : "right"}}>Copied!</div>) 
                    :(<i className="uil uil-copy copy-btn icon" title='Copy Now' onClick={handleCopy}></i>)
                }
            </div>

        </div>
    )
}   

export default NoteItem
