import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from 'axios'; 

function App() {
  const [notes, setNotes] = useState(null);

  const loadNotes = () => {
    axios.get('http://localhost:8000/notes').then((response) => {
      setNotes(response.data);
    });
}
  // Load books when component mount.
  React.useEffect(loadNotes, []);

  if (!notes) return null;

  const deleteNote = (id) => {  
    axios.delete(`http://localhost:8000/notes/`+id)  
      .then(res => {  
        console.log(res);  
        console.log(res.data);  
        console.log(id);
    
        // const notes = notes.filter(item => item.id !== id);  
        // this.setNotes({ notes });  
        setNotes((prevItems) => {
          return prevItems.filter((item, index) => {
            return index !== id;
          });
        });
        
      })
      .then(()=>{
        loadNotes();
      })
    }

  return (
    <div>
      <Header />
      <CreateArea loadedNotes={loadNotes} />
      {notes.map((noteItem, index) => (
        <Note
          key={index}
          id={noteItem._id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;

