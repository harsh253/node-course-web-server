const express = require('express');
const hbs = require('hbs'); //for dynamic html pages where the file has the extension as hbs (handlebars)
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine' , 'hbs');


app.use( (req,res,next)=>{
    var currTime = new Date().toString();
    var logger = `${currTime}: ${req.method} ${req.url}`;

    fs.appendFile('server.log' , logger + '\n', (err)=>{
        if(err){
            console.log('Unable to write to file');
        }
    });
    next();  // very important piece of code. If not written, the code stops here, because this code block is a middleware
});

// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public')); //for loading static page help.html

app.get('/', (req, res) => {
    // res.send({
    //     url: "https://www.google.co.in",    
    //     website: "Google"
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hi! Welcome to my brand new app',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/projects', (req,res) => {
    res.render('projects.hbs', {
       pageTitle : 'Projects',
       currentYear: new Date().getFullYear()
    });
});

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});