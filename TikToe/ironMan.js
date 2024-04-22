let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () =>{
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide", "color1", "color2");
  
  // Reset colors and disabled status
  for (let box of boxes) {
    box.classList.remove("color1", "color2");
    box.disabled = false;
  }
  
  // Reset message
  msg.innerText = "";
}

boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        if(turnO){
            box.innerText = "O";
            box.classList.add("color1");
            turnO = false;
        } else {
            box.innerText = "X";
            box.classList.add("color2");
            turnO = true;
        } 
        box.disabled = true;
        checkWinner();
      });
});

const enableBoxes = () =>{
    for (let box of boxes) {
        box.disabled = false;
        box.innerText="";
    }
};

const disableBoxes = () =>{
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) =>{
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide", "color1", "color2");
}

const checkDraw = () => {
  let filledBoxes = 0;
  for (let box of boxes) {
    if (box.innerText !== "") {
      filledBoxes++;
    }
  }
  if (filledBoxes === 9 && !document.querySelector(".msg").innerText) {
    msg.innerText = "It's a draw!";
    msgContainer.classList.remove("hide", "color1", "color2");
    disableBoxes();
  }
};

const checkWinner = () =>{
    for( let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val===pos3Val){
                showWinner(pos1Val);
            }
        }
    }
    checkDraw(); // Check for a draw
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);