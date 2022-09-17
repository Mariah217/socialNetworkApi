const { User, Application } = require('../models');

module.exports = {
  // Get all users
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //Update a user
  updateUser(req,res){
    User.findOneAndUpdate(
        {_id: req.params.userId},
        {$set: req.body},
        {runValidators: true, new: true}
    )
    .then((user) =>
    !user
    ? res.status(404).json({'No user found with this ID'})
    :res.json(user)
    )
    .catch((err)=> {
        console.log(err);
        res.status(500).json(err);
    });
},
  // Delete a user and associated apps
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with that ID' })
          : Application.deleteMany({ _id: { $in: user.applications } })
      )
      .then(() => res.json({ message: 'User and associated apps have been deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
};
