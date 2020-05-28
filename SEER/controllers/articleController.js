const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Article = mongoose.model('Articles');

router.get('/',(req, res)=>{
    res.render("article/addOrEdit",{
        viewTitle : "Insert Article"
    });
});

// router.get('/',(req, res)=>{
//     res.render("search/searchBar",{
//         viewTitle : "Search Article"
//     });
// });

router.post('/',(req, res)=>{
    insertRecord(req,res);
});

function insertRecord(req,res){
    var article = new Article();
    article.title = req.body.title;
    article.description = req.body.description;
    article.year = req.body.year; 
    article.save((err, doc) => {
        if(!err)
            res.redirect('article/list');
        else
        {
            console.log('Error during record insertion : '+ err);
        }
        
    });
}

router.get('/list', (req, res) => {
    Article.find((err, docs) => {
        if (!err) {
            res.render("article/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving article list :' + err);
        }
    });
});

        router.get('/listsearch', (req, res) => {
            const regex = new RegExp(escapeRegex(req.query.search), 'gi');
            
            if(req.query.type=="title")
            {
                Article.find({title : regex}, function(err, docs){
                    if (!err) {
                        res.render("article/listsearch", {
                            list: docs
                        });
                    }
                    else {
                        console.log('Error in retrieving article list :' + err);
                    }
                });
            }
            else if(req.query.type=="description")
            {
                    Article.find({description : regex}, function(err, docs){
                    if (!err) {
                        res.render("article/listsearch", {
                            list: docs
                        });
                    }
                    else {
                        console.log('Error in retrieving article list :' + err);
                    }
                });
            }
            else if(req.query.type=="year")
            {
                Article.find({year : regex}, function(err, docs){
                    if (!err) {
                        res.render("article/listsearch", {
                            list: docs
                        });
                    }
                    else {
                        console.log('Error in retrieving article list :' + err);
                    }
                });
            }
        });


        // router.get('/list', (req, res) => {
        //     Article.find((err, docs) => {
        //         if (!err) {
        //             res.render("article/list", {
        //                 list: docs
        //             });
        //         }
        //         else {
        //             console.log('Error in retrieving article list :' + err);
        //         }
        //     });
        // });
   

        function escapeRegex(text) {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        };
    
    

module.exports = router;