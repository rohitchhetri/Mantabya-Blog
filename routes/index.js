const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');

router.use('/articles/posts', require('./articles'));

//Welcome Page
router.get('/', (req,res) => res.render('welcome')); 

//Dashboard
router.get('/dashboard', ensureAuthenticated, (req,res) => 

res.render('dashboard', {
    name: req.user.name,
    email:req.user.email,
})); 

// //Posts Access
// router.get('/articles/posts', ensureAuthenticated, (req,res) => 

// res.render('posts', {
//     name: req.user.name,
//     email:req.user.email,
// })); 


// router.get('/articles/postsdata', (req, res, next) => {
//     return Article.find()
//     .sort({ createdAt: 'descending' })
//     .then((articles) => res.json({ articles: articles.map(article => article.toJSON()) }))
//     .catch(next);
//   });

module.exports = router;