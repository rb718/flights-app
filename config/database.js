//Import the mongoose module
const mongoose = require('mongoose');
const mongo_host = "localhost"
const mongo_port = "49153"
const mongo_db = "flights"
//Set up default mongoose connection
// const mongoDB = `mongodb://${mongo_host}:${mongo_port}/${mongo_db}`;
const mongoDB = `mongodb+srv://flights:flights@cluster0.4wujk.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose.connection;