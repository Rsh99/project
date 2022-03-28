let arr = [];
const one = document.querySelector("#heart");
const win = document.querySelector(".win");
const cards = document.querySelectorAll(".card");
let count = 0;
let matchedCards = 0;
let gameOver = false;

let youarewin = false;

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 1) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

shuffle();

function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 32);
    card.style.order = randomPos;
  });
}

let time = 0;
let timerid = 0;
let timerout = true;

const timer = document.querySelector("#timer");
const init = function () {
  timerout = false;
  timerid = setInterval(function () {
  
    time++;
    timercount();
  }, 1000);
};

const timercount = function () {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  if (sec < 10) {
    timer.innerHTML = `${min}:0${sec}`;
  } else {
    timer.innerHTML = `${min}:${sec}`;
  }
};

const stop = function () {
  clearInterval(timerid);
};

/////////////////////////////////////////////////

for (let card of cards) {
  card.addEventListener("click", function (event) {
    if (gameOver) {
      return;
    }

    if (timerout) {
      init();
    }
    console.log(timerout);

    if (
      card.classList.contains("open") === true ||
      card.classList.contains("match") === true
    ) {
      console.log("no");
    } else {
      event.target.classList.add("open");
      arr.push(event.target);

      switch (arr.length) {
        case 2:
          let a = arr[0].children[0].className;
          let b = arr[1].children[0].className;
          if (a === b) {
            matchedCards = matchedCards + 1;
            console.log("i amd win" + matchedCards);
            for (const element of arr) {
              element.classList.add("match");
              element.classList.remove("open");
            }
          } else {
            for (const element of arr) {
              setTimeout(function () {
                element.classList.remove("open");
              }, 300);
            }
          }
          count = count + 1;
          const moves = document.querySelector("#moves");
          moves.innerHTML = count;

          console.log("caount" + count);

          if (matchedCards === 8) {
            youarewin = true;
            if (youarewin) {
              console.log("win");
              stop();
              win.innerHTML = "you are win";
            }
          }

          if (count === 24) {
            gameOver = true;
            if (gameOver) {
              stop();
              win.innerHTML = "you are lose";
            }
          }

          if (count === 8) {
            one.children[1].children[0].style.display = "none";
          } else if (count === 16) {
            one.children[2].children[0].style.display = "none";
          }

          
          arr.pop();
          arr.pop();
          break;
        default:
          break;
      }
    }

    
    const start = document.querySelector("#restart");

    start.addEventListener("click", function () {
      for (const element of cards) {
        if (element.classList.contains("open") === true) {
          element.classList.remove("open");
        } else if (element.classList.contains("match") === true) {
          element.classList.remove("match");
        }
      }

      stop();
      timerout = true;
      time = 0;
      timercount();

      count = 0;
      moves.innerHTML = "0 moves";
      matchedCards = 0;
      one.children[1].children[0].style.display = "block";
      one.children[2].children[0].style.display = "block";

      win.innerHTML = "";
    });
  });
}
