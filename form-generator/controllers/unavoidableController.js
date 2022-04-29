const { body,validationResult } = require("express-validator");


//Display all unavoidable dates forms
exports.unavoidable_list = (req, res) => {
    res.send('NOT IMPLETMENTED: Display list of unavoidalbe');
}
//Display details of a particular unavoidable dates form
exports.unavoidable_detail = (req, res) => {
    res.send('NOT IMPLEMENTED: display unavoidable form detail for ' + req.params.id);
}
//Display unavoidable create form on get
exports.unavoidable_create_get = (req, res) => {
    res.send('NOT IMPLETMENTED: unavoidable create get')
}
//Handle unavoidable create on post
exports.unavoidable_create_post = (req, res) => {
    res.send('NOT IMPLETMENTED: unavoidable create post')
}