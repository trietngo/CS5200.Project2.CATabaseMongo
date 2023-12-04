let express = require('express');
let router = express.Router();

const {
  getAllCats,
  getCatById,
  updateCatById,

  getAllShelters,
  getAllUsers
} = require("../controllers/controllers");

/* GET home page. */
router.get('/', async function(req, res, next) {

  res.render('index', { title: 'Catabase - Now With MongoDB!' });
});

/* GET All Cats */
router.get('/cats', async function(req, res, next) {

  const cats = await getAllCats();

  res.render('cats', { title: 'All Available Cats', cats });

  //console.log(cats);
});

/* GET Individual Cats */
router.get('/cats/:catID', async function(req, res, next) {

  const catID = req.params.catID;

  //console.log("Route Cat ID:", catID);
  const catInd = await getCatById(parseInt(catID));

  //console.log(catInd);
  res.render('catInd', { title: 'Cat ID: ' + req.params.catID, catInd });
});

/* Update Individual Cats */
router.post('/cats/:catID', async function(req, res, next) {  
  
  const catID = parseInt(req.body.catID);
  const catName = req.body.catName;
  const catWeightLbs = parseFloat(req.body.catWeightLbs);

  console.log("ID: ", catID);
  console.log("Name: ", catName);
  console.log("Weight: ", catWeightLbs);

  await updateCatById(catID, catName, catWeightLbs);

  const catInd = await getCatById(catID);

  console.log(catInd);

  res.redirect('/cats');
});

/* GET All Shelters */
router.get('/shelters', async function(req, res, next) {

  const shelters = await getAllShelters();

  res.render('shelters', { title: 'All Available Shelters', shelters });

  console.log(shelters);
});

/* GET All Users */
router.get('/users', async function(req, res, next) {

  const users = await getAllUsers();

  res.render('users', { title: 'All Available Users', users });

  console.log(users);
});

module.exports = router;
