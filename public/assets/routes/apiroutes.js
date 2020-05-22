const FileOps = require('../js/fileops');

module.exports = function(app) {
    //gets all notes
    app.get("/api/notes", function(req, res) {
        // return res.json(notes);  
        FileOps.getNotes()
            .then((note) => res.json(note))  //JSON.parse reads file and conerts JSON to array of objects. then "res.send" sends info to broswer
            .catch((err) => res.status(500).json(err));      
    });

    //adds a new note
    app.post("/api/notes", function(req, res) {
        FileOps.addNote(req.body)
            .then((note) => res.json(note))
            .catch((err) => res.status(500).json(err));
    });

    //deletes a note by id
    app.delete("/api/notes/:id", function(req, res) {
        FileOps.removeNote(req.params.id)
            .then(() => res.sendStatus(200))          //the broswer has removed note or ok: true
            .catch((err) => 
            console.log(err));
    });
}
