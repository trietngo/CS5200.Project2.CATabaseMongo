// All DAO functions

const { 
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
    

} = require("./dao");

// Get All Cats Controller
const getAllCats = async () => {
    const cats = await findAllCats();
    return cats;
}

// Get Individual Cat by ID Controller
const getCatById = async (catID) => {

    const catInd = await findCatById(catID);

    return catInd;
}

// Update Cat Controller
const updateCatById = async (catID, catName, catWeight) => {

    const update = await updateCat(catID, catName, catWeight);
    return update;
}

// Create A New Cat
const insertCat = async (cat) => {
    const newCat = await createCat(cat);
    console.log("New Cat is:", newCat);
    return newCat;
}

// Get All Shelters Controller
const getAllShelters = async () => {
    const shelters = await findAllShelters();
    return shelters;
}

// Get Individual Shelter by ID Controller
const getShelterById = async (shelterID) => {
    const shelterInd = await findShelterById(shelterID);
    return shelterInd;
}

// Update Individual Shelter
const updateShelterById = async (shelterID, shelterName, shelterLocation, shelterEmail, shelterPhone) => {

    const update = await updateShelter(shelterID, shelterName, shelterLocation, shelterEmail, shelterPhone);
    //console.log("Update:", update);
    return update;
}

// Delete Individual Shelter
const deleteShelterById = async (shelterId) => {
    const deleteShelterInd = await deleteShelter(shelterId);
    return deleteShelterInd;
}

// Create Individual Shelter
const createNewShelter = async (shelterName, shelterLocation, shelterEmail, shelterPhone) => {
    const newShelter = await createShelter(shelterName, shelterLocation, shelterEmail, shelterPhone);
    return newShelter;
}

// Get All Users Controller
const getAllUsers = async () => {
    const users = await findAllUsers();
    return users;
}

// Get Individual User by ID Controller
const getUserById = async (userID) => {
    const userInd = await findUserById(userID);
    return userInd;
}

// Update individual User
const updateUserById = async (userId, userFname, userLname, userAddress, userEmail, userPhone) => {
    const update = await updateUser(userId, userFname, userLname, userAddress, userEmail, userPhone);
    console.log("Update:", update);
    return update;
}

// Delete individual user
const deleteUserById = async (userId) => {
    const deleteUserInd = await deleteUser(userId);
    return deleteUserInd;
}

// Create Individual User
const createNewUser = async (userFname, userLname, userAddress, userEmail, userPhone) => {
    const newUser = await createUser(userFname, userLname, userAddress, userEmail, userPhone);
    return newUser;
}

module.exports = {

    getAllCats,
    getCatById,
    updateCatById,
    insertCat,

    getAllShelters,
    getShelterById,
    updateShelterById,
    deleteShelterById,
    createNewShelter,

    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    createNewUser

}