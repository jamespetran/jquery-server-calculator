$(onReady);
console.log('js');

let operator = '';
let submission = {
      firstNum: '',
      operator: '',
      secondNum: '',
}

function onReady() {
      console.log('jq');
      $('.operator').on('click', operatorSelect);
      $('.submit').on('click', onSubmit);
      $('.clear').on('click', onClear);
      $('#historyButton').on('click', getHistory);

}

function operatorSelect() {
      operator = $(this).text(); //set operator to the text of the button, +,-,X,÷
      $('#calculator button').removeClass("selected"); //clear selected operator
      $(this).addClass("selected"); // set (this) button to black to show it is selected
      // console.log(operator); // log the selected operator to check that its right
      if (operator === "+") {
            plus();
      } else if (operator === "-") {
            minus();
      } else if (operator === "X") {
            multiply();
      } else if (operator === "÷") {
            divide();
      } else {console.log("something went wrong");}
      return;

} // end operatorSelect

function onSubmit() {
      console.log('submitting');
      submission.firstNum = $('#firstNumber').val();
      submission.secondNum = $('#secondNumber').val();

      
      //code that submits the inputs & operator to server
      //POST submission
      // endpoint: /calculate

            //code that refreshes DOM by showing the
            //calculated value and historical equations
      getHistory();
}

function onClear() {
      console.log('clearing');
      //code that clears the inputs, operator, and history
      $('#calculator button').removeClass("selected"); //clear selected operator
      $('#firstNumber').val('');
      $('#secondNumber').val('');
      operator = '';
      submission.firstNum='';
      submission.secondNum='';
      submission.operator=''; // zeroing out the storage inputs & submission object
      $('#history').text(''); // blanking out the historical display of equations


      //POST to clear history
      // endpoint: /clear
      
            //code that refreshes DOM by showing the
            //calculated value and historical equations
      getHistory();

}

function plus() {
      let operator="plus";
      console.log(operator);
      submission.operator = operator;
}
function minus() {
      let operator="minus";
      console.log(operator);
      submission.operator = operator;
}
function multiply() {
      let operator="multiply";
      console.log(operator);
      submission.operator = operator;
}
function divide() {
      let operator="divide";
      console.log(operator);
      submission.operator = operator;
}

function getHistory() {
      console.log('get history');
      //ajax that GETs history from server
      // endpoint: /history
      //and appends to DOM

}