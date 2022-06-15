"use strict";

const app = document.querySelector(".app");
const inputEls = document.querySelector(".inputs");
const buttonsEls = document.querySelector(".buttons");
const stickEl = document.querySelector(".stick");
const horizontalStickEl = document.querySelector(".horizontal-stick");
const ropeEl = document.querySelector(".rope");
const bodyEl = document.querySelector(".body");
const headEl = document.querySelector(".head");
const leftArmEl = document.querySelector(".left-arm");
const rightArmEl = document.querySelector(".right-arm");
const leftLegEl = document.querySelector(".left-leg");
const rightLegEl = document.querySelector(".right-leg");

let word;

const wordGenerator = async () => {
  const response = await fetch("https://random-word-api.herokuapp.com/word");
  const data = await response.json();
  console.log(data);
  word = data[0];
  console.log(word);
  const lengthOfWord = word.length;

  for (let i = 0; i < lengthOfWord; i++) {
    const html = `<input type='text' data-set='${i + 1}' maxlength='1'/>`;
    inputEls.insertAdjacentHTML("beforeend", html);
  }
};

wordGenerator();

let numOfLives = 0; //constructing the hagman

const buttonElsFunction = function (e) {
  const clicked = e.target;
  const inputElsArr = [...inputEls.children];

  const gameFinishedOrNot = inputElsArr.every((el) => {
    return el.value !== "";
  });

  if (!gameFinishedOrNot) {
    if (e.target.classList.contains("center")) {
      const letterClicked = clicked.textContent.toLowerCase();

      if (word.includes(letterClicked)) {
        const indexesOfWord = [];
        const letterEls = [];

        for (let i = 0; i < word.length; i++) {
          if (word[i] === letterClicked) {
            indexesOfWord.push(i);
          }
        }

        indexesOfWord.forEach((index) => {
          const letterInputEl = document.querySelector(
            `[data-set="${index + 1}"]`
          );
          letterEls.push(letterInputEl);
        });

        letterEls.forEach((el) => {
          el.value = letterClicked;
        });

        clicked.classList.add("disabled-div-crct");
      } else {
        numOfLives++;
        if (numOfLives === 1) {
          stickEl.classList.remove("display-off");
        } else if (numOfLives === 2) {
          horizontalStickEl.classList.remove("display-off");
        } else if (numOfLives === 3) {
          ropeEl.classList.remove("display-off");
        } else if (numOfLives === 4) {
          headEl.classList.remove("display-off");
        } else if (numOfLives === 5) {
          bodyEl.classList.remove("display-off");
        } else if (numOfLives === 6) {
          leftArmEl.classList.remove("display-off");
          rightArmEl.classList.remove("display-off");
        } else if (numOfLives === 7) {
          leftLegEl.classList.remove("display-off");
          rightLegEl.classList.remove("display-off");
          buttonsEls.removeEventListener("click", buttonElsFunction);
        }
        clicked.classList.add("disabled-div-wrong");
      }
    }
  } else {
    alert("You already finsihed the game bruh");
    buttonsEls.removeEventListener("click", buttonElsFunction);
    console.log("game finishedd");
  }
};

buttonsEls.addEventListener("click", buttonElsFunction);
