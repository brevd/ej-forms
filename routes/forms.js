var express = require('express');
var router = express.Router();

//Require controller modules
var tentative_controller = require('../controllers/tentativeController');
var unavoidable_controller = require('../controllers/unavoidableController');

/// INDEX ROUTE ///

router.get('/', (req, res, next) => {
    res.render('index', {title: 'Forms'});
});

/// TENTATIVE ROUTES ///

//display all tentative forms
router.get('/tentative', tentative_controller.tentative_list);
//display specific tentative form
router.get('tentative/:id', tentative_controller.tentative_detail);
//display create form
router.get('/tentative/create', tentative_controller.tentative_create_get);
//handle create form
router.post('/tentative/create', tentative_controller.tentative_create_post);

/// UNAVOIDABLE ROUTES ///

//display all unavoidable forms
router.get('/unavoidable', unavoidable_controller.unavoidable_list);
//display specific unavoidable form
router.get('/unavoidable/:id', unavoidable_controller.unavoidable_detail);
//display create form
router.get('/unavoidable/create', unavoidable_controller.unavoidable_create_get);
//handle create form
router.post('/unavoidable/create', unavoidable_controller.unavoidable_create_post);

module.exports = router;