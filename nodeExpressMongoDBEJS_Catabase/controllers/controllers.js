// All DAO functions

const { 
    findAllCats,
    findCatById,
    updateCat,

    findAllShelters,
    findAllUsers
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
    console.log(update);
    return update;
}


// Get All Shelters Controller
const getAllShelters = async () => {
    const shelters = await findAllShelters();
    return shelters;
}

// Get All Users Controller
const getAllUsers = async () => {
    const users = await findAllUsers();
    return users;
}

module.exports = {
    getAllCats,
    getCatById,
    updateCatById,

    getAllShelters,
    getAllUsers
}