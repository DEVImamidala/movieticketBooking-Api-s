const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authController = require('./route/authroute');
const userController = require('./route/userroute');


app.use(bodyParser.json());
app.use('/',authController);
app.use('/apiuser',userController);
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
    });