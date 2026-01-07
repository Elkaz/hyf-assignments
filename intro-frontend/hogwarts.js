const input = document.getElementById("nameInput");
const button = document.getElementById("button");
const tryAgainButton = document.getElementById("tryAgainButton");
const result = document.getElementById("result");

const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];

function assignHouse(name) {
  const house = houses[Math.floor(Math.random() * houses.length)];

  // update text
  result.innerText = `${name} belongs in ${house}!`;

  // remove old house classes
  result.classList.remove("gryffindor", "slytherin", "ravenclaw", "hufflepuff");

  // add new house class
  result.classList.add(house.toLowerCase());
}

button.addEventListener("click", function () {
  const name = input.value.trim();

  if (name === "") {
    result.innerText = "Please enter your name!";
    result.classList.remove(
      "gryffindor",
      "slytherin",
      "ravenclaw",
      "hufflepuff"
    );
    return;
  }

  assignHouse(name);
  tryAgainButton.style.display = "inline-block";
});

tryAgainButton.addEventListener("click", function () {
  const name = input.value.trim();

  if (name === "") {
    result.innerText = "Please enter your name!";
    result.classList.remove(
      "gryffindor",
      "slytherin",
      "ravenclaw",
      "hufflepuff"
    );
    return;
  }

  assignHouse(name);
});
