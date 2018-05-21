/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
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
    app(people); // restart app
    break;
  }
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.").toLowerCase();;
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
    // so on and so forth
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
  let userInputHeight = prompt("How tall is the person in cm?");

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
  let userInputAge = prompt ("What is their age?").toLowerCase();;

  let newArray = people.filter(function (el) {
    if(el.age == userInputAge) {
      return true;
    }
  });
return newArray;
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

    displayPerson(person);
    break;

    case "family":
    displayFamily(person, people);
    // TODO: get person's family
    break;

    case "descendants":
    displayDescendants(person, people);
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
  // TODO: find the person using the name they entered

}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = [];

  for(let trait in person){
  personInfo += trait;
  personInfo += ": ";
  personInfo += person[trait];
  personInfo += " | ";
}
  // TODO: finish getting the rest of the information to display
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
  let newArray = people.filter(function(el){

    for(let family in el.families){
      if(el.families[family] == person.id){
        return true;
      }
    }
  });
  alert(displayPeople(newArray));
  return newArray;
}

function displayParent(people){
  let parent = [];
    for(let person in people){
      parent.push(person.firstName); 
      parent.push(person.lastName);
    } 
    alert(displayPeople(parent));
    return parent;
  }

function displaySibling(people){
  let sibling = [];
    for(let person in people){
      sibling.push(person.firstName); 
      sibling.push(person.lastName);
    } 
    alert(displayPeople(sibling));
    return sibling;
  }

function displaySpouse(person, people){
  let spouse = [];
    for(let person in people){
      spouse.push(person.firstName); 
      spouse.push(person.lastName);
    } 
    alert(displayPeople(spouse));
    return spouse;
  }

function displayChildren(people){
  let children = [];
    for(let person in people){
      children.push(person.firstName); 
      children.push(person.lastName);
    } 
    alert(displayPeople(children));
    return children;
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
  let newArray = people.filter(function(el)){
    for( let parent in el.parents) {
      if (el.id == person.parents[parent]){
        return true;
      }
    }

  }
}
