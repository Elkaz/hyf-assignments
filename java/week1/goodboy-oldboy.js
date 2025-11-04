const dogYearOfBirth = 2017;
const dogYearFuture = 2027;
const shouldShowResultInDogYears = true; 
const ageInHumanYear = dogYearFuture - dogYearOfBirth;
const ageInDogYear = ageInHumanYear * 7;

if (shouldShowResultInDogYears) {
    console.log(`Your dog will be ${ageInDogYear} dog years old in ${dogYearFuture}.`);
} else {
    console.log (`Your dog will be ${ageInHumanYear} human years old in ${dogYearFuture}.`);
}
