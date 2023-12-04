const mongoose = require('mongoose');

const catabaseSchema = mongoose.Schema({}, {collection: 'cats'});

module.exports = {
    catabaseSchema
}