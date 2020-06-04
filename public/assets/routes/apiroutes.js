const FileOps = require('../js/fileops');

module.exports = function(app) {
    //gets all notes
    app.get("/api/notes", function(req, res) {
        // return res.json(notes);  
        FileOps.getExistingNotes() //file gets read here, and the data in the file comes back in res.json(note)
            .then(function(note) {
                res.json(note)
            })  
            .catch((err) => res.status(500).json(err));      
    });

    //adds a new note
    app.post("/api/notes", function(req, res) {
        FileOps.addNewNote(req.body)
            .then(function(note) {  //similar to the 'read' above, but the update is happening in fileops too.
                res.json(note)
            })
            .catch((err) => res.status(500).json(err));
    });

    //deletes a note by id
    app.delete("/api/notes/:id", function(req, res) {
        FileOps.removeNote(req.params.id)
            .then(function() {
                res.sendStatus(200)  //note has been deleted
            })  
            .catch((err) => 
            console.log(err));
    });
}
