import React, { useContext, useEffect } from 'react'
import noteContext from "../../context/notes/noteContext";
import NoteItem from '../NoteItem/NoteItem';
import './Notes.css';


const Notes = ({ setNote }) => {
    const context = useContext(noteContext);
    const { ref, notes, getNotes } = context;
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote(currentNote)
    }

    return (
        <>
            {
                notes.length === 0
                    ? <div className="no-notes">
                        <h1>No Notes Found :(</h1>
                        <span><strong> Please use "Add Your Notes" section to add the notes.</strong></span>
                    </div>
                    : <div className='notes'>
                        {notes.map((note) => {
                            return <NoteItem key={note._id} note={note} updateNote={updateNote} />;
                        })}
                    </div>
            }
        </>
    )
}

export default Notes
