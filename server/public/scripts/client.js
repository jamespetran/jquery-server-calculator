$(onReady);
console.log('js');

let operator = '';
let submission = {
      firstNum: '',
      operator: '',
      secondNum: '',
}
let display=""; // for displaying the calculator input

function onReady() {
      console.log('jq');
      $('.operator').on('click', operatorSelect);
      $('.submit').on('click', onSubmit);
      $('.clear').on('click', onClear);
      $('#historyButton').on('click', getHistory);
      // getHistory(); // refresh DOM on page load

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
      } else { console.log("something went wrong"); }
      return;

} // end operatorSelect

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
      }).then( (response)=> {
            clearInputs();
            getHistory();
      }).catch( (err) => {
            alert( 'Error submitting calculation. Try again later.' );
            console.log( err );
     
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

function plus() {
      let operator = "plus";
      console.log(operator);
      submission.operator = operator;
}
function minus() {
      let operator = "minus";
      console.log(operator);
      submission.operator = operator;
}
function multiply() {
      let operator = "multiply";
      console.log(operator);
      submission.operator = operator;
}
function divide() {
      let operator = "divide";
      console.log(operator);
      submission.operator = operator;
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
                  calculations[calculations.length-1].input +
                  ` = ` +
                  calculations[calculations.length-1].result
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
      submission.operator = ''; // zeroing out the storage inputs & submission object



}