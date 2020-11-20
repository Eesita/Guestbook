//1
var express = require("express");
var http = require("http");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");                  

//2
var app = express();

//4
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

//5
var entries = [];
app.locals.entries = entries;

//6
app.use(logger("dev"));

//7
app.use(bodyParser.urlencoded({extended: false}));

//8
app.get("/", function(request, response) {
    response.render("index");
});

//9
app.get("/new-entry", function(request, response) {
    response.render("new-entry");
});

//10
app.post("/new-entry", function(request, response) {
    if(!request.body.title || !request.body.body) {
        response.status(400).send("Entries must have a title and a body");
        return;
    }
    entries.push({
        title: request.body.title,
        content: request.body.body,
        published: new Date()
    });
    response.redirect("/");
});

//1
app.use(function(request, response) {
    response.status(404).send("This page is not available!");
});

//3
http.createServer(app).listen(3000, function() {
    console.log("Guestbook app started on port 3000");
});

/*
1. Require all the necessary modules.
2. Make an express app
3. Create http server.
4. Set the path "views" in the "views" folder.
   Set the "view engine" to "ejs".
5. Make a variable called "entries", where all the entries will be stored.
   Make the "entries" array available in all "views".   
6. Log all the request using morgan.
7. Parse the body of the http post request using body-parser.
8.
9.
10.
11.
   
*/
