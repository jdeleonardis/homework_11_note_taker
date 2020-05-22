const path = require('path');

module.exports = function (app) {

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../../index.html"));
    });
    // routes user to notes
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../../notes.html"));
    });

    // If no matching route is found default to home
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, '../../index.html'));
    });
}