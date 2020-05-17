const util = require('util');
const fs = require('fs');
const shortid = require('shortid'); //new module for creating unique ids

const readData = util.promisify(fs.readFile);
const writeData = util.promisify(fs.writeFile);

class FileOps {
    read() {
        return readData("db/db.json", "utf8");
    }
    write(note){
        return writeData("db/db.json", JSON.stringify(note));
    }
    getNotes(){
        
        return this.read()     //LOTS OF RETURNS
        .then (notes => {       //WHAT IS NOTES?  - returned value from this.read, but????
             let parsedNotes = JSON.parse(notes); //passing notes and converting it to a json object
             return parsedNotes;
        });
    }
   
    addNote(note){
        const {title, text} = note; //object destructuring of the note passed in
        const newID = shortid.generate(); //get a unique id
        const newNote = {title, text, id: newID}; //build a new note object
        return this.getNotes()
        //.then (notes => console.log(notes));
        .then (notes => {
            notes.push(newNote);
            return notes;
        })        
        .then (writeNote => {
            return this.write(writeNote)
        })
        .then (() => newNote)
    }

    removeNote(id){

        return this.getNotes()

        .then ((allNotes) => {
            //console.log(allNotes)
            return allNotes.filter(function (note) {      
                return note.id !== id
                });
            })        

        // .then(filterNotes => this.write(filterNotes));
        .then(filterNotes => {
            return this.write(filterNotes)
        });        
    }
    
}



module.exports = new FileOps();  //THIS WAS AN ACCIDENT.  GENERATING A NEW INSTANCE OF FILEOPS, BUT???  Only one instance?


