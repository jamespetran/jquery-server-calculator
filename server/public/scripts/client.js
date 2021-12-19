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

      getHistory(); // refresh DOM on page load

      // event handlers
      $('.submit').on('click', onSubmit); //make the equals sign work
      $('.clear').on('click', onClear); // clear display and DOM
      $('#historyButton').on('click', getHistory); //get calculator history
      $('#input-buttons .inputDisplay').on('click', displayInputs); // make calculator display work
      // clear server history
}

function operatorSelect(operator) {
      // once you put the operator in, the first number is complete
      submission.firstNum = submission.input.join(''); 
      console.log('first number is',submission.firstNum);
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
      console.log('submitting',submission.input);
      // submission.firstNum = $('#firstNumber').val();
      // submission.secondNum = $('#secondNumber').val();
      submission.secondNum = 
            submission.input //total input in array form
                  .slice(submission.firstNum.length+1) // starting at X index
                  .join('');  // and turned into a string

      console.log('the second number is', submission.secondNum);

      if (submission.firstNum === '' || 
            submission.secondNum === '' ||
            submission.operator === '') {
                  alert('Needs 2 numbers separated by an operator to submit');
                  return;
            }


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
            console.log(response.history);
            if ( response.history.length === 0) {
                  return //if there is no history, (like after server restarts...) then return
            }
            //append to DOM
            let calculations = response.history;
            for (let i = 0; i < calculations.length; i++) {
                  let calculation = calculations[i];
                  history.prepend(`
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
                        hasOperator = true; // sets true hasOperator flag

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
      } else { //if button pushed is not an operator
            prevOperator = false;
      }
      submission.input.push(inputted);
      // console.log(submission.input);
      $('#display').val(submission.input.join(''));
}