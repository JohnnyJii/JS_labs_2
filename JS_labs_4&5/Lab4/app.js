let button = document.getElementById("generate");

button.addEventListener("click", function () {

  //get random numbers

  let numbers = [];
  let ball = document.getElementsByClassName("ball");

  while (numbers.length < 7) {

    let random = Math.floor(Math.random() * 40) + 1;

    if (numbers.indexOf(random) == -1) {
      numbers.push(random);
    }
  }

  //sort numbers in array

  numbers.sort(function (low, high) {
    return low - high;
  });

  //color balls

  for (let i = 0; i < ball.length; i++) {

    ball[i].style.backgroundColor = "white";
    ball[i].style.color = "#3d3c3a";

    for (let j = 0; j < numbers.length; j++) {
      if (numbers[j] == parseInt(ball[i].innerHTML)) {
        ball[i].style.backgroundColor = "#fa8b60";
        ball[i].style.color = "white";
      }
    }
  }

  //add numbers to history

  let history = [];
  let historyDiv = document.getElementById("history");
  let para = document.createElement("p");
  history.push(numbers.join(", "));

  for (let k in history) {

    let node = document.createTextNode(history[k]);
    para.appendChild(node);
    historyDiv.appendChild(para);

  }

});