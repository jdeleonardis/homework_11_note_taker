const util = require('util');
const fs = require('fs');
const shortid = require('shortid'); //new module for creating unique ids

const readData = util.promisify(fs.readFile);
const writeData = util.promisify(fs.writeFile);

class FileOps {

    getExistingNotes(){
        
        return readData("db/db.json", "utf8").then (function(notes) {  
             let parsedNotes = JSON.parse(notes); //passing notes and converting it to a json object
             return parsedNotes;
        });
    }
   
    addNewNote(note){        
        const newID = shortid.generate(); //get a unique id with the shortid module
        const newNote = {title: note.title, text: note.text, id: newID}; //build a new note object with the note passed in,
                                                                         //plus a unique id        
        return this.getExistingNotes()
        //.then (notes => console.log(notes));
        .then (function(notes) {
            notes.push(newNote);
            return notes;
        })        
        .then (function(writeNote) {
            return writeData("db/db.json", JSON.stringify(writeNote));
        })        
        .then (function(data){
            return newNote
        })
    }

    removeNote(id){

        return this.getExistingNotes()

        .then (function(allNotes){
            //console.log(allNotes)
            return allNotes.filter(function (note) {      
                return note.id !== id
                });
            })        


        .then(function(filterNotes) {
            return writeData("db/db.json", JSON.stringify(filterNotes));
        });        
    }
    
}



module.exports = new FileOps();


