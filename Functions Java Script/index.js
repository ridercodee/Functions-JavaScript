// Import Sample Data
import employees from "./data.json" assert { type: "json" };

import createPrompt from "prompt-sync";
let prompt = createPrompt();

function getInput(promptText, validator, transformer) { 
  let Value = prompt(promptText);
  if (validator && !validator(Value)) { 
    console.error;
    process.exit(1);
  }
  if (transformer) { 
    return transformer(Value);
  } 
  return Value;
}

// Validator functions----------------------------------

const isStringInputValid = function (input) { 
  return (input) ? true : false;
}

const isBooleanInputValid = function (input) { 
 return (input === "yes" || input === "no");
}
const isStartYearValid = function (input) { 
  let numValue = Number(input);
  if (!Number.isInteger(numValue) || numValue < 1990 || numValue > 2023) { 
    return false;
  }
   return true;
}

const isStartMonthValid = function (input) { 
  let numValue = Number(input);
  if (!Number.isInteger(numValue) || numValue < 1 || numValue > 12) { 
    return false;
  }
  return true;
}

const isStartDayValid = function (input) { 
  let numValue = Number(input);
  if (!Number.isInteger(numValue) || numValue < 1 || numValue > 31) { 
    return false;
  }
  return true;
}

// Application commands --------------------

function listEmployees() { 
  console.log(`Employee List ----------------`);
    console.log('');

    for (let emp of employees) { 
      for (let property in emp) { 
       console.log(`${property}: ${emp[property]}`);   
      }
      console.log('');
      prompt('Press enter to continue...');
    }
    console.log(`Employee list is completed`);
}

function addEmployees() { 
  console.log(`Add Employee ----------------`);
    console.log('');

    let employee = {};
    employee.firstName = getInput("First Name: ", isStringInputValid);
    employee.lastName = getInput("Last Name: ", isStringInputValid);
    let startDateYear = getInput("Employee start Year (1990-2023): ", isStartYearValid);
    let startDateMonth = getInput("employee start Month(1 -12): ", isStartMonthValid);
    let startDateDay = getInput("Employee start Date Day(1-31): ", isStartDayValid);
    employee.startDate = new Date(startDateYear, startDateMonth - 1, startDateDay);
    employee.isActive = getInput("Employee Is Active (yes or no): ", isBooleanInputValid, i => (i === "yes") );

    
