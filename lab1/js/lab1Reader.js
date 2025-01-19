import {msg} from '../lang/msg/en/user.js';

const notesContainer = document.getElementById('notes');
const lastSaved = document.getElementById('lastUpdated');

let notes = JSON.parse(localStorage.getItem('notes')) || [];



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
  const now = new Date();
  lastSaved.textContent = `Last saved: ${now.toLocaleString()}`;
  notesContainer.innerHTML = '';
  notes.forEach((note) => {
      const noteDiv = new nte(note.text);
      notesContainer.appendChild(noteDiv.h);
  });
}

function start(){
  document.getElementById('wHead').textContent = msg.rHead
  document.getElementById('back').textContent = msg.back;
}

setInterval(loadNotes, 2000);