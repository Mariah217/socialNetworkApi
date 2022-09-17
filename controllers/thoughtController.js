const { Thought, User } = require('../models');

module.exports = {
    //Get all thoughts
    getAllThoughts(req, res){
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    //Get a single thought
    getSingleThought(req, res){
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    //Create a new thought
    createThought(req, res){
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    //Update a thought
    updateThought(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtID },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought)=>
            !thought
            ? res.status(404).json({ message: 'No thought found with this ID'})
            : res.json(thought)
            )
            .catch((err)=>{
                console.log(err);
                res.status(500).json(err);
            });
    },
    //Delete a thought by id
    deleteThought(req, res){
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought)=>
            !thought
            ? res.status(404).json({ message: 'No thought found with that ID'})
            : res.json({ message: 'Thought has successfully been deleted!'})
            )
            .catch((err)=> res.status(500).json(err));
    },
    //Create a new reaction
    addReaction(req, res){

    },

    //Delete a reaction
    deleteReaction(req, res){

    }
}