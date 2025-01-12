//todo: get the css of the section to work. get the memory game to work. host

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
  //helper functions
function btnC(inp){
  const num = inp.btn.id;
  if (num === ""+ score[0]){
    score.shift();
    inp.btn.innerHTML = num;
    if (score.length === 0){
      win(displayDiv);
    }
  } else {
    lose(displayDiv,sections);
  }
}



//copilot chose the colours

displayDiv.innerHTML = '';
;
for (let i = sections.length- 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sections[i], sections[j]] = [sections[j], sections[i]];
}

sections.forEach(box => {
   // section.textContent = ` ${number}`;
 box.btn.style.marginLeft = Math.floor(Math.random() * 80) + "%";
  box.btn.style.marginTop = Math.floor(Math.random() * 20) + "px";
 box.btn.innerHTML = "";
box.btn.onclick = () => { btnC(box) };
    displayDiv.appendChild(box.btn);
});
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
  // section.className = 'section';
  // section.textContent = ` ${number}`;
  displayDiv.appendChild(section.btn);
});

setTimeout(() => {
  display(displayDiv, boxes);
}, numBoxes * 1000);


}


function win(){
  showPopup();
  console.log(wmsg);

}

function lose(bxs){
  bxs.forEach(box => {
    box.btn.innerHTML = box.btn.id;
  });
  console.log("lose");
}

function showPopup() {
  // Create the popup element
  const popup = document.createElement('div');
  popup.textContent = 'You win!';
  popup.style.position = 'fixed';
  popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.padding = '20px';
  popup.style.backgroundColor = '#ffffff';
  popup.style.border = '2px solid #000';
  popup.style.textAlign = 'center';
  popup.style.cursor = 'pointer';
  popup.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  popup.style.fontSize = '20px';

  // Add a click event listener to reset the page
  popup.addEventListener('click', () => {
      location.reload(); // Reload the page
  });

  // Append the popup to the body
  document.body.appendChild(popup);
}

setContent();