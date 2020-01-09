// Eventually add update and delete 

const router = require('express').Router(); 
let User = require('../models/user.model'); // The mongoose model

// The first route,  handles get requests on the user route
router.route('/').get((req, res) => {
    User.find() // a mongoose method, will give all users from the db
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Second route, handles a post request to create a new user
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({username});
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;