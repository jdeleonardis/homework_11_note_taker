// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const shortid = require('shortid'); //new module for creating unique ids

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.port || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// test note data
// =============================================================
var notes = [
  {
    title: "test title",
    text: "Test text",
    id: "123456"
  }
];

// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.use(express.static(__dirname + '/public'));


app.get("/api/notes", function(req, res) {
   return res.json(notes);
});

app.post("/api/notes", function(req, res) {
   var newNote = req.body;
   
   let newID = shortid.generate(); 
 
   newNote.id = newID;   

   notes.push(newNote);
   res.json(notes);
});

app.delete("/api/notes/:id", function(req, res) {
   var noteID = req.params.id;

   for (i = 0; i < notes.length; i++) {
     if (noteID === notes[i].id) {
        notes.splice(i,1);
        res.json(notes);
     }
   }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
