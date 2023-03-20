//This program takes the speed of the car fromm the user (user input).
//Other sources of input could include the sensor input(live) and database input(offline).
let speed = prompt("Enter the speed of the car: ");

//check if the speed is empty.
const isEmpty = (speed === "");

//check if the speed can be converted to a number(and therefore is a number).
const isNumber = (!isNaN(speed));

//check if the speed is non-negative.
const isNonNegative = (Number(speed) >= 0);

//check if the speed is a valid number by confirming that: it is not empty AND that it can be converted to a number AND that it is non-negative.
const isValidNumber = (!isEmpty && !isNaN(speed) && isNonNegative);


//Only process the input if it is a number AND if it is not empty.
if (isValidNumber){

  //convert speed from a string to a number.
  speed = Number(speed);

  //The message variable stores the result of the speed resolution.
  let message = resolveSpeed(speed);

  //This line modifies the webpage DOM to diplay the message.
  document.getElementById("speed").textContent = message;

  //This line logs the message to the console.
  console.log(message);
} else {
  alert("The speed must be a non-negative number");
}


//This function resolves the speed according to the given conditions.
function resolveSpeed(speed){

  //confirms speed is less than 70 and returns "Ok" for this case.
  if (speed < 70){
    return "Ok";
  }

  //Calculate the speed over the 70 threshold and convert it to demerit points.
  const speedOverLimit = speed - 70;
  const demeritPoints = Math.floor(speedOverLimit / 5);

  //If the demerit points are more than 12, then suspend the license.
  if (demeritPoints > 12){
    return "License Suspended";
  }

  //The function rolls off to this statement when there are demerit points that do not exceed 12.
  return `Demerit points: ${demeritPoints}`;
}