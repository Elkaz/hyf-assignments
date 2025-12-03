// Assignment
let savedName = "";
let toDoList = [];

//Add To-Do function
function addToDoItem(item) {
  toDoList.push(item);
}

// Remove from To-Do function
function removeToDoItem(removeItem) {
  const i = toDoList.indexOf(removeItem);
  if (i > -1) {
    toDoList.splice(i, 1);
  }
}

// Math function
function simpleMath(sentence) {
  const operand2 = Number(sentence[sentence.length - 1].replace("?", ""));
  const operator = sentence[sentence.length - 2];
  const operand1 = Number(sentence[sentence.length - 3]);
  let result;
  switch (operator) {
    case "+":
      result = operand1 + operand2;
      break;
    case "-":
      result = operand1 - operand2;
      break;
    case "*":
      result = operand1 * operand2;
      break;
    case "/":
      result =
        operand2 != 0
          ? operand1 / operand2
          : "Ops!! Divide by zero error encountered";
      break;
    case "%":
      result =
        operand2 != 0
          ? operand1 % operand2
          : "Ops!! Divide by zero error encountered";
      break;
    default:
      console.log(
        "I can do just simple math! I'll promise to learn more in the next version."
      );
  }
  return result;
}

// Main function
function getReply(command) {
  const commandLowercase = command.toLowerCase();
  const sentence = commandLowercase.trim().split(" ");

  //Find, Save and Change the name to Camel case
  const name =
    sentence[sentence.length - 1].charAt(0).toUpperCase() +
    sentence[sentence.length - 1].slice(1).toLowerCase();

  if (commandLowercase.includes("my name is")) {
    if (!savedName) {
      savedName = name;
      return `Nice to meet you ${savedName}.`;
    } else if (savedName === name) {
      return `You already told me your name ${savedName}.`;
    } else if (savedName != name) {
      return `Ops, It seems you changed your name.`;
    }
  }

  // Respond to the name question
  else if (commandLowercase.includes("what is my name")) {
    return savedName
      ? `Your name is ${savedName}.`
      : `You didn't mentioned your name yet.`;
  }
  // Add To-Do item and respond to add command
  else if (
    sentence[0] === "add" &&
    ["todo", "tod", "to-do"].includes(sentence[sentence.length - 1])
  ) {
    const item = sentence.slice(1, sentence.length - 3).join(" ");
    addToDoItem(item);
    return `Added ${item} to your To-Do list.`;
  }
  // Remove To-Do item and respond to remove command
  else if (
    sentence[0] === "remove" &&
    ["todo", "tod", "to-do"].includes(sentence[sentence.length - 1])
  ) {
    const removeItem = sentence.slice(1, sentence.length - 3).join(" ");
    removeToDoItem(removeItem);
    return `Removed ${removeItem} from your todo.`;
  }

  // Respond to To-Do list status
  else if (["what is on my todo?"].includes(sentence)) {
    return `You have ${toDoList.length} todo - ${toDoList[i]}`;
  } else if (commandLowercase.includes("what is on my todo")) {
    if (toDoList.length === 0) {
      return "Your to-do list is empty.";
    } else {
      return `You have ${toDoList.length} todos - ${toDoList.join(" and ")}.`;
    }
  }

  // Date
  else if (commandLowercase.includes("what day is it today")) {
    const today = new Date();
    const day = today.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    return `${day}. of ${month} ${year}`;
  }

  //Do simple math
  else if (
    sentence[0] === "what" &&
    ["+", "-", "*", "%", "/"].includes(sentence[sentence.length - 2])
  ) {
    const result = simpleMath(sentence);
    return result;
  }

  //Set the timer
  else if (commandLowercase.includes("set a timer for")) {
    // Extract the number of minutes from the command
    const timer = Number(sentence[sentence.length - 2]);
    setTimeout(() => {
      console.log("Timer done");
    }, timer * 60 * 1000); // Convert minutes to milliseconds
    return `Timer set for ${timer} minutes.`;
  } else if (commandLowercase.trim() === "hello" || "hi" || "hey") {
    return "Hello! How can I help you?";
  }
}

console.log(getReply("Hi, my name is Ryan"));
console.log(getReply("Hi, my name is Ryan"));
console.log(getReply("Hi, my name is Saeid"));

console.log(getReply("what is my name "));
console.log(getReply("Add fishing to my to-do"));
console.log(getReply("Add singing in the shower to my tod "));
console.log(getReply("Add buy milk to my todo"));
console.log(getReply("Remove fishing from my todo"));
console.log(toDoList);
console.log(getReply("what day is it today?"));
console.log(getReply("what is 3 + 3?"));
console.log(getReply("what is 150 - 100"));
console.log(getReply("what is 150 * 100"));
console.log(getReply("what is 150 / 10"));
console.log(getReply("what is 150 / 0"));
console.log(getReply("what is 150 % 15"));
console.log(getReply("Set a timer for 4 minutes"));
console.log(getReply("Set a timer for 50 minutes"));
console.log(getReply("hello"));
console.log(getReply("hi"));
