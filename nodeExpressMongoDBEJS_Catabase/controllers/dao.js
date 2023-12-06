const mongoose = require("mongoose");
const { catabaseModel, catModelLite, userModel, shelterModel } = require("./model");

// GET ALL CATS
// Note: this will return a MongoDB Document object (not JS Object) if .lean() is not used

const findAllCats = () => catabaseModel.find().lean();

// GET Individual Cat by ID
const findCatById = (catId) => catModelLite.findOne( { "cat_id": catId } ).lean();

// UPDATE Cat
const updateCat = (catId, catName, catWeight) =>
  catModelLite.findOneAndUpdate(
    {
        "cat_id": catId
    },
    {
        "cat_name": catName,
        "cat_weight_lb": catWeight,
    },
    {
      returnNewDocument: true
    }
  );

// Create a new cat
const createCat = (cat) => catabaseModel.create(cat);

// GET ALL SHELTERS
const findAllShelters = () => shelterModel.find().lean();

// GET Shelter by ID
const findShelterById = (shelterId) => shelterModel.findOne( { "shelter_id": shelterId } ).lean()

// Update Shelter by ID
const updateShelter = (shelterId, shelterName, shelterLocation, shelterEmail, shelterPhone) =>
  shelterModel.findOneAndUpdate(
    {
      "shelter_id": shelterId
    },
    {
      "shelter_name": shelterName,
      "shelter_location": shelterLocation,
      "shelter_email": shelterEmail,
      "shelter_phone": shelterPhone,
    },
    {
      returnNewDocument: true
    }
)

// Create Shelter
const createShelter = (shelterName, shelterLocation, shelterEmail, shelterPhone) => shelterModel.create({

    // Pseudo-random id, slight chance of collisions
    "shelter_id": Math.floor(Math.random() * 100000000000000) + 348957634598763,
    "shelter_name": shelterName,
    "shelter_location": shelterLocation,
    "shelter_email": shelterEmail,
    "shelter_phone": shelterPhone,
    "user_ratings": []
});

// Delete Shelter
const deleteShelter = (shelterId) => shelterModel.deleteOne({ "shelter_id": shelterId });

// GET ALL USERS
const findAllUsers = () => userModel.find().lean();

// GET Individual User by ID
const findUserById = (userId) => userModel.findOne({ "user_id": userId });

// Update Individual User by ID
const updateUser = (userId, userFname, userLname, userAddress, userEmail, userPhone) =>
  userModel.findOneAndUpdate(
    {
      "user_id": userId
    },
    {
      "user_first_name": userFname,
      "user_last_name": userLname,
      "user_address": userAddress,
      "user_email": userEmail,
      "user_phone": userPhone,
    },
    {
      returnNewDocument: true
    }
  )

// Create User
const createUser = (userFname, userLname, userAddress, userEmail, userPhone) => userModel.create({

  // Pseudo-random id, slight chance of collisions
  "user_id": Math.floor(Math.random() * 100000000000000) + 348957634598763,
  "user_first_name": userFname,
  "user_last_name": userLname,
  "user_address": userAddress,
  "user_email": userEmail,
  "user_phone": userPhone,
});


// Delete User
const deleteUser = (userId) => userModel.deleteOne({ "user_id": userId });

module.exports = {
    findAllCats,
    findCatById,
    updateCat,
    createCat,

    findAllShelters,
    findShelterById,
    updateShelter,
    deleteShelter,
    createShelter,

    findAllUsers,
    findUserById,
    updateUser,
    deleteUser,
    createUser
}