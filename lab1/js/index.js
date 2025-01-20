import {msg} from '../lang/msg/en/user.js';

const head = document.getElementById('head');
const writer = document.getElementById('writer');
const reader = document.getElementById('reader');

function start()
{
  head.innerHTML = msg.head;
  writer.innerHTML = msg.writer;
  reader.innerHTML = msg.reader;
}

start();