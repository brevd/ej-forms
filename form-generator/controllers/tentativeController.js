const { body, validationResult } = require("express-validator");
const moment = require('moment');

//Display all tentative dates forms
exports.tentative_list = (req, res) => {
    res.send('NOT IMPLETMENTED: display list of tentative dates');
}
//Display details of a particular tentative dates form
exports.tentative_detail = (req, res) => {
    res.send('NOT IMPLEMENTED: display tentative form detail for ' + req.params.id);
}
//Display tentative create form on get
exports.tentative_create_get = (req, res) => {
    res.render('tentative_form', { title: 'Create New Tentative Form' })
}
//Handle tentative create on post
exports.tentative_create_post = [
    // Validate and sanitize the name field.
    body('customer_name', 'Customer name required').trim().isLength({ min: 1 }).escape(),
    // Validate and sanitize the address field.
    body('address', 'Address required').trim().isLength({min: 5}).escape(),
    // Validate original date as a date
    body('previous_date', 'Must choose a previous date').isDate(),
    // Validate original date is far enough out to extend
    body('previous_date', 'Must be a valid date, at least 90 days from now.').isAfter(moment().add(90,'days').toString()),
    // Validate new date as a date
    body('new_date', 'Must choose a new date.').isDate(),
    // Validate new date as later than the previous date
    //body('new_date', 'New date must be after the previous date.').isAfter(moment(body.previous_date).toString()),
    body('new_date').custom((value, {req}) => {
        if (new Date(value) < new Date(req.body.previous_date)) {
            throw new Error('Must be later than previous date.');
        }
        return true;
    }),
    // validate new date as extending less than 120 days from previous date
    //body('new_date', 'New date cannot be later than 120 days from previous date.').isBefore(moment(body.previous_date).add(120, 'days').toString()),
    body('new_date').custom((value, {req}) => {
        if (new Date(value) > new Date(new Date(req.body.previous_date).getTime()+(120*24*60*60*1000))) {
            throw new Error('Cannot be later than 120 days from previous date.');
        }
        return true;
    }),
    // Sanitize extension type
    //body('extension_type', 'Must be either second tenative extension or extension to firm date.').escape(),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('tentative_form', { title: 'Create New Tentative Form', tentative: req.body, errors: errors.array() });
            return;
        } else {
            // Data from form is valid.

            // Create an Tentative object with escaped and trimmed data.
            var tentative = {
                    customer_name: req.body.customer_name,
                    address: req.body.address,
                    previous_date: req.body.previous_date,
                    new_date: req.body.new_date,
                    extension_type: req.body.extension_type
                };
            res.render('tentative_detail', tentative);
        }
    }
];