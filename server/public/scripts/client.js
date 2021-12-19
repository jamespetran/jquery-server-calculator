$(onReady);
console.log('js');

let prevOperator = false;
let hasOperator = false;
let operator = '';
let submission = {
      firstNum: '',
      operator: '',
      secondNum: '',
      input: [],
}
let display = ""; // for displaying the calculator input

function onReady() {
      console.log('jq');
      // $('.operator').on('click', operatorSelect);
      $('.submit').on('click', onSubmit);
      $('.clear').on('click', onClear);
      $('#historyButton').on('click', getHistory);
      // getHistory(); // refresh DOM on page load
      $('#input-buttons .inputDisplay').on('click', displayInputs)
}

function operatorSelect(operator) {
      if (operator === "+") {
            plus();
      } else if (operator === "-") {
            minus();
      } else if (operator === "X") {
            multiply();
      } else if (operator === "÷") {
            divide();
      } else { console.log("something went wrong"); }
      return;

} // end operatorSelect

function plus() {
      submission.operator = "plus";
      console.log(submission.operator);
}
function minus() {
      submission.operator = "minus";
      console.log(submission.operator);
}
function multiply() {
      submission.operator = "multiply";
      console.log(submission.operator);
}
function divide() {
      submission.operator = "divide";
      console.log(submission.operator);
}

function onSubmit() {
      console.log('submitting');
      submission.firstNum = $('#firstNumber').val();
      submission.secondNum = $('#secondNumber').val();



      //code that submits the inputs & operator to server
      //POST submission
      // endpoint: /calculate
      $.ajax({
            type: 'POST',
            url: '/calculate',
            data: submission
      }).then((response) => {
            clearInputs();
            getHistory();
      }).catch((err) => {
            alert('Error submitting calculation. Try again later.');
            console.log(err);

      })



      //code that refreshes DOM by showing the
      //calculated value and historical equations
      getHistory();
}

function onClear() {
      console.log('clearing');

      //POST to clear history
      /******************************** need to add a post thing here */
      // endpoint: /clear

      // getHistory()
      clearInputs();

      // clear outputs 
      $('#history').empty(); // blanking out the historical display of equations
      $('#answer').empty(); // blanking out the latest answer
}

function getHistory() {
      console.log('get history');
      //ajax that GETs history from server
      // endpoint: /history
      //and appends to DOM
      $.ajax({
            type: 'GET',
            url: '/history'
      }).then((response) => {
            let history = $('#history');
            history.empty();

            //append to DOM
            let calculations = response.history;
            for (let i = 0; i < calculations.length; i++) {
                  let calculation = calculations[i];
                  history.append(`
                  <p class="calculation" data-index="${i}">
                  <span>${calculation.input}</span>
                  = ${calculation.result}</p>`)
            } // end for

            // append latest answer to DOM
            $('#answer').text(
                  calculations[calculations.length - 1].input +
                  ` = ` +
                  calculations[calculations.length - 1].result
            );
      }).catch((err) => {
            alert('Unable to get calculations. Try again later.');
            console.log(err);
      })


}

function clearInputs() {
      $('#calculator button').removeClass("selected"); //clear selected operator
      $('#firstNumber').val('');
      $('#secondNumber').val('');
      operator = '';
      submission.firstNum = '';
      submission.secondNum = '';
      submission.input = [];
      submission.operator = ''; // zeroing out the storage inputs & submission object
      $('#display').val(submission.input.join('')); // clears out calculator display
      
      //reset flags
      prevOperator = false;
      hasOperator = false;

}

function displayInputs() {
      console.log('in displayInputs'); // in function
      const inputted = $(this).text(); //grab text from the button pushed
      if ($(this).attr("class").includes("operator")) { //if button is operator: special case
            if (hasOperator) { //if already has operator:
                  if (prevOperator) { //if changing the operator just entered:
                        submission.input.pop(); // removes previous operator
                        operatorSelect(inputted); // assigns operator to object
                        prevOperator = true;

                  } else { //if trying to enter 2 operators...ergo 3 numbers... cannot process 
                        alert("This calculator can only handle two numbers for now! sorry!")
                        return
                  }
                  
            } else {
                  //if doesn't have operator:
                  operatorSelect(inputted); // assigns operator to object
                  hasOperator = true; // sets true hasOperator flag
                  prevOperator = true;
            }
      } else { //if not an operator, the set flag for not an operator
            prevOperator = false;
      }
      submission.input.push(inputted);
      console.log(submission.input);
      $('#display').val(submission.input.join(''));
}