const mongoose = require('mongoose');

const catabaseSchema = new mongoose.Schema({
    cat_id: { type: Number, required: true, unique: true},
    cat_name: String,
    cat_dob: String,
    cat_weight_lb: Number,
    cat_breed: String,
    cat_personality: String,

    shelter: {
        shelter_id: { type: Number, required: true, unique: true},
        shelter_name: String,
        shelter_location: String,
        shelter_email: String,
        shelter_phone: String,
        user_ratings: [
            {
                user_id: { type: Number, required: true, unique: true},
                user_first_name: String,
                user_last_name: String,
                user_address: String,
                user_email: String,
                user_phone: String,
                rating_score: Number,
            }
        ]
    },

    adoption_details: [
        {
            user_id: { type: Number, required: true, unique: true},
            // user_first_name: String,
            // user_last_name: String,
            // user_address: String,
            // user_email: String,
            // user_phone: String,
            adoption_approved: Boolean
        }
    ]

}, {collection: 'cats'});

// Lite Schema for cats, referencing shelter_id, and without adoption details
const catSchemaLite = new mongoose.Schema({
    cat_id: { type: Number, required: true, unique: true },
    cat_name: String,
    cat_dob: String,
    cat_weight_lb: Number,
    cat_breed: String,
    cat_personality: String,
    shelter_id: { type: Number, required: true, unique: true },
    shelter_name: String

}, {collection: 'cats'});

const userSchema = new mongoose.Schema({
    user_id: { type: Number, required: true, unique: true},
    user_first_name: String,
    user_last_name: String,
    user_address: String,
    user_email: String,
    user_phone: String,

}, {collection: 'users'});

const shelterSchema = new mongoose.Schema({
    shelter_id: { type: Number, required: true, unique: true, auto: true},
    shelter_name: String,
    shelter_location: String,
    shelter_email: String,
    shelter_phone: String,
    users_rating: Array
    
}, {collection: 'shelters'});

module.exports = {
    catabaseSchema,
    catSchemaLite,
    userSchema,
    shelterSchema
}