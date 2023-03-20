// const prompt = require("prompt");
// Prompt the user to enter the student marks
let marks = prompt("Enter the student marks (between 0 and 100): ");

  // Convert the input to a number
  marks = Number(marks);

  // Check if the input is a valid number between 0 and 100
  if (isNaN(marks) || marks < 0 || marks > 100) {
    alert("Invalid input. Marks range between 0 and 100.");
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
