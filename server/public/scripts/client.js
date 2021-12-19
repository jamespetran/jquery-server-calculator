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
      $('#clear').on('click', onClear); // clear display and DOM
      $('#historyButton').on('click', getHistory); //get calculator history
      $('#input-buttons .inputDisplay').on('click', displayInputs); // make calculator display work
      $('#clrHistoryButton').on('click', onClearHistory); // clear server history
      $('#delete').on('click', onDelete); // clear last value entered
      $('#history').on('click', '.calculation', onKillHistory);

}

function operatorSelect(operator) {
      // once you put the operator in, the first number is complete
      submission.firstNum = submission.input.join('');
      console.log('first number is', submission.firstNum);
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

{ // operator functions
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

}

function onSubmit() {
      console.log('submitting', submission.input);
      // submission.firstNum = $('#firstNumber').val();
      // submission.secondNum = $('#secondNumber').val();
      submission.secondNum =
            submission.input //total input in array form
                  .slice(submission.firstNum.length + 1) // starting at X index
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

      // getHistory()
      clearInputs();
      $('#answer').text('Enter your equation above')


      // clear outputs 
      //$('#history').empty(); // blanking out the historical display of equations
      //$('#answer').empty(); // blanking out the latest answer
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
            if (response.history.length === 0) {
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
                        submission.input.pop(); // removes previous operator from input array
                        operatorSelect(inputted); // assigns new operator to submission.operator property
                        prevOperator = true; // sets true prevOperator flag
                        hasOperator = true; // sets true hasOperator flag

                  } else { //if trying to enter 2 operators...ergo 3 numbers... cannot process 
                        alert("This calculator can only handle two numbers for now! Sorry!")
                        return
                  }

            } else {
                  //if doesn't have operator:
                  if (submission.input.length === 0) { // if you're trying to put an operator as the first value:
                        alert("You need to enter a number first!");
                        return
                  } else { // if the operator is not the first value that is entered:
                        operatorSelect(inputted); // assigns operator to object
                        hasOperator = true; // sets true hasOperator flag
                        prevOperator = true;// sets true prevOperator flag
                  }
            }
      } else { //if button pushed is not an operator
            prevOperator = false; // sets false prevOperator flag
      }
      submission.input.push(inputted); //pushes the clicked button's value to submission.input array
      // console.log(submission.input);
      $('#display').val(submission.input.join(''));
}

function onClearHistory() {
      console.log('in onClearHistory');
      if (confirm('Are you sure you want to clear all history?')) {
            console.log('clearing history...');
            $.ajax({
                  type: 'DELETE',
                  url: '/history',
            }).then(() => {
                  getHistory();
                  $('#answer').text('Enter your equation above')
                  console.log('history cleared');
            }).catch((err) => {
                  alert('Error clearing history. Try again later.');
                  console.log(err);
            })

      } else {
            console.log('history not cleared');
      }
}
function onDelete() {
      console.log('in onDelete');
      let deletedValue = submission.input.pop()
      if (deletedValue === '+' || 
          deletedValue === '-' || 
          deletedValue === 'X' || 
          deletedValue === '÷') { // if the deleted value was an operator:
            submission.operator = '';
            prevOperator = false; // no longer has an operator
            hasOperator = false; // no longer has an operator
      }
      $('#display').val(submission.input.join('')); // clears out calculator display

}

function onKillHistory() {
      let index = { 
            index: $(this).data('index')
      };
      console.log('deleting this one:',index);
      $.ajax({
            type: 'DELETE',
            url: '/individual',
            data: index
      }).then(() => {
            getHistory();
            $('#answer').text('Enter your equation above')
            console.log('item cleared');
      }).catch((err) => {
            alert('Error clearing item. Try again later.');
            console.log(err);
      })
}