// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
  //Hide results
  document.getElementById('results').style.display = 'none';

  //Show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 200);

  e.preventDefault();
});

// Calculate Results

function calculateResults() {
  // UI var

  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value); //The parseFloat() function parses a string and returns a floating point number.
  //  We receive string by asking for amount.value
  const calculatedInterest = parseFloat(interest.value) / 100 / 12; //The value property sets or returns the value of the value attribute of a text field.


  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment

  const x = Math.pow(1 + calculatedInterest, calculatedPayments) //Returns the value of a base expression taken to a specified power.
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) { //Determines whether a supplied number is finite.
    monthlyPayment.value = monthly.toFixed(2); //The toFixed() method converts a number into a string, keeping a specified number of decimals.
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);


    // Show results
    document.getElementById('results').style.display = 'block';

    // Hide loader
    document.getElementById('loading').style.display = 'none';

  } else {
    showError('Please check your numbers');


  }

}

//Show error
function showError(error) {
  // Show results
  document.getElementById('results').style.display = 'none';

  // Hide loader
  document.getElementById('loading').style.display = 'none';

  // Create div
  const errorDiv = document.createElement('div');

  //Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //The querySelector() method returns the first element that matches a specified CSS selector(s) in the document.
  // Required. Specifies one or more CSS selectors to match the element. 


  // Add a class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to the div
  errorDiv.appendChild(document.createTextNode(error));
  /*
  HTML elements often consists of both an element node and a text node.
  
  To create a header (e.g. <h1>), you must create both an <h1> element and a text node:
  
  
  var h = document.createElement("H1")                // Create a <h1> element
  var t = document.createTextNode("Hello World");     // Create a text node
  h.appendChild(t);      
  
  */

  // Insert above heading

  card.insertBefore(errorDiv, heading); // insertBefore() method inserts a node as a child, right before an existing child, which you specify.

  // Clear error after 3 seconds

  setTimeout(clearError, 3000); //3000 ms
}

//Clear error
function clearError() {
  document.querySelector('.alert').remove();
}

