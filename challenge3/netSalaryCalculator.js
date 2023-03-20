let monthlyBasicSalary = prompt("Enter your monthly basic salary: ");


if (!isValidInput(monthlyBasicSalary)){
  alert("The salary must be a non-negative number");

} else{
  monthlyBasicSalary = Number(monthlyBasicSalary);
  let pensionablePay = prompt("Enter your pensionable pay per month: ");

  if (!isValidInput(pensionablePay)){
    alert("The pensionable pay must be a non-negative number");
  
  } else if (Number(pensionablePay) > 18000){
    alert("The available pension tiers support a maximum of 18000");

  } else{
    pensionablePay = Number(pensionablePay);
    let grossSalary = monthlyBasicSalary * 12;
    let annualPAYETax = calculatePayeTax(monthlyBasicSalary);
    let nhifDeductions = calculateNhifDeductions(monthlyBasicSalary);
    let NSSFDeductions = calculateNssfDeductions(pensionablePay);
    let netSalary = calculateNetSalary(monthlyBasicSalary);

    document.getElementById("grossSalary").textContent = grossSalary;
    document.getElementById("annualPAYETax").textContent = annualPAYETax;
    document.getElementById("NHIFDeductions").textContent = nhifDeductions;
    document.getElementById("NSSFDeductions").textContent = NSSFDeductions;
    document.getElementById("netSalary").textContent = netSalary;

    console.log("Annual Gross Salary: ", annualPAYETax);
    console.log("Annual NHIF deductions: ", nhifDeductions);
    console.log("Annual NSSF deductions: ", NSSFDeductions);
    console.log("Annual Net Salary: ", netSalary);
  }
}



//function that checks if the input is valid by asserting that it is a number, it is non-negative and it is not empty
function isValidInput(inputParameter){
  if (inputParameter === "" || isNaN(inputParameter) || Number(inputParameter) < 0)
    return false;

  return true;
}

// function to calculate PAYE tax for a year.
function calculatePayeTax(monthlyBasicSalary) {
  const annualPay = monthlyBasicSalary * 12;

  //The following gives the maximum allowable annual reliefs due to various considerations.
  const personalRelief = 28800;
  const insuranceRelief = 60000;

  //No relief is given for allowable pension contribution and affordable housing since the reference websites did not factor this relief in their 
  //computations. However, a relief can be added in based on the system requirements.
  const allowablePensionContribution = 0; 
  const affordableHousingRelief = 0;

  const totalAnnualRelief = personalRelief + insuranceRelief + allowablePensionContribution + affordableHousingRelief;
  
  let annualPAYEBeforeRelief = 0;
  
  //Charge a 10% tax rate for annual pay below 288000
  if (annualPay <= 288000) {
    annualPAYEBeforeRelief = annualPay * 0.1;
  } 
  

  //Charge 25% for annual pay over 288000 and below 388000 inclusive.
  if (annualPay > 288000 && annualPay <= 388000) {
    annualPAYEBeforeRelief += ((annualPay - 24000) * 0.25);
  } 
  

  //Charge 30% for monthly pay over 388000.
  if (annualPay > 388000){
    annualPAYEBeforeRelief += ((annualPay - 32333) * 0.3);
  }

  //Obtain the monthly PAYE after relief by deducting the total monthly reliefs.
  let annualPAYEAfterRelief = annualPAYEBeforeRelief - totalAnnualRelief;

  //If annual PAYE after relief is negative(indicating that the reliefs are more than the annual PAYE owed), set it to zero.
  if (annualPAYEAfterRelief < 0) {
    annualPAYEAfterRelief = 0;
  }

  return annualPAYEAfterRelief;
}


// function to calculate NHIF deductions for a year based on the NHIF rates.
function calculateNhifDeductions(monthlyBasicSalary) {
  const annualPay = monthlyBasicSalary * 12;
  let nhifDeductions = 0;

  if (annualPay >= 100000) {
    nhifDeductions = 1700;
  } else if (annualPay >= 90000) {
    nhifDeductions = 1600;
  } else if (annualPay >= 80000) {
    nhifDeductions = 1500;
  } else if (annualPay >= 70000) {
    nhifDeductions = 1400;
  } else if (annualPay >= 60000) {
    nhifDeductions = 1300;
  } else if (annualPay >= 50000) {
    nhifDeductions = 1200;
  } else if (annualPay >= 40000) {
    nhifDeductions = 1100;
  } else if (annualPay >= 35000) {
    nhifDeductions = 950;
  } else if (annualPay >= 30000) {
    nhifDeductions = 900;
  } else if (annualPay >= 25000) {
    nhifDeductions = 850;
  } else if (annualPay >= 20000) {
    nhifDeductions = 750;
  } else if (annualPay >= 15000) {
    nhifDeductions = 600;
  } else if (annualPay >= 12000) {
    nhifDeductions = 500;
  } else if (annualPay >= 8000) {
    nhifDeductions = 400;
  } else if (annualPay >= 6000) {
    nhifDeductions = 300;
  } else if (annualPay >= 0) {
    nhifDeductions = 150;
  }

  
  return nhifDeductions;
}

function calculateNssfDeductions(pensionablePay) {
  
  let annualNssfDeductions = 0;
  
  //Calculation of tier 1 NSSF payment.
  if (pensionablePay <= 6000) {
    annualNssfDeductions = pensionablePay * 0.06;
    return annualNssfDeductions;
  } 

  //If the function rolls over hear, then the pensionable amount must be > 6000 because of 
  //the isValidNumber() check on pensionablePay done when accepting the input.
  annualNssfDeductions = 6000 * 0.06;
  
  //Calculation of tier 2 NSSF payment.
  if (pensionablePay > 6000 && pensionablePay <= 18000) {
    annualNssfDeductions += (pensionablePay - 6000) * 0.06;
  }

  //Return the annual nssf deductions made.
  return annualNssfDeductions;
}


function calculateNetSalary(monthlyBasicSalary) {
  let annualPay = monthlyBasicSalary * 12;
  
  let annualPAYEAfterRelief = calculatePayeTax(monthlyBasicSalary);

  let annualNhifDeductions = calculateNhifDeductions(monthlyBasicSalary);

  let annualNssfDeductions = calculateNssfDeductions(monthlyBasicSalary);
  
  let netSalary = annualPay - annualPAYEAfterRelief - annualNssfDeductions - annualNhifDeductions;

  return netSalary;
}