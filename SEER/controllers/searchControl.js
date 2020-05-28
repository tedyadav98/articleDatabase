// const express = require('express');
// var router = express.Router();
// const mongoose = require('mongoose');
// const Article = mongoose.model('Articles');

// router.get('/',(req, res)=>{
//     res.render("search/searchBar",{
//         viewTitle : "Search Article"
//     });
// });
// router.get('/listsearch', (req, res) => {
//     Article.find({title : "dikshant"}, function(err, docs){
//         if (!err) {
//             res.render("article/listsearch", {
//                 list: docs
//             });
//         }
//         else {
//             console.log('Error in retrieving article list :' + err);
//         }
//     });
// });



// module.exports = router;