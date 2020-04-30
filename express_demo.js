// Express.js Tutorial: Build RESTful APIs with Node and Express

const Joi = require('joi');//code validation for Node.js and Express
const express = require('express');
const app = express();

app.use(express.json());


const courses = [
    {
        id: 1,
        name: 'course1'
    },
    {
        id: 2,
        name: 'course2'
    },
    {
        id: 3,
        name: 'course3'
    }
]

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

app.get('/', (req, res) => {
    res.send('Hello world');
});

//define another route to get all the courses
app.get('/api/courses', (req,res) =>{
    res.send(courses);
});

app.get('/api/posts/:year/:month', (req, res)=>{
    //res.send(req.params);
    res.send(req.query);
});

//handling GET request
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');
    res.send(course);
});

//handling POST request
app.post('/api/courses', (req,res)=>{
    const { error } = validateCourse(req.body); // Object destructuring, add the property of the target object in the {}  
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length +1,
        name:req.body.name
    }

    courses.push(course);
    res.send(course);
})

//Handling PUT request: Update
app.put('/api/courses/:id',(req,res)=>{
    //Look up the course
    //If not existing, return 404
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');
    
    //validate 
    //if invalid, return 400 - bad request
    const { error } = validateCourse(req.body); // Object destructuring, add the property of the target object in the {}  
    if (error) return res.status(400).send(error.details[0].message);

    //Update course
    //Return the updated course
     course.name = req.body.name;
     res.send(course);

})

//Handling DELETE request
app.delete('/api/courses/:id',(req,res)=>{
    //Look up the course
    //Not existing, return 404
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');
    
    //Delete
    const index = courses.indexOf(course);
    courses.splice(index,1);

    //Reuturen the same course
    res.send(course);

})

//using environment variable
//PORT
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}...`));

