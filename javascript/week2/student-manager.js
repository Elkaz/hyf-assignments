const class07Students = [];

function addStudentToClass(studentName) {

   if (class07Students.length >= 6 && studentName != "Queen"){
    return `Cannot add more students to class 07.`;
   }

   if (class07Students.includes(studentName)) {
    return `Student ${studentName} is already in the class.`;
   }
   
   if (!studentName) {
  return `Cannot add an empty name to class 07.`;
}
class07Students.push(studentName); 
    return `Student ${studentName} added to the class 07.`
}

console.log(addStudentToClass("Benjamin"));
console.log(addStudentToClass("Benjamin"));
console.log(addStudentToClass("Ryan"));
console.log(addStudentToClass("Ela"));
console.log(addStudentToClass(""));
console.log(addStudentToClass("David"));
console.log(addStudentToClass("Saeid"));
console.log(addStudentToClass("Ivan"));
console.log(addStudentToClass("Ida"));
console.log(addStudentToClass("Queen"));
console.log(addStudentToClass("Queen"));


function getNumberOfStudents() {
  return class07Students.length;
}

console.log(`Class 07 has ${getNumberOfStudents()} students.`)