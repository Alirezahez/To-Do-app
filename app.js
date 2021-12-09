
const express = require('express')
const session = require("express-session")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
require("dotenv").config();
const bodyParser = require('body-parser')
const { exec } = require("child_process");
const chalk = require('chalk')
const mongoose = require('mongoose')
require("dotenv").config();
const port = process.env.PORT || 80
const {authRouter, todoRouter} = require('./Routers')
const app = express()
app.use(express.static("views"));
app.use(express.urlencoded());
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.listen(port, () => {
    console.log('Express Server Is Running On Port ' + port)
})
app.use(authRouter)
app.use(todoRouter)

 setTimeout(() => {

   exec("start \"\" \"http://localhost\"");

}, 500);
app.get("/", function(req, res){
    // code in here runs when the user "gets" the "/" route
    res.render("login")
   
});

// register route
app.post("/register", function(req, res) {
    console.log("Registering a new user");
    // calls a passport-local-mongoose function for registering new users
    // expect an error if the user already exists!
    User.register({username: req.body.username}, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            res.redirect("/")
        } else {
            // authenticate using passport-local
            // what is this double function syntax?! It's called currying.
            passport.authenticate("local")(req, res, function(){
                res.redirect("/welcome")
            });
        }
    });
});

// login route
app.post("/login", function(req, res) {
    console.log("A user is logging in")
    // create a user
    const user = new User ({
        username: req.body.username,
        password: req.body.password
     });
     // try to log them in
    req.login (user, function(err) {
        if (err) {
            // failure
            console.log(err);
            res.redirect("/")
        } else {
            // success
            // authenticate using passport-local
            passport.authenticate("local")(req, res, function() {
                res.redirect("/welcome"); 
            });
        }
    });
});

// This syntax does mostly the same thing, but less intuitive and not as easy to debug
// app.post('/login', passport.authenticate('local', { successRedirect: '/welcome',
//                                                      failureRedirect: '/'}));

// welcome
app.get("/welcome", function(req, res){
    console.log("A user is accessing Welcome")
    if (req.isAuthenticated()) {
        // pass the username to EJS
        res.render("welcome", {user: req.user.username});
    } else {
        res.redirect("/");
    }
});

// logout
app.get("/logout", function(req, res){
    console.log("A user logged out")
    req.logout();
    res.redirect("/");
})


//Just For Data Creation

// for (let i = 0; i < 2; i++)
//     users.push(new User())
//
// for (let i = 0; i < 5; i++)
//     tasks.push(new Task);
//
// //User1
// users[0].username = 'Chandler'
// users[0].password = "bing.com";
//
// //User2
// users[1].username = "Monica";
// users[1].password = "geller2001";
//
// // Task1
// tasks[0]._id = 1
// tasks[0].text = 'Make The Bed'
// tasks[0].state = 'Unclaimed'
// tasks[0].creator = users[0]
// tasks[0].isTaskClaimed = false
// tasks[0].claimingUser = null
// tasks[0].isTaskDone = false
// tasks[0].isTaskCleared = false
//
// //Task2
// tasks[1]._id = 2
// tasks[1].text = 'Call Rachel'
// tasks[1].state = 'Claimed'
// tasks[1].creator = users[0]
// tasks[1].isTaskClaimed = true
// tasks[1].claimingUser = users[0]
// tasks[1].isTaskDone = false
// tasks[1].isTaskCleared = false
//
// //Task3
// tasks[2]._id = 3
// tasks[2].text = 'Buy Groceries'
// tasks[2].state = 'Claimed'
// tasks[2].creator = users[0]
// tasks[2].isTaskClaimed = true
// tasks[2].claimingUser = users[1]
// tasks[2].isTaskDone = false
// tasks[2].isTaskCleared = false
//
// //Task4
// tasks[3]._id = 4
// tasks[3].text = 'Feed The Duck'
// tasks[3].state = 'Claimed'
// tasks[3].creator = users[0]
// tasks[3].isTaskClaimed = true
// tasks[3].claimingUser = users[0]
// tasks[3].isTaskDone = true
// tasks[3].isTaskCleared = false
//
// //Task5
// tasks[4]._id = 5
// tasks[4].text = 'Cook A Chicken For ThanksGiving Cermony'
// tasks[4].state = 'Claimed'
// tasks[4].creator = users[0]
// tasks[4].isTaskClaimed = true
// tasks[4].claimingUser = users[1]
// tasks[4].isTaskDone = true
// tasks[4].isTaskCleared = false

// console.log('Users: ',users);
// console.log('Tasks: ',tasks);

