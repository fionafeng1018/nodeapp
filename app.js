const express = require('express');

const app = express();

//Middlewares
app.use('/posts', ()=>{
    console.log('This is a middleware running');
});

//ROUTES
app.get('/',(req,res)=>{
    res.send("home page");
});

app.get('/posts', (req, res) => {
    res.send("posts page");
})


//Start listening to the server
app.listen(3000);

