const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser =  require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());

//Middlewares example
// app.use('/posts', () => {
//     console.log('This is a middleware running');
// });

//Import Routes
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);


//ROUTES
app.get('/', (req, res) => {
    res.send("home page");
});
//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,  
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("connected to DB!")
);

//Start listening to the server
app.listen(3000);