$(onReady);
console.log('js');

let operator = '';

function onReady() {
      console.log('jq');
      $('.operator').on('click', operatorSelect);
}

function operatorSelect() {
      operator = $(this).text(); //set operator to the text of the button, +,-,X,÷
      $('#calculator button').removeClass("selected"); //blank out all blacked out buttons
      $(this).addClass("selected"); // set button to black to show it is selected
      console.log(operator); // log the selected operator to check that its right
} // end operatorSelect


