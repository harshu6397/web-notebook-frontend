import { useState, useRef} from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const host = "https://web-notebook-apis.onrender.com";
    const ref = useRef(null);
    const [notes, setNotes] = useState([]);

    // Search Notes
    const searchNotes = (searchText) => {
        if(searchText.length < 1){
            const token = localStorage.getItem('token');
            getNotes(token);
        }
        else{
            let newNotes = notes.filter((note) => {
                const title = note.title.toLowerCase();
                const description = note.description.toLowerCase();
                const tag = note.tag.toLowerCase();
                searchText = searchText.toLowerCase();
                return title.includes(searchText) || description.includes(searchText) || tag.includes(searchText);
            });
            setNotes(newNotes);
        }
    }

    // Get all notes
    const getNotes = async () => {
        // API call
        const response = await fetch(`${host}/api/notes/getallnotes`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json['notes']);
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        let note = json['note'];
        setNotes(notes.concat(note));
    }

    // Delete a Note 
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        await response.json();
        
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNotes);
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        await response.json();

        let newNotes = JSON.parse(JSON.stringify(notes));
        // Implement edit here
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ref, notes, setNotes, addNote, deleteNote, editNote, getNotes, searchNotes}}> 
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;