//todo: check over project and hand in

import{ msg } from "../lang/msg/en/user.js";
const wmsg = msg["win"];
class box {
  constructor(num, col){
    this.btn = document.createElement("button");
    this.btn.innerHTML = num;
    this.btn.id = num;
    this.btn.style.backgroundColor = col;
    this.btn.className = "section";
    this.btn.onclick = () => {};
    this.btn.style.marginLeft = 0;
    
    this.btn.style.marginTop = 0;
  }
}
let score = [0];

export function gaming(){
  const displayDiv = document.getElementById('display');
  const numBoxes = document.getElementById('input').value;
  showStart(displayDiv, numBoxes);

}

function setContent(){
  const input = document.getElementById('input');
  input.placeholder = msg["prompt"];
  const btn = document.getElementById('btn');
  btn.innerHTML = msg["go"];
  btn.onclick = gaming;
}

function display(displayDiv, sections){


displayDiv.innerHTML = '';
;
for (let i = sections.length- 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sections[i], sections[j]] = [sections[j], sections[i]];
}

sections.forEach(box => {
 box.btn.style.marginLeft = Math.floor(Math.random() * 80) + "%";
  box.btn.style.marginTop = Math.floor(Math.random() * 20) + "px";
 box.btn.innerHTML = "";
box.btn.onclick = () => { btnC(box) };
    displayDiv.appendChild(box.btn);
});


  //helper functions
  function btnC(inp){
    const num = inp.btn.id;

    if (num === ""+ score[0]){
      score.shift();
      inp.btn.disabled = true;
      inp.btn.innerHTML = num;
      if (score.length === 0){
        win(displayDiv);
      }
    } else {
      lose(sections);
    }
  }
  
}

function showStart(displayDiv, numBoxes){

//copilot chose the colours
const colours = [ 'white', 'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown' ];

displayDiv.innerHTML = '';

const sections = [1, 2, 3, 4,5,6,7];
sections.length = numBoxes;

score = sections;

const boxes = []
sections.forEach(number => {
  const section = new box(number, colours[number]);
  boxes.push(section);
  displayDiv.appendChild(section.btn);
});

setTimeout(() => {
  display(displayDiv, boxes);
}, numBoxes * 1000);


}


function win(){
  showPopup(wmsg);


}

function lose(bxs){
  bxs.forEach(box => {
    box.btn.innerHTML = box.btn.id;
    btn.disabled = true;
  });
  showPopup(msg["lose"]);
}

//assosted by chatgpt
function showPopup(msg) {

  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.innerHTML = msg;

  popup.addEventListener('click', () => {
      location.reload(); 
  });

  document.body.appendChild(popup);
}

setContent();