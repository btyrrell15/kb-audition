const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const Auditions = require('../model/Audition');


//get ALL Attendance
router.get('/', passport.authenticate('jwt',{
    session: false
}), async (req, res) => {
    Auditions.find().then(function(auditions){
        res.json({auditions});
    }).catch(function(error){
        res.status(400).json({msg: error.message});
    });
});

//submit a new audition
router.post('/', passport.authenticate('jwt',{
    session: false
}), async (req, res) => {
    const audition = new Auditions({
        AuditionName: req.body.AuditionName,
        AuditionDescription: req.body.AuditionDescription,
        Location: req.body.Location,
        Roles: req.body.Roles,
        RoleNames: req.body.RoleNames,
        AuditionDate: req.body.AuditionDate,
        Judges: req.body.Judges,
        CompID: req.body.CompID,
      });
      await audition.save()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json({ message: err })
      })
});

//specific audition
router.get('/:auditionID', passport.authenticate('jwt',{
    session: false
}), async (req, res) => {
    Auditions.findById(req.params.auditionID).then(function(audition){
        if(audition == null) {
            res.status(404);
            res.json({
                msg: `There is no audition with the ID of ${req.params.auditionID}`
            });
        } else {
            res.json({
                audition: audition
            })
        }
    }).catch(function(error){
        res.status(400).json({msg: error.message});
    });
});

//delete audition
router.delete('/:auditionID', passport.authenticate('jwt',{
    session: false
}), async (req, res) => {
    Auditions.findByIdAndDelete(req.params.auditionID).then(function(){
        res.status(204).send();
    }).catch(function(error){
        res.status(400).json({msg: error.message});
    });
});

//update a audition
router.put('/:auditionID', passport.authenticate('jwt',{
    session: false
}), async (req, res) => {

    Auditions.findById(req.params.auditionID).then(function(audition){
        if (audition == null){
                res.status(404);
                res.json({
                    msg: `There is no audition with the ID of ${req.params.auditionID}`
                });
            } else {
                if (req.body.AuditionName != undefined){
                    audition.AuditionName = req.body.AuditionName;
                }
                if (req.body.AuditionDescription != undefined){
                    audition.AuditionDescription = req.body.AuditionDescription;
                }
                if (req.body.Location != undefined){
                    audition.Location = req.body.Location;
                }
                if (req.body.Roles != undefined){
                    audition.Roles = req.body.Roles;
                }
                if (req.body.Judges != undefined){
                    audition.Judges = req.body.Judges;
                }
                if (req.body.RoleNames != undefined){
                    audition.RoleNames = req.body.RoleNames;
                }
                if (req.body.AuditionDate != undefined){
                    audition.AuditionDate = req.body.AuditionDate;
                }
                if (req.body.CompID != undefined){
                    audition.CompID = req.body.CompID;
                }
                audition.save().then(function(){
                    res.status(200);
                    res.json({
                        audition: audition
                    });
                });
            }
        }).catch(function(error){
            res.status(400).json({msg: error.message});
        });

});

module.exports = router;
