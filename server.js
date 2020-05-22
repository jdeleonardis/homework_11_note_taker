// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

//const FileOps = require('./public/assets/js/fileops');
// Sets up the Express App
// =============================================================
const app = express();
let PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//static files (CSS)
app.use(express.static(__dirname + '/public'));

//routes
require("./public/assets/routes/apiroutes")(app);
require("./public/assets/routes/htmlroutes")(app);

// Routes
// =============================================================
// routes user to index
// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "/public/index.html"));
// });
// // routes user to notes
// app.get("/notes", function(req, res) {
//   res.sendFile(path.join(__dirname, "/public/notes.html"));
// });



// //gets all notes
// app.get("/api/notes", function(req, res) {
//     // return res.json(notes);  
//     FileOps.getNotes()
//         .then((note) => res.json(note))  //JSON.parse reads file and conerts JSON to array of objects. then "res.send" sends info to broswer
//         .catch((err) => res.status(500).json(err));      
// });

// //adds a new note
// app.post("/api/notes", function(req, res) {
//     FileOps.addNote(req.body)
//         .then((note) => res.json(note))
//         .catch((err) => res.status(500).json(err));
// });

// //deletes a note by id
// app.delete("/api/notes/:id", function(req, res) {
//     FileOps.removeNote(req.params.id)
//         .then(() => res.sendStatus(200))          //the broswer has removed note or ok: true
//         .catch((err) => 
//         console.log(err));
// });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});