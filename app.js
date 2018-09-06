
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    searchByName(people);
    break;
    case 'no':
    searchByTraits(people);
    break;
    default:
    alert("Wrong! Please try again, following the instructions dummy. :)");
    app(people); // restart app
    break;
  }
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation', multiple traits.");
  let filteredPeople;
  let numberOfPeopleFound = 0;
  let personFound;
  let foundPerson;
  let peopleFound = "";

  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      break;
    case "eye color":
      filteredPeople = searchByEyeColor(people);
      break;
    case "gender":
      filteredPeople = searchByGender(people);
      break;
    case "age":
      filteredPeople = searchByAge(people);
      break;
    case "occupation":
      filteredPeople = searchByOccupation(people);
      break;
    case "multiple traits":
    filteredPeople = searchAllTraits(people);
    break;
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }  

  if (filteredPeople.length > 1) {
    for (i = 0; i < filteredPeople.length; i++) {
      peopleFound += "\n" + filteredPeople[i].firstName + " " + filteredPeople[i].lastName;
    }
    alert("Results found:" + peopleFound);
    searchByName(people);
    }
  else {
      foundPerson = filteredPeople[0];
      mainMenu(foundPerson, people);
  }   
}

function searchAllTraits(people) {
  let longString;
  let partA;
  let partB;
  let partC;
  let partD;
  let partE;
  //let userInput = prompt("Please enter one or multiple traits to search from. ex:height, weight, eye color, gender, age, occupation.")
  if (true) {
    partA = searchByWeight(people);
  }
  if (true) {
    partB = searchByHeight(people);
  }
  if (true) {
    partC = searchByEyeColor(people);
  }
  if (true) {
    partD = searchByGender(people);
  }
  if (true) {
    partE = searchByOccupation(people);
  }
  alert("Found by weight:\n" + displayPeople2(partA) + "\n\nFound by height:\n" + displayPeople2(partB) +  "\n\nFound by eye color:\n" + displayPeople2(partC)+  "\n\nFound by gender:\n" + displayPeople2(partD) +  "\n\nFound by occupation:\n" + displayPeople2(partE));
  searchByName(people);
}

function searchByWeight(people) {
  let userInput = prompt("How much does the person weigh?");
  let newArray;
    newArray = people.filter(function (el) {
    if(el.weight == userInput) { 
      return true;
    }
    });
  return newArray;
}

function searchByHeight(people) {
  let userInput = prompt("How tall is the person?");
  let newArray;
  newArray = people.filter(function (el) {
    if(el.height == userInput) { 
      return true;
    }
    });
  return newArray;
}

function searchByEyeColor(people) {
  let userInput = prompt("What color are their eyes?");
  let newArray;
  newArray = people.filter(function (el) {
    if(el.eyeColor == userInput) { 
      return true;
    }
    });
  return newArray;
}

function searchByGender(people) {
  let userInput = prompt("What is their gender?");
  let newArray;
  newArray = people.filter(function (el) {
    if(el.gender == userInput) { 
      return true;
    }
    });
  return newArray; 
}

function searchByAge(people) {
  let dobInfo;
  let peopleDob;
  let peopleMonth;
  let peopleDay;
  let peopleYear;
  let userInputAge = prompt("Enter the age.");
  let allSameAge = "";
  for (i = 0; i < 3; i++) {
    if (calculateAge(people[i]) == userInputAge) {
      allSameAge += "\n" + people[i].firstName + " " + people[i].lastName;
    }
}
  alert("Results found:" + allSameAge);
  searchByName(people);
}

function calculateAge (person) {

  dobInfo = person.dob.split("/");
  personDob = dobInfo;
  personMonth = personDob[0];
  personDay = personDob[1];
  personYear = personDob[2]; 

  let birthday = new Date(personYear, personMonth, personDay);
  let ageDifference = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDifference); 
  return Math.abs(ageDate.getUTCFullYear() - 1970); 

}

function searchByOccupation(people) {
  let userInput = prompt("What is their occupation?");
  let newArray;
  newArray = people.filter(function (el) {
    if(el.occupation == userInput) { 
      return true;
    }
    });
  return newArray;
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    displayPerson(person);
    break;
    case "family":
    getFamily(person, people);
    // TODO: get person's family
    break;
    case "descendants":
    displayPeople(findAllDescendants(person, people));
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function findAllDescendants(foundPerson, people){
 let children = people.filter(function(person) {
   for (let i = 0; i < person.parents.length; i++){
     if (person.parents[i] == foundPerson.id){
       return true;
     }
   }
 });
 for (let i = 0; i < children.length; i++){
   children = children.concat(findAllDescendants(children[i], people));
 }
 return children;
}

function getFamily (person, people) {
  let addAllFamily = "";
  for (i = 0; i < people.length; i++) {
    if ((people[i].parents[0] == person.id)||(people[i].parents[1] == person.id)||(people[i].currentSpouse == person.id)||(person.parents[0] == people[i].id)||(person.parents[1] == people[i].id)){
    addAllFamily += ("\nFamily member of " + person.firstName +  " " + person.lastName + ": " + people[i].firstName + " " + people[i].lastName);
    }}
  alert(addAllFamily);
  }

function searchByName(people){
  let searchByNameType = prompt("A) Full name search. \nB) First name search. \nC) Last name search.").toLowerCase();
  let firstName;
  let lastName;
  let personFound = "";
  if (searchByNameType === "a") {
    firstName = promptFor("What is the person's first name?", chars);
    lastName = promptFor("What is the person's last name?", chars);
    for (i = 0; i < people.length; i++){
      if (people[i].firstName.toLowerCase() === firstName.toLowerCase() && people[i].lastName.toLowerCase() === lastName.toLowerCase()) {
        personFound = people[i];
      }
    }  
  }
   else if (searchByNameType === "b") {
    firstName = promptFor("What is the person's first name?", chars);
    for (i = 0; i < people.length; i++){
      if (people[i].firstName.toLowerCase() === firstName.toLowerCase()) {
        personFound = people[i];
      }
    } 
  }
  else if (searchByNameType === "c") {
    lastName = promptFor("What is the person's last name?", chars);
    for (i = 0; i < people.length; i++){
      if (people[i].lastName.toLowerCase() === lastName.toLowerCase()) {
        personFound += "\n" + people[i].firstName + " " + people[i].lastName;
      }
    } 
  }
  if (searchByNameType === "c") {
    alert("The results:" + personFound);
    searchByName(people);
  }
  else {
    mainMenu(personFound,people);
  }
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}
function displayPeople2(people){
  let theString;
  theString = (people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
  return theString;
}
function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First name: " + person.firstName + "\n";
  personInfo += "Last name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n";
  personInfo += "Current spouse: " + person.currentSpouse + "\n";
  personInfo += "Id: " + person.id + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
