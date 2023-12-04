const mongoose = require('mongoose');
const { catabaseSchema } = require("./schema")

const catabaseModel = mongoose.model("Cats", catabaseSchema);

module.exports = {
    catabaseModel
}