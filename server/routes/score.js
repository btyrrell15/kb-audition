const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const Scores = require('../model/Score');


//get ALL Scores
router.get('/', passport.authenticate('jwt',{
    session: false
}), async (req, res) => {
    Scores.find().then(function(scores){
        res.json({scores});
    }).catch(function(error){
        res.status(400).json({msg: error.message});
    });
});


//add a score
router.post('/', passport.authenticate('jwt',{
    session: false
}), async (req, res) => {
    const score = new Scores({
        Performer: req.body.Performer,
        Name: req.body.Name,
        Vocal: req.body.Vocal,
        Dance: req.body.Dance,
        Presence: req.body.Presence,
        Overall: req.body.Overall,
        Notes: req.body.Notes,
        Callback: req.body.Callback,
        AuditionID: req.body.AuditionID,
        JudgeID: req.body.JudgeID,
        Image: req.body.Image,
      });
      await score.save()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json({ message: err })
      })
});

//specific score
router.get('/:scoreID', passport.authenticate('jwt',{
    session: false
}), async (req, res) => {
    Scores.findById(req.params.scoreID).then(function(score){
        if(score == null) {
            res.status(404);
            res.json({
                msg: `There is no score with the ID of ${req.params.scoreID}`
            });
        } else {
            res.json({
                score: score
            })
        }
    }).catch(function(error){
        res.status(400).json({msg: error.message});
    });
});

//delete Score
router.delete('/:ScoreID', passport.authenticate('jwt',{
    session: false
}), async (req, res) => {
    Scores.findByIdAndDelete(req.params.scoreID).then(function(){
        res.status(204).send();
    }).catch(function(error){
        res.status(400).json({msg: error.message});
    });
});

//update a score
router.put('/:scoreID', passport.authenticate('jwt',{
    session: false
}), async (req, res) => {

    Scores.findById(req.params.scoreID).then(function(score){
        if (score == null){
                res.status(404);
                res.json({
                    msg: `There is no score with the ID of ${req.params.scoreID}`
                });
            } else {
                if (req.body.Performer != undefined){
                    score.Performer = req.body.Performer;
                }
                if (req.body.Score != undefined){
                    score.Score = req.body.Score;
                }
                if (req.body.Vocal != undefined){
                    score.Vocal = req.body.Vocal;
                }
                if (req.body.Dance != undefined){
                    score.Dance = req.body.Dance;
                }
                if (req.body.Presence != undefined){
                    score.Presence = req.body.Presence;
                }
                if (req.body.Overall != undefined){
                    score.Overall = req.body.Overall;
                }
                if (req.body.Notes != undefined){
                    score.Notes = req.body.Notes;
                }
                if (req.body.Callback != undefined){
                    score.Callback = req.body.Callback;
                }
                if (req.body.AuditionID != undefined){
                    score.AuditionID = req.body.AuditionID;
                }
                if (req.body.JudgeID != undefined){
                    score.JudgeID = req.body.JudgeID;
                }
                if (req.body.Image != undefined){
                    score.Image = req.body.Image;
                }
                score.save().then(function(){
                    res.status(200);
                    res.json({
                        score: score
                    });
                });
            }
        }).catch(function(error){
            res.status(400).json({msg: error.message});
        });

});

module.exports = router;
