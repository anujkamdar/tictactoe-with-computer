let boxes = document.querySelectorAll(".play-box");
let resetBtn = document.querySelector(".reset");
let body = document.querySelector("body");
const playerChar = "X";
const compChar = "O";
let boxindexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let noOfTurns = 0;
let msg = document.querySelector(".msg");
let newGameBtn = document.querySelector(".hide");
let won = false

let winningSequences = [
    [0, 1, 2],  
    [3, 4, 5],  
    [6, 7, 8],  
    [0, 3, 6],  
    [1, 4, 7],  
    [2, 5, 8],  
    [0, 4, 8],  
    [2, 4, 6] 
];

for (let i = 0; i < 9; i++) {
    boxes[i].addEventListener('click', () => {
        if (boxes[i].innerText == "") {
            noOfTurns++;
            boxes[i].innerText = playerChar; 
            let indexToRemove = boxindexes.indexOf(i);
            boxindexes.splice(indexToRemove, 1); 
            tabulate(); 

            if (noOfTurns < 9 && won == false) {
                computerTurn(); 
                tabulate(); 
            }
        }
    });
}

let tabulate = () => {
    for (let seq of winningSequences) {
        let x_streak = 0;
        let o_streak = 0;
        for (let boxNo of seq) {
            if (boxes[boxNo].innerText == "X") {
                x_streak++;
                if (x_streak == 3) {
                    msg.innerText = `X is the winner`;
                    for (let i = 0; i < 3; i++) {
                        boxes[seq[i]].style.backgroundColor = "lightgreen";
                    }
                    disableAllBoxes();
                    newGameBtn.classList.remove("hide");
                    noOfTurns = 0;
                    won = true;
                    return;
                }
            } else if (boxes[boxNo].innerText == "O") {
                o_streak++;
                if (o_streak == 3) {
                    msg.innerText = `O is the winner`;
                    for (let i = 0; i < 3; i++) {
                        boxes[seq[i]].style.backgroundColor = "lightgreen";
                    }
                    disableAllBoxes();
                    newGameBtn.classList.remove("hide");
                    noOfTurns = 0;
                    return;
                }
            }
        }
    }

    if (noOfTurns == 9) {
        msg.innerText = `Match Tied`;
        newGameBtn.classList.remove("hide");
        return;
    }
};

computerTurn = () => {
    if (boxindexes.length > 0) {
        let randomIndex = Math.floor(Math.random() * boxindexes.length);
        let boxNo = boxindexes[randomIndex]; 

        boxes[boxNo].innerText = "O"; 

        boxindexes.splice(randomIndex, 1); 
        noOfTurns++;
    }
};

let restart = () => {
    enableAllBoxes();
    for (let box of boxes) {
        box.innerText = ""; 
        box.style.backgroundColor = ""; 
    }
    boxindexes = [0, 1, 2, 3, 4, 5, 6, 7, 8]; 
    noOfTurns = 0; 
    msg.innerText = "X's Turn"; 
    newGameBtn.classList.add("hide"); 
    won = false;
};

resetBtn.addEventListener("click", restart);
newGameBtn.addEventListener("click", restart);

let disableAllBoxes = () => {
    for (let box of boxes) {
        box.style.pointerEvents = "none"; 
    }
};

let enableAllBoxes = () => {
    for (let box of boxes) {
        box.style.pointerEvents = "auto"; 
    }
};
