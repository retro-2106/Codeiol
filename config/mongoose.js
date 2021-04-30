const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeiol_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MOngoDB"));

db.once('open', function(){
    console.log('Connected to DB');
});

module.exports = db;