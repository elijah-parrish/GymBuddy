// Eventually add update and delete

const router = require('express').Router(); 
let Exercise = require('../models/exercise.model'); // The mongoose model

// The first route,  handles get requests on the user route
router.route('/').get((req, res) => {
    Exercise.find() // a mongoose method, will give all users from the db
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Second route, handles a post request to create a new user
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username, 
        description,
        duration,
        date
    });

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => { // The :id is a 'variable'
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => { 
    Exercise.findByIdAndDelete(req.params.id)
        .then(exercise => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//TODO refactor so that you can send only one item
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated.'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;