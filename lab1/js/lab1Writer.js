import {msg} from '../lang/msg/en/user.js';
const addNoteButton = document.getElementById('addNote');
const notesContainer = document.getElementById('notes');
const lastSaved = document.getElementById('lastSaved');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

class nte {
    constructor(text, index) {
      this.text = text;
      this.h = document.createElement('div');
      const tarea = document.createElement('textarea');
      tarea.value = text;
      tarea.onchange = () => modifyNote(index, tarea.value);
      tarea.placeholder = msg.wPlacehold;
      tarea.rows = 2;
    const delButton = document.createElement('button');
    delButton.textContent = msg.wDel;
    delButton.onclick = () => deleteNote(index);
    this.h.appendChild(tarea);
    this.h.appendChild(delButton);
      this.h.className = 'note';
  
   
    }
  }

function loadNotes() {
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        const n = new nte(note.text, index);
        notesContainer.appendChild(n.h);
    });
}



addNoteButton.addEventListener('click', () => {
    const newNote = new nte("", notes.length);
    notes.push({ text: "" });
    notesContainer.appendChild(newNote.h);
    saveNotes();
    loadNotes();
});

 function modifyNote(index, newText) {
    notes[index].text = newText;
    saveNotes();
}

 function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    loadNotes();
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
    const now = new Date();
    lastSaved.textContent = `${msg.wLastSaved} ${now.toLocaleString()}`;
}

function start(){
    document.getElementById('wHead').innerHTML = msg.wHead;   
    document.getElementById('addNote').innerHTML = msg.wAddNote;
    document.getElementById('back').innerHTML = msg.back;
    document.getElementById('lastSaved').innerHTML = msg.wLastSavedNotYet;
}

start()

setInterval(saveNotes, 2000);

loadNotes();