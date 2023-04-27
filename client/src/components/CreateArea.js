import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import { Zoom } from '@mui/material';
import axios from 'axios';

function CreateArea(props) {

const [title, setTitle] = useState(""); 
const [content, setContent] = useState(""); 

  const [click, setClick] = useState(false); 


  const handleClick = () => {
    setClick(true); 
  }


const handleSubmit = (e) => {
     e.preventDefault();
    axios.post('http://localhost:8000/insert', {
        title: title,
        content: content
      })
      .then(response => {
        console.log(response);
      })
      .then(() => {
        props.loadedNotes();
      })
      .catch(error => {
        console.log(error);
      });
        setTitle("");
        setContent("");
      }

  return (
    <div>
      <form onSubmit={handleSubmit} className="create-note">
      {click ?
        <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            name="title"
            placeholder="Title"
            />
        : null
      }
        <textarea
            onChange={(e) => setContent(e.target.value)}
            onClick={handleClick}
            value={content}
            name="content" 
            placeholder="Take a note..."
            rows={click ? 3 : 1}
            />
        <Zoom in={click}>
            <Fab type="submit">
                <AddIcon />
            </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
