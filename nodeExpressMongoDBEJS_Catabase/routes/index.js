let express = require('express');
let router = express.Router();

const {
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
} = require("../controllers/controllers");

/* GET home page. */
router.get('/', async function(req, res, next) {

  res.render('index', { title: 'Catabase - Now With MongoDB!' });
});

/* GET All Cats */
router.get('/cats', async function(req, res, next) {

  const cats = await getAllCats();

  console.log(cats);

  res.render('cats', { title: 'All Available Cats', cats });

});

/* GET Individual Cats */
router.get('/cats/:catID', async function(req, res, next) {

  const catID = req.params.catID;

  //console.log("Route Cat ID:", catID);
  const catInd = await getCatById(parseInt(catID));

  // Get all shelters
  const shelters = await getAllShelters();

  
  res.render('catInd', { title: 'Cat ID: ' + req.params.catID, catInd, shelters });
});

/* Update Individual Cats */
router.post('/cats/:catID', async function(req, res, next) {
  
  const catID = parseInt(req.body.catID);
  const catName = req.body.catName;
  const catWeightLbs = parseFloat(req.body.catWeightLbs);

  console.log("ID: ", catID);
  console.log("Name: ", catName);
  console.log("Weight: ", catWeightLbs);

  const updated = await updateCatById(catID, catName, catWeightLbs);

  res.redirect('/cats');
});

/* Create a new cat */
// router.get('/create', async function(req, res, next) {

//   const shelters = await getAllShelters();

//   res.render('catCreate', { title: 'Add a New Cat', shelters });
// });

// router.post('/create/new', async function(req, res, next) { 

  
  
//   const catName = req.body.catName;
//   const catBirthday = req.body.catBirthday;
//   const catBreed = req.body.catBreed;
//   const catPersonality = req.body.catPersonality;
//   const catWeightLbs = parseFloat(req.body.catWeightLbs);
//   const catShelter = await getShelterById(parseInt(req.body.catShelter));

//   console.log("Name: ", catName);
//   console.log("Birthday: ", catBirthday);
//   console.log("Breed: ", catBreed);
//   console.log("Personality: ", catPersonality);
//   console.log("Weight: ", catWeightLbs);
//   console.log("Shelter: ", catShelter[0]);


//   await insertCat(req.body);

//   res.redirect('/cats');
// });

/* GET All Shelters */
router.get('/shelters', async function(req, res, next) {

  const shelters = await getAllShelters();

  res.render('shelters', { title: 'All Available Shelters', shelters });

  //console.log(shelters);
});

/* GET Individual Shelters */
router.get('/shelters/:shelterID', async function(req, res, next) {

  const shelterID = req.params.shelterID;

  const shelterInd = await getShelterById(parseInt(shelterID));

  console.log(shelterInd);
  res.render('shelterInd', { title: 'Shelter ID: ' + req.params.shelterID, shelterInd });
});

/* Update Individual Shelters */
router.post('/shelters/:shelterId', async function(req, res, next) {
  
  console.log(req.body);
  
  const shelterId = parseInt(req.body.shelterId);
  const shelterName = req.body.shelterName;
  const shelterLocation = req.body.shelterLocation;
  const shelterEmail = req.body.shelterEmail;
  const shelterPhone = req.body.shelterPhone;

  console.log("ShelterId: ", shelterId);
  console.log("ShelterName: ", shelterName);
  console.log("ShelterLocation: ", shelterLocation);
  console.log("ShelterEmail: ", shelterEmail);
  console.log("ShelterPhone: ", shelterPhone);

  await updateShelterById(shelterId, shelterName, shelterLocation, shelterEmail, shelterPhone);

  const indShelter = await getShelterById(shelterId);

  res.redirect('/shelters');
});

/* Create Shelter */
router.get('/shelterCreate', async function(req, res, next) {

  res.render('shelterCreate', { title: 'Add a New Shelter' });
});

router.post('/shelterCreate/new', async function(req, res, next) { 

  console.log(req.body);
  
  const shelterName = req.body.shelterName;
  const shelterLocation = req.body.shelterLocation;
  const shelterEmail = req.body.shelterEmail;
  const shelterPhone = req.body.shelterPhone;

  console.log("Shelter Name:", shelterName)
  console.log("Shelter Location:", shelterLocation)

  await createNewShelter(shelterName, shelterLocation, shelterEmail, shelterPhone);

  res.redirect('/shelters');
});

/* Delete Individual Shelter */
router.get('/shelters/:shelterId/delete', async function(req, res, next) {

  const shelterId = parseInt(req.params.shelterId);

  await deleteShelterById(shelterId);
  res.redirect('/shelters');
});

/* GET All Users */
router.get('/users', async function(req, res, next) {

  const users = await getAllUsers();

  res.render('users', { title: 'All Available Users', users });

  //console.log(users);
});

/* GET Individual Users */
router.get('/users/:userId', async function(req, res, next) {

  const userId = req.params.userId;

  const userInd = await getUserById(parseInt(userId));

  res.render('userInd', { title: 'User ID: ' + req.params.userId, userInd });
});

/* Update Individual Users */
router.post('/users/:userId', async function(req, res, next) {  
  
  console.log(req.body);
  
  const userId = parseInt(req.body.userId);
  const userFname = req.body.userFname;
  const userLname = req.body.userLname;
  const userAddress = req.body.userAddress;
  const userEmail = req.body.userEmail;
  const userPhone = req.body.userPhone;

  console.log("UserID:", userId);
  console.log("UserFName:", userFname);
  console.log("UserLName:", userLname);
  console.log("UserAddress:", userAddress);
  console.log("UserEmail:", userEmail);
  console.log("UserPhone:", userPhone);

  await updateUserById(userId, userFname, userLname, userAddress, userEmail, userPhone);

  const userInd = await getUserById(userId);

  res.redirect('/users');
});

/* Delete Individual User */
router.get('/users/:userID/delete', async function(req, res, next) {

  const userID = parseInt(req.params.userID);

  await deleteUserById(userID);
  res.redirect('/users');
});

/* Create User */
router.get('/userCreate', async function(req, res, next) {

  res.render('userCreate', { title: 'Add a New User' });
});

router.post('/userCreate/new', async function(req, res, next) { 

  console.log(req.body);
  
  const userFname = req.body.userFname;
  const userLname = req.body.userLname;
  const userAddress = req.body.userAddress;
  const userEmail = req.body.userEmail;
  const userPhone = req.body.userPhone;

  await createNewUser(userFname, userLname, userAddress, userEmail, userPhone);

  res.redirect('/users');
});

module.exports = router;
