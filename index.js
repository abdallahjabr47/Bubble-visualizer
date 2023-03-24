let randomize_btn = document.getElementById("randomize_btn");
let solve_btn = document.getElementById("solve_btn");
let bars_container = document.getElementById("bars_container");
let range = document.getElementById("range");

let minRange = 5;
let maxRange = 100;
let numOfBars = range.value;
let heightFactor = 5;
let unsorted_array = new Array(numOfBars);

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomArray() {
  let arr = new Array(numOfBars);
  for (let i = 0 ; i < numOfBars ; i++) {
    arr[i] = randomNum(minRange, maxRange);
  }
  return arr;
}

function renderBars(arr) {
  for (let i = 0 ; i < numOfBars ; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = arr[i] * heightFactor + "px";
    bars_container.appendChild(bar);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(arr) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        for (let k = 0; k < bars.length; k++) {
          if (k !== j && k !== j + 1) {
            bars[k].style.backgroundColor = "#A7C7E7";
          }
        }
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        bars[j].innerText = arr[j];
        bars[j].style.height = arr[j] * heightFactor + "px";
        bars[j].style.backgroundColor = "lightgreen";

        bars[j + 1].innerText = arr[j + 1];
        bars[j + 1].style.height = arr[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "lightgreen";
        await sleep(500);
      }
    }
    await sleep(500);
  }
  return arr;
}

document.addEventListener("DOMContentLoaded", function () {
    unsorted_array = randomArray();
    renderBars(unsorted_array);
});

randomize_btn.addEventListener("click", function () {
    unsorted_array = randomArray();
    bars_container.innerHTML = "";
    renderBars(unsorted_array);
});  

solve_btn.addEventListener("click", function () {
    let sorted_array = bubbleSort(unsorted_array);
});

range.addEventListener("input", function () {
    numOfBars = range.value;
    minRange = 5;
    maxRange = 100;
    bars_container.innerHTML = "";
    unsorted_array = randomArray();
    renderBars(unsorted_array);
});