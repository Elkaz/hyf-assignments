function getFullName(firstName, surname, useFormalName, gender){
    
    if (!firstName || !surname) {
        return "Please write your first name and surname.";
    }

    if (useFormalName == true && gender == "male") {
        return `Lord ${firstName} ${surname}`;

    } else if (useFormalName == true && gender == "female") {
        return `Lady ${firstName} ${surname}`;

    } else {
        return `${firstName} ${surname}`;
    }
        
}
const fullName1 = getFullName("Kate", "Wilson", true, "female");
const fullName2 = getFullName("Alex", "Hens", true, "male");
const fullName3 = getFullName("David", "Clark", false, "male");
const fullName4 = getFullName("", "Clark", false, "male");


console.log(fullName1);
console.log(fullName2);
console.log(fullName3);
console.log(fullName4);
