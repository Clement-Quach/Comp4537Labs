import {msg} from '../lang/msg/en/user.js';
//copilot helped 
const notesContainer = document.getElementById('notes');
const lastSaved = document.getElementById('lastUpdated');





class nte {
  constructor(text) {
    this.text = text;
    this.h = document.createElement('div');
    this.h.className = 'noteDisplay';
    this.h.innerHTML = `
        <p>${this.text}</p>
    `;
 
  }
}

function loadNotes() {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  const now = new Date();
  lastSaved.textContent = `${msg.wLastSavedNotYet} ${now.toLocaleString()}`;
  notesContainer.innerHTML = '';
  notes.forEach((note) => {
      const noteDiv = new nte(note.text);
      notesContainer.appendChild(noteDiv.h);
  });
}

function start(){
  document.getElementById('head').innerHTML = msg.rHead
  document.getElementById('back').innerHTML = msg.back;
}

start();

setInterval(loadNotes, 2000);