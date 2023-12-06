const mongoose = require('mongoose');
const { catabaseSchema, catSchemaLite, userSchema, shelterSchema } = require("./schema")

const catabaseModel = mongoose.model("Cats", catabaseSchema);

const catModelLite = mongoose.model("CatsLite", catSchemaLite)

const userModel = mongoose.model("Users", userSchema);

const shelterModel = mongoose.model("Shelters", shelterSchema);

module.exports = {
    catabaseModel,
    catModelLite,
    userModel,
    shelterModel
}