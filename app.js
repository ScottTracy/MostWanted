
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    searchByName(people)
    break;
    case 'no':
    searchByTraits(people);
    break;
    default:
    alert("Wrong! Please try again, following the instructions dummy. :)");
    app(people);
    break;
  }
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'DOB', 'occupation', or 'all traits.'").toLowerCase();
  let filteredPeople;

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
      case "all traits":
      filteredPeople = searchByAllTraits(people);
      break;
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }  

  let foundPerson = filteredPeople[0];

  mainMenu(foundPerson, people);
}

function searchByFirstName(firstName, people){

  let newArray = people.filter(function (el){
    if(el.firstName.toLowerCase() == firstName) {
      return true;
    }
  });
  return newArray;
}

function searchByLastName(lastName, people){

  let newArray = people.filter(function(el){
    if(el.lastName.toLowerCase() == lastName){
      return true;
    }
  });
  return newArray;
}

function searchByHeight(people){
  let userInputHeight = prompt("How tall is the person in inches?");

  let newArray = people.filter(function (el) {
    if(el.height == userInputHeight) {
      return true;
    }
  });
return newArray;
}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");

  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
  });
  return newArray;
}

function searchByEyeColor(people){
  let userInputEyeColor = prompt ("What is their eye color?").toLowerCase();;

  let newArray = people.filter(function (el) {
    if(el.eyecolor == userInputEyeColor) {
      return true;
    }
  });
return newArray;
}

function searchByGender(people){
  let userInputGender = prompt ("What is their gender?").toLowerCase();;

  let newArray = people.filter(function (el) {
    if(el.gender == userInputGender) {
      return true;
    }
  });
return newArray;
}

function searchByAge(people){
  let userInputAge = prompt ("What is their Age?").toLowerCase();
  let newArray = people.filter(function (el) {
    if(timeDifference(getToday(),el.dob) == userInputAge) {
      return true;
    }
  });
return newArray;
}
function getToday(){
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth;
  let year = today.getFullYear();
  if (day < 10) {
    day = '0' + day
  }
  if (month < 10){
    month = '0' + day
  }
  today = month + "/"+ day + "/" + year
  return today
}
function timeDifference(today, pastDate){
let timeDifference = Math.abs(today.getTime() - pastDate.getTime());
let yearDifference = Math.floor(timeDifference/(1000 * 3600 * 24 * 365));
return yearDifference
}
function searchByOccupation(people){
  let userInputOccupation = prompt ("What is their occupation?").toLowerCase();;

  let newArray = people.filter(function (el) {
    if(el.occupation == userInputOccupation) {
      return true;
    }
  });
return newArray;
}

function searchByAllTraits(people){
  let userInputAllTraits = prompt ("Please enter which traits to search by: height, weight, eye color, gender, age, or occupation: ").toLowerCase();;
  let newArray = people;
  userInputAllTraits = userInputAllTraits.replace(/\s/g,'');
  let traitArray = userInputAllTraits.split(",");

  for(let trait in traitArray){
    if(newArray.length == 1){
      return newArray;
    }
    else if(traitArray[trait] == "height"){
      newArray = searchByHeight(newArray);
    }
    else if(traitArray[trait] == "weight"){
      newArray = searchByWeight(newArray);
    }
    else if(traitArray[trait] == "eyecolor"){
      newArray = searchByEyeColor(newArray);
    }
    else if(traitArray[trait] == "gender"){
      newArray = searchByGender(newArray);
    }
    else if(traitArray[trait] == "dob"){
      newArray = searchByDob(newArray);
    }
    else if(traitArray[trait] == "occupation"){
      newArray = searchByOccupation(newArray);
    }
    else{
      alert("You entered an invalid search type! Please try again.");

    }    

  }
  return newArray;
}

function mainMenu(person, people){

  if(!person){
    alert("Could not find that individual.");
    return app(people);
  }
  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    displayPerson(person);
    break;
    case "family":
    displayFamily(person, people);
    break;
    case "descendants":
    displayDescendants(person, people);
    break;
    case "restart":
    app(people);
    break;
    case "quit":
    return;
    default:
    return mainMenu(person, people);
  }
}

function searchByName(people){
  
  var lastName = promptFor("What is the person's last name?", chars).toLowerCase();;
  let nameArray = searchByLastName(lastName, people);
      if(nameArray.length === 1){
          return mainMenu(nameArray[0], people);
      } 
      else{
        var firstName = promptFor("What is the person's first name?", chars).toLowerCase();;
          nameArray = searchByFirstName(firstName, nameArray);
          return mainMenu(nameArray[0], people);
      } 
}

function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  let personInfo = [];

  for(let trait in person){
  personInfo += trait;
  personInfo += ": ";
  personInfo += person[trait];
  personInfo += " | ";
}
  alert(personInfo);
}

function displayDescendants(person, people){
  let totalDescendants = [];
  let transferAmount = 0;
  searchDescendants(person,people);
  function searchDescendants(person,people){
    let newArray = people.filter(function(el){
    
      for(let parent in el.parents){
        if(el.parents[parent] == person.id){
        return true;
        }
      }      
    });
    transferAmount += newArray.length;
    addArraytoArray(totalDescendants,newArray);
  }
  if (transferAmount > 0){
      transferAmount = 0;
      for(let descendant in totalDescendants){
        searchDescendants(totalDescendants[descendant],people);
      }
    }
  displayPeople(totalDescendants);
}
  
function addArraytoArray(originalArray, adderArray){
  for (let item in adderArray){
    originalArray.push(adderArray[item]);
  }
}

function displayFamily(person, people){
 let family = [];
 addArraytoArray(family, findParents(person,people));
 addArraytoArray(family, findSiblings(person,people));
 addArraytoArray(family, searchChildren(person,people));
 addArraytoArray(family, findSpouse(person,people));
 displayPeople(family);

}

function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function chars(input){
  return true;
}
function searchChildren(person,people){
  let newArray = people.filter(function(el){
    
    for(let parent in el.parents){
      if(el.parents[parent] == person.id){
        return true;
      }
    } 
  });
  return newArray;
  }

function findParents(person,people){
  let newArray = [];
  newArray = people.filter(function(el){
    for( let parent in person.parents) {
      if (el.id == person.parents[parent]){
        return true;
      }
    }
  });
  return newArray
}

function findSpouse(person,people){
  return people.filter(function(el){
    if (el.id === person.currentSpouse){
      return true;
    }
  });
}

function findSiblings(person,people){
  parents = findParents(person,people)
  for (let parent in parents){
    siblingsArray = searchChildren(parents[parent],people);
    return removeSelf(person, siblingsArray)
}
function removeSelf(person,array){
  return array.filter(function(el){
    if (el.id != person.id){
      return true;
    }
  });
}
}