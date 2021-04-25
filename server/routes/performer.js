const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const Performers = require('../model/Performer');


//get ALL Performers
router.get('/', passport.authenticate('jwt',{
    session: false
}), async (req, res) => {
    Performers.find().then(function(performers){
        res.json({performers});
    }).catch(function(error){
        res.status(400).json({msg: error.message});
    });
});


//add a performer
router.post('/', passport.authenticate('jwt',{
    session: false
}), async (req, res) => {
    const performer = new Performers({
       
        Name: req.body.Name,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Resume: req.body.Resume,
        Specialties: req.body.Specialties,
        Vocal: req.body.Vocal,
        Dance: req.body.Dance,
        Presence: req.body.Presence,
        Overall: req.body.Overall,
        Notes: req.body.Notes,
        AuditionID: req.body.AuditionID,
        JudgeID: req.body.JudgeID,
        UserID: req.body.UserID,
        Scored: req.body.Scored,
        
      });
      await performer.save()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json({ message: err })
      })
});

//specific performer
router.get('/:performerID', passport.authenticate('jwt',{
    session: false
}), async (req, res) => {
    Performers.findById(req.params.performerID).then(function(performer){
        if(performer == null) {
            res.status(404);
            res.json({
                msg: `There is no performer with the ID of ${req.params.performerID}`
            });
        } else {
            res.json({
                performer: performer
            })
        }
    }).catch(function(error){
        res.status(400).json({msg: error.message});
    });
});

//delete performer
router.delete('/:performerID', passport.authenticate('jwt',{
    session: false
}), async (req, res) => {
    Performers.findByIdAndDelete(req.params.performerID).then(function(){
        res.status(204).send();
    }).catch(function(error){
        res.status(400).json({msg: error.message});
    });
});

//update a peformer
router.put('/:performerID', passport.authenticate('jwt',{
    session: false
}), async (req, res) => {

    Performers.findById(req.params.performerID).then(function(performer){
        if (performer == null){
                res.status(404);
                res.json({
                    msg: `There is no performer with the ID of ${req.params.performerID}`
                });
            } else {
                if (req.body.Name != undefined){
                    performer.Name = req.body.Name;
                }
                if (req.body.Email != undefined){
                    performer.Email = req.body.Email;
                }
                if (req.body.Phone != undefined){
                    performer.Phone = req.body.Phone;
                }
                if (req.body.Resume != undefined){
                    performer.Resume = req.body.Resume;
                }
                if (req.body.Specialties != undefined){
                    performer.Specialties = req.body.Specialties;
                }
                if (req.body.Vocal != undefined){
                    performer.Vocal = req.body.Vocal;
                }
                if (req.body.Dance != undefined){
                    performer.Dance = req.body.Dance;
                }
                if (req.body.Presence != undefined){
                    performer.Presence = req.body.Presence;
                }
                if (req.body.Overall != undefined){
                    performer.Overall = req.body.Overall;
                }
                if (req.body.Notes != undefined){
                    performer.Notes = req.body.Notes;
                }
                if (req.body.AuditionID != undefined){
                    performer.AuditionID = req.body.AuditionID;
                }
                if (req.body.JudgeID != undefined){
                    performer.JudgeID = req.body.JudgeID;
                }
                if (req.body.UserID != undefined){
                    performer.UserID = req.body.UserID;
                }
                if (req.body.Scored != undefined){
                    performer.Scored = req.body.Scored;
                }
                
                performer.save().then(function(){
                    res.status(200);
                    res.json({
                        performer: performer
                    });
                });
            }
        }).catch(function(error){
            res.status(400).json({msg: error.message});
        });

});

module.exports = router;
