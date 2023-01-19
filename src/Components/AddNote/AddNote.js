import React, { useContext, useState } from 'react'
import noteContext from "../../context/notes/noteContext";
import './AddNote.css'
import swal from 'sweetalert';

const AddNote = () => {
    const context1 = useContext(noteContext);
    const { addNote } = context1;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = () => {
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        swal({
            title: "Success",
            text: "Note Added Successfully",
            icon: "success",
            button: "Ok"
        })
    }

    const onChange = (e) => {
        setNote({
            ...note,  
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <div className="add-note-container">
                <div className="card-container card">
                    <div className="card-title">
                        <h3 className="title " >Add Your Notes :)</h3>
                    </div>
                    <form>
                        <div className="note-title">
                            <label htmlFor="noteTitle">Note Title</label>
                            <input
                                type="text"
                                className="textInput"
                                id="noteTitle"
                                name='title'
                                placeholder="Enter note title here..."
                                onChange={onChange}
                                value={note.title}
                            />
                        </div>

                        <div className="note-desc">
                            <label htmlFor="noteDesc">Note Description</label>
                            <textarea
                                className="textInput textarea"
                                id="noteDesc"
                                name='description'
                                cols="30"
                                rows="50"
                                placeholder="Enter note description here..."
                                onChange={onChange}
                                value={note.description}
                            ></textarea>
                        </div>

                        <div className="note-tag">
                            <label htmlFor="noteTag">Tag (Optional)</label>
                            <input
                                type="text"
                                className="textInput"
                                id="noteTag"
                                name='tag'
                                placeholder="Enter note tag here..."
                                onChange={onChange}
                                value={note.tag}
                            />
                        </div>

                        <div className="btn-container">
                            <button disabled={note.title.length < 3 || note.description.length < 3} type="button" className="btn"  onClick={handleClick}>
                                Add Note
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNote
