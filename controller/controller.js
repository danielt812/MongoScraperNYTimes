var mongoose = require('mongoose');
var logger = require('morgan');
var axios = require('axios');
var cheerio = require('cheerio');

//Require Database



module.exports = function(app) {
    var db = require('../models/index');
    app.use(logger('dev'));
    //Connection to database
    var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/nytScrapper';
    mongoose.connect(MONGODB_URI);

    //ROUTES
    //================================================================
    //Scraper
    app.get('/scrape', function(req, res) {
        axios.get('https://www.nytimes.com/').then(function(response) {
            //Cheerio
            var $ = cheerio.load(response.data);
            //Create an array of all articles
            var allArticles = [];
            //Search each h2 in each article element
            $('article h2').each(function(i, element) {
                var result = {};

                result.title = $(this).children('a').text();
                result.link = $(this).children('a').attr('href');
                              
                db.Article.create(result).then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    return res.json(err)
                });
            });
        //Redirect to home if successful
        res.redirect('/')
        });
    });

    //Route to clear db
    app.get('/clear', function(req, res) {
        db.Article.remove({}, function(err, doc) {
            if(err) {
                console.log(err);
            }
            else {
                console.log('removed all articles');
                res.redirect('/');
            }
        })
    })

    //Route to get all objects in json
    app.get('/articles', function(req, res) {
        db.Article.find({saved: false})
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
            res.json(err);
        });
    });

    app.get('/savedArticles', function(req, res) {
        db.Article.find({saved: true})
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
        });
    });

    app.get('/deleteArticle/:id', function(req, res) {
        db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: false })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err)
        })
    })

    app.get('/articles/:id', function(req, res) {
        db.Article.findOne({ _id: req.params.id })
            .populate('note')
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
            });
    });


    app.post('/articles/:id', function(req, res) {
        db.Note.create(req.body)
        .then(function(dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    app.post('/savedArticles/:id', function(req, res) {
        db.Article.findOneAndUpdate({_id: req.params.id}, {saved: true}).then(function( dbRes) {
            res.redirect('/')
        })
    })


    //Route to render home page
    app.get('/', function(req, res) {
        res.render('index')
    });

    //Route to render saved page
    app.get('/saved', function(req, res) {
        res.render('saved')
    });
}