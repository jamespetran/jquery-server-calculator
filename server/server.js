const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

const port = 5000;
app.listen(port, () => {
   console.log('server up on:', port);
}) //end server up

//variables
let calculations = {
   history: [],
   
};
let receivedInputs = {}


// // end points & routing
app.get('/history', (req, res) => {
   console.log('in /history GET');
   res.send(calculations);
});// end GET history

app.post('/calculate', (req, res) => {
   console.log('in /calculate POST:', req.body);
   receivedInputs = req.body;
   let operator = receivedInputs.operator;
   if ( operator === 'plus'){
      plus();
   } else if (operator === 'minus') {
      minus();
   } else if (operator === 'multiply') {
      multiply();
   } else if (operator === 'divide') {
      divide();
   }

   res.sendStatus(200);
}) // end messages POST



function plus() {
   let string =
      receivedInputs.firstNum + 
      "+" + 
      receivedInputs.secondNum;
   let answer =
      Number(receivedInputs.firstNum)+ 
      Number(receivedInputs.secondNum);
   let equation = {
      input: string,
      result: answer
   };
   calculations.history.push(equation);
   console.log(calculations.history[calculations.history.length-1]);
}

function minus() {
   let string =
      receivedInputs.firstNum + 
      "-" + 
      receivedInputs.secondNum;
   let answer =
      Number(receivedInputs.firstNum)-
      Number(receivedInputs.secondNum);
   let equation = {
      input: string,
      result: answer
   };
   calculations.history.push(equation);
   console.log(calculations.history[calculations.history.length-1]);
}
function multiply() {
   let string =
      receivedInputs.firstNum + 
      "*" + 
      receivedInputs.secondNum;
   let answer =
      Number(receivedInputs.firstNum)*
      Number(receivedInputs.secondNum);
   let equation = {
      input: string,
      result: answer
   };
   calculations.history.push(equation);
   console.log(calculations.history[calculations.history.length-1]);
}
function divide() {
   let string =
      receivedInputs.firstNum + 
      "/" + 
      receivedInputs.secondNum;
   let answer =
      Number(receivedInputs.firstNum)/
      Number(receivedInputs.secondNum);
   let equation = {
      input: string,
      result: answer
   };
   calculations.history.push(equation);
   console.log(calculations.history[calculations.history.length-1]);
}