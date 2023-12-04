const { catabaseModel } = require("./model");

// GET ALL CATS
// Note: this will return a MongoDB Document object (not JS Object) if .lean() is not used
const findAllCats = () => catabaseModel.find().lean();

// GET Individual Cat by ID
const findCatById = (catId) => catabaseModel.findOne( { "cat_id": catId } ).lean();

// UPDATE Cat
const updateCat = (catId, catName, catWeight) =>
  catabaseModel.updateOne(
    {
        'cat_id': catId
    },
    {
        $set: {
            'cat_name': catName,
            'cat_weight_lb': catWeight
        }
    }
);


// GET ALL SHELTERS
const findAllShelters = () => catabaseModel.aggregate(
    [
      {
        $group: {
          _id: {
            shelter_id: '$shelter.shelter_id'
          },
          shelter: { $min: '$shelter' }
        }
      },
      {
        $project: {
          _id: 0,
          'shelter.user_ratings': 0
        }
      },
      { $replaceRoot: { newRoot: '$shelter' } },
      { $sort: { shelter_id: 1 } }
    ],
    { maxTimeMS: 60000, allowDiskUse: true }
);

// GET ALL USERS
const findAllUsers = () => catabaseModel.aggregate(
    [
      { $unwind: { path: '$adoption_details' } },
      {
        $group: {
          _id: {
            userID: '$adoption_details.user_id'
          },
          user: { $min: '$adoption_details' }
        }
      },
      {
        $project: {
          _id: 0,
          'user.adoption_approved': 0
        }
      },
      { $replaceRoot: { newRoot: '$user' } },
      { $sort: { user_id: 1 }},
    ],
    { maxTimeMS: 60000, allowDiskUse: true }
);

module.exports = {
    findAllCats,
    findCatById,
    updateCat,

    findAllShelters,

    findAllUsers
}