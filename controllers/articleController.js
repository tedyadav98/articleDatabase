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
        //start of the search function
        router.get('/listsearch', (req, res) => {
            
            //using the regex function to generalize the text from user input
            const regexT = new RegExp(escapeRegex(req.query.searchTitle), 'gi');
            const regexD = new RegExp(escapeRegex(req.query.searchDescription), 'gi');
            
            // const regexY = new RegExp(escapeRegex(req.query.searchYear), 'gi');
            // const regexS = new RegExp(escapeRegex(req.query.sort), 'gi');
            
            // to be added for the sort 
            if(req.query.sort=='title')
            {
                var mysort = { title: 1 };
            }
            else if(req.query.sort=='title descending')
            {
                var mysort = { title: -1 };
            }
            else if(req.query.sort=='description descending')
            {
                var mysort = { description: -1 };
            }
            else if(req.query.sort=='description')
            {
                var mysort = { description: -1 };
            }
            if(req.query.sort=='year')
            {
                var mysort = { year: 1 };
            }
            else if(req.query.sort=='year descending')
            {
                var mysort = { year: -1 };
            }
            else if(req.query.sort=='none')
            {
                var mysort = {};
            }


            // to be added for hidding the fields
            var myfield = "";
            if(req.query.hide=='title')
            {
                var myfield = "-title";
            }
            else if(req.query.hide=='description')
            {
                var myfield = "-description";
            }
            else if(req.query.hide=='year')
            {
                var myfield = "-year";
            }
            else if(req.query.hide=='description and year')
            {
                var myfield = ["-description","-year"];
            }
            else if(req.query.hide=='title and year')
            {
                var myfield= ["-title", "-year"] ;
            }
            else if(req.query.hide=='title and description')
            {
                var myfield = ["-title","-description"];
            }
            else if(req.query.hide=='none')
            {
                var myfield = "";
            }
           
          
                    //all the if and else statements for the user input 
                    //if all the fields are provided by the user
                    if((req.query.searchTitle)&&(req.query.searchDescription)&&((req.query.searchYearLow)||(req.query.searchYearHigh)))
                    {
                        Article.find({title : regexT,description : regexD,year : {$gte:req.query.searchYearLow,$lte:req.query.searchYearHigh}}, function(err, docs){
                            if (!err) {
                                res.render("article/listsearch",{ 
                                    list: docs
                                });
                            }
                            else {
                                console.log('Error in retrieving article list :' + err);
                            }
                        }).sort(mysort).select(myfield);//add .sort for sort and .select for the fields to be hidden
                    }
                
                    //if the title and description are provided
                    else if((req.query.searchTitle)&&(req.query.searchDescription))
                    {
                            Article.find({title: regexT,description : regexD}, function(err, docs){
                            if (!err) {
                                res.render("article/listsearch", {
                                    list: docs
                                });
                            }
                            else {
                                console.log('Error in retrieving article list :' + err);
                            }
                        }).sort(mysort).select(myfield);//add .sort for sort and .select for the fields to be hidden
                    }
                    //if the title is provided 
                    else if(req.query.searchTitle)
                    {
                        Article.find({title : regexT},  function(err, docs){
                            if (!err) {
                                res.render("article/listsearch", {
                                    list: docs
                                });
                            }
                            else {
                                console.log('Error in retrieving article list :' + err);
                            }
                        }).sort(mysort).select(myfield);//add .sort for sort and .select for the fields to be hidden
                    }

                    //if the year range is provided
                    else if((req.query.searchYearLow)||(req.query.searchYearHigh))
                    {
                        Article.find({year : {$gte:req.query.searchYearLow,$lte:req.query.searchYearHigh}},function(err, docs){
                            if (!err) {
                                res.render("article/listsearch", {
                                    list: docs
                                });
                            }
                            else {
                                console.log('Error in retrieving article list :' + err);
                            }
                        }).sort(mysort).select(myfield);//add .sort for sort and .select for the fields to be hidden
                    }
            
                    //if the description is provided
                    else if(req.query.searchDescription)
                    {
                        Article.find({description : regexD},{ $sort : {title: 1}}, function(err, docs){
                            if (!err) {
                                res.render("article/listsearch", {
                                    list: docs
                                });
                            }
                            else {
                                console.log('Error in retrieving article list :' + err);
                            }
                        }).sort(mysort).select(myfield);//add .sort for sort and .select for the fields to be hidden
                    }

                    //if the title and year range are provided
                    else if((req.query.searchTitle)&&((req.query.searchYearLow)||(req.query.searchYearHigh)))
                    {
                            Article.find({title: regexT,year : {$gte:req.query.searchYearLow,$lte:req.query.searchYearHigh}}, function(err, docs){
                            if (!err) {
                                res.render("article/listsearch", {
                                    list: docs
                                });
                            }
                            else {
                                console.log('Error in retrieving article list :' + err);
                            }
                        }).sort(mysort).select(myfield);//add .sort for sort and .select for the fields to be hidden
                    }

                    //if the description and year range are provided
                    else if(((req.query.searchYearLow)||(req.query.searchYearHigh))&&(req.query.searchDescription))
                    {
                            Article.find({year: {$gte:req.query.searchYearLow,$lte:req.query.searchYearHigh},description : regexD}, function(err, docs){
                            if (!err) {
                                res.render("article/listsearch", {
                                    list: docs
                                });
                            }
                            else {
                                console.log('Error in retrieving article list :' + err);
                            }
                        }).sort(mysort).select(myfield);//add .sort for sort and .select for the fields to be hidden
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
    
        module.exports = escapeRegex;
module.exports = router;