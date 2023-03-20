// const prompt = require("prompt");
// Prompt the user to enter the student marks
let marks = prompt("Enter the student marks (between 0 and 100): ");
  //check whether the prompt function has returned an empty string.
  const empty = (marks === "");

  const isNumber = (!isNaN(marks));

  // Convert the input to a number if the input is not empty AND if the input is a number.
  if (!empty && isNumber){
    marks = Number(marks);
  }
  

  //If the input is an invalid number (!(0 - 100)) OR if the input is empty OR if the input is not of type number, invoke an allert.
  if (!(marks >= 0 && marks <= 100) || empty || !isNumber) {
    alert("Invalid input. Marks range between 0 and 100.");

    //Otherwise, define a variable grade to store the grade based on the marks.
  } else {
    // Determine the grade based on the given ranges
      let grade;
      if (marks > 79) {
        grade = "A";
      } else if (marks >= 60 && marks <= 79) {
        grade = "B";
      } else if (marks >= 50 && marks <= 59) {
        grade = "C";
      } else if (marks >= 40 && marks <= 49) {
        grade = "D";
      } else {
        grade = "E";
      }

        // Set the contents of the <p id="grade"> element to the obtained grade.
        document.getElementById("grade").textContent = `Student grade: ${grade}`;

  //log the output to the browser console.
  console.log(`Student grade: ${grade}`);
}
