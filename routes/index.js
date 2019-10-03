const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const test=require('../models/testData');
const question=require('../models/question');
//Welcome page
router.get('/', (req,res)=> res.render('welcome'));
// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>  {
    //select * from tests;
    test.find({}, function(error, results){
        if(error) throw error;
        else{
            //console.log(results);
            res.render('dashboard',{name: req.user.name, tests:results});
        }
    });
});
router.get('/feedback', (req, res) =>  {
    
        //Score = req.query.score;
            //console.log(results);
            res.render('feedback', {score:req.query.score});
        
    });
router.post('/getQuestions', ensureAuthenticated, (req, res)=>{
    let nam=req.body.name;
    //
    question.find({testname: nam }, (error,result) =>{
        if(error) throw error;
        else{
            console.log(result);
            res.status(200).send(result);
        }
    })
    //Questions.find({id})
    //res.send(results);
});

module.exports = router;