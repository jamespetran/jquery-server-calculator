const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

const port = 5000;
app.listen( port, ()=>{
   console.log( 'server up on:', port );
}) //end server up
