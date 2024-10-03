let feedback = document.getElementById("feedback");
let enter = document.getElementById("enter");
let input = document.querySelector(".num");
let submit = document.querySelector(".sub")

let secret = Math.floor(Math.random()*100);
let tries = 10;

let prev = "";

function start() {
    if (+input.value < 100 && +input.value > 0) {
        tries--;
        if (tries == 0) {
            submit.removeEventListener("click", start);
            feedback.textContent = "You Have Lost!!";
            feedback.style.color = "darkred";
            enter.style.color = "darkred";
        } else if (+input.value > secret) {
            feedback.textContent = "Too High! Try Again";
            feedback.style.color = "#e05707";
        } else if (+input.value < secret) {
            feedback.textContent = "Too Low! Try Again";
            feedback.style.color = "#00b7ffe3";
        } else {
            feedback.textContent = "You Won!!!";
            feedback.style.color = "#37cd32e7";
            enter.style.color = "#37cd32e7";
            tries = 0;
        }
        if (prev == input.value) {
            feedback.textContent = "Try Another Number";
            feedback.style.color = "#fadb2d";
            tries++;
        }
        enter.textContent = `${tries} Attempts Left`
        prev = input.value;
    } else {
        feedback.textContent = "Invalid Input!";
        feedback.style.color = "red";
    }
}

submit.addEventListener("click", start);

document.addEventListener("keydown", function(event){
    const key = event.key;
    if (key == "Enter") {
        submit.classList.add("pressed");
    } 
    if (document.activeElement !== input) {
        if (key >= "0" && key <= "9") {
            input.value += key;
        } else if (key == "Backspace") {
            input.value = input.value.toString().slice(0, -1);
        }
    }
});
document.addEventListener("keyup", function(event){
    const key = event.key;
    if (key == "Enter") {
        submit.classList.remove("pressed");
        if (tries > 0) start();
    } 
});