/*
 * IMPORTANT:
 * If you download this folder and would like to run it directly, simply:
 *   $ npm install      // to install any required NodeJS package listed in package.json
 *   $ node index.js    // to start the application server
 *
 *
 * If you'd like to replicate this demo, then
 *   $ npm init                                     // to start a NodeJS application
 *   $ touch index.js                               // to create a JS file for creating a NodeJS server
 *   $ npm install --save express ejs body-parser   // install Express
 *   $ mkdir views                                  // create views folder for rendering route
 *   $ node index.js                                // to start the application server
 */

/* Require external APIs and start our application instance */
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

/* Configure our server to read css folder and ejs files */
app.use(express.static('css'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

/* The handler for the DEFAULT route */
app.get("/", function(req, res){
    res.render("home");
});

/* The handler for the '/friends route */
var friends = ["Alice", "Dennis", "Michelle", "Clarke", "Bellemy", "Octavia"];
app.get("/friends", function(req, res){
	res.render("friends", {friends: friends});
});

/* The handler for the '/addfriend route */
app.post("/addfriend", function(req, res){
   var newFriend = req.body.newfriend;
   friends.push(newFriend);
   res.redirect("/friends");
});

/* The handler for undefined routes */
app.get("*", function(req, res){
   res.send("<h2 style='color: red;'> Sorry, Page not found !</h2>"); 
});

/* Start the application server */
app.listen(process.env.PORT || 3000, function(){
    console.log("Server has been started");
})