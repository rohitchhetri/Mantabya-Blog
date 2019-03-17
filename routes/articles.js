const express = require('express');
const router = express.Router();

//Article Model 

const Article = require('../model/Article')

//Get Page
router.get('/create', (req,res) => res.render('articles')); 

//Get Page 
// router.get('/posts', (req,res) => res.render('posts'));

//Article Handle 
router.post('/create',(req, res)=> {
        var postData = new Article(req.body);
        postData.save().then( result => {
          console.log('Data Save')
            res.redirect('posts');
        }).catch(err => {
            res.status(400).send("Unable to save data");
        });
    });

router.get('/postsdata', (req, res, next) => {
        return Article.find()
          .sort({ createdAt: 'descending' })
          .then((articles) => res.json({ articles: articles.map(article => article.toJSON()) }))
          .catch(next);
      });

router.get('/posts', (req, res, next) => {
  console.log("im handsome")
    return Article.find({})
    .sort({ createdAt: 'descending' })
    .then((articles) => res.render('posts',{articles:articles}))
    .catch(next)
});

router.param('id', (req, res, next, id) => {
        return Article.findById(id, (err, article) => {
          if(err) {
            return res.sendStatus(404);
          } else if(article) {
            req.article = article;
            return next();
          }
        }).catch(next);
      });

router.get('/posts/:id', (req, res, next) => {
        return res.json({
          article: req.article.toJSON(),
        });
      });

router.delete('/posts/:id', (req, res, next) => {
        return Articles.findByIdAndRemove(req.article._id)
          .then(() => res.sendStatus(200))
          .catch(next);
});













module.exports = router;