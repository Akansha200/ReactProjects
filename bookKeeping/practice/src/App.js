import React,{useState} from "react";
//import logo from './logo.svg';
import './App.css';
import Head from './components/Head';
import Footer from './components/Footer';
import Note from './components/Note';
import CreateArea from "./components/CreateArea";
//import notes from "./components/Notes";



function App() {
  const [notes,setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes,newNote];
    });
  }
  function deleteNote(id) {
setNotes(prevNotes => {
  return prevNotes.filter((noteItem,index) => {
    return index != id;
  });
});
  }
  return (
    <div>
      <Head />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
