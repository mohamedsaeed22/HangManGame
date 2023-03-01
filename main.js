// stop on 1:06 s
const letters = "abcdefghijklmnopqrstuvwxyz";

// get array from letters
let lettersArray = Array.from(letters);
// console.log(lettersArray)

// select letters containers
let lettersContainer = document.querySelector(".letters");

// generate letters
lettersArray.forEach((letter) => {
  // create span
  let span = document.createElement("span");

  // create letter text node
  let theLetter = document.createTextNode(letter);

  span.appendChild(theLetter);

  //add class to span
  span.className = "letter-box";

  // append span to letter container
  lettersContainer.appendChild(span);
});

// object of words + categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// get random property

let allKeys = Object.keys(words);
// console.log(allKeys)

let randomPropNumber = Math.floor(Math.random() * allKeys.length);
// category
let randomPropName = allKeys[randomPropNumber];
// category words
let randomPropValue = words[randomPropName];
//random number depending on word
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];
// console.log(randomValueValue);

//set category info
// document.querySelector('.game-info .category span').innerHTML =randomPropName + ' '+randomValueValue
document.querySelector(".game-info .category span").innerHTML = randomPropName;

//select letter guess

let letterGuessContainer = document.querySelector(".letters-guess");

// convert chosen word to array

let lettersAndSpace = Array.from(randomValueValue);
console.log(lettersAndSpace);

// create span depending on word
lettersAndSpace.forEach((letter) => {
  // create empty span
  let emptySpan = document.createElement("span");
  if (letter == " ") {
    //Add class to span
    emptySpan.className = "with-space";
  }

  // append  span to the letter guess container
  letterGuessContainer.appendChild(emptySpan);
});

// select guess spans
let guessSpan = document.querySelectorAll(".letters-guess span");

//set wrong Attempt
let wrongAttempt = 0;
// select draw elements
let theDraw = document.querySelector(".hangman-draw");

// Handle click event on letter
document.addEventListener("click", (e) => {
  // set status of chosen
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // get clicked letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    // the chosen word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());
    console.log(theChosenWord);

    theChosenWord.forEach((wordLetter, wordIndex) => {
      // if the clicked letter = on of chosen letter
      if (theClickedLetter == wordLetter) {
        //set status to correct
        theStatus = true;

        // loop through guess spans
        guessSpan.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });
    // if letter is wrong
    if (theStatus !== true) {
      //increase the wrong attempt
      wrongAttempt++;
      // add class wrong on the draw element
      theDraw.classList.add(`wrong-${wrongAttempt}`);

      // play fail sound
      document.getElementById("fail").play();

      if (wrongAttempt === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    } else {
      // play success sound
      document.getElementById("success").play();
    }
  }
});


function endGame(){
let div = document.createElement("div");
let divText = document.createTextNode(`GameOver , the word is ${randomValueValue}`)
div.appendChild(divText)
div.className = "popup"

document.body.appendChild(div)
}