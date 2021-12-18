$(onReady);
console.log('js');

let operator = '';

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
      console.log(operator); // log the selected operator to check that its right
} // end operatorSelect

function onSubmit() {
      console.log('submitting');
      //code that submits the inputs & operator to server
      //POST

            //code that refreshes DOM by showing the
            //calculated value and historical equations
}

function onClear() {
      console.log('clearing');
      //code that clears the inputs, operator, and history
      //POST
}
