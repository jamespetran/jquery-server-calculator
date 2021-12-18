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

}

function operatorSelect() {
      operator = $(this).text(); //set operator to the text of the button, +,-,X,÷
      $('#calculator button').removeClass("selected"); //blank out all blacked out buttons
      $(this).addClass("selected"); // set button to black to show it is selected
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
      //POST

            //code that refreshes DOM by showing the
            //calculated value and historical equations
}

function onClear() {
      console.log('clearing');
      //code that clears the inputs, operator, and history
      $('#calculator button').removeClass("selected"); //blank out all blacked out buttons
      $('#firstNumber').val('');
      $('#secondNumber').val('');
      operator = '';
      submission.firstNum='';
      submission.secondNum='';
      submission.operator=''; // zeroing out the storage inputs & submission object
      $('#history').text(''); // blanking out the historical display of equations


      //POST
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