//Save a note

const notes = [];

function saveNote(content, id) {
  notes.push({content: content, id:id});
}

saveNote("Pick up groceries", 1);
saveNote("Do laundry", 2);

console.log(notes); 

//Get a note

function getNote(id) {
  if(id === undefined || typeof id !== "number") {
    console.log("Error: Please write a valid id.");
    return;
  }
  for (let i = 0; i < notes.length; i++) {
    if(notes[i].id == id) {
        return notes[i];
    }
  }
}

const firstNote = getNote(1);
console.log(firstNote); 

const letterNote = getNote("a");
console.log(letterNote);

//Log out notes

function logOutNotesFormatted() {
  
 notes.forEach(note => {
    console.log(`The note with id: ${note.id} has the following note text: ${note.content}.`)
 });
}

logOutNotesFormatted(); 

//Search feature
// I like to add search feature by a keyword to the app.

function searchNotes(keyword) {

    return notes.filter(note => note.content.toLowerCase().includes(keyword.toLowerCase()));

}

console.log(searchNotes("Pick"));