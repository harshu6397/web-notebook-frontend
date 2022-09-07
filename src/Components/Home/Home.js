import React, { useContext, useState } from "react";
import noteContext from "../../context/notes/noteContext";
import alertContext from "../../context/Alert/alertContext";
import AddNote from "../AddNote/AddNote";
import Notes from "../Notes/Notes";
import "./Home.css";

const Home = () => {
  const context1 = useContext(noteContext);
  const context2 = useContext(alertContext);
  const { ref, editNote } = context1;
  const { showAlert } = context2;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = () => {
      editNote(note._id, note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        showAlert("Note Updated Successfully", "success");

    }

    const onChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }

  return (
    <>
      <AddNote />
      <button ref={ref} type="button" className=" btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal"></button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content card-container model-container">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
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
            </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="note-container">
        <div className="note-title-container">
          <hr /> <h2 className="notes-title">Your Notes</h2><hr />
        </div>
        <div>
          <Notes setNote={setNote} />
        </div>
      </div>
    </>
  );
};

export default Home;
