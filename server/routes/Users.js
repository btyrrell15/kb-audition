const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../config/keys').secret;
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const User = require('../model/Users')
const Image = require('../model/Images')

aws.config.update({
  accessKeyId: "AKIA6HJTW2YSZUD3WLGB",
  secretAccessKey: "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",
  region: 'us-west-1'
});

const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'kbaudition',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {
        fieldName: file.fieldname,
        fileName: file.originalname
      });
    },
    key: function (req, file, cb) {
      let path = `images/${Date.now()}-${file.originalname}`;
      cb(null, path);
    }
  })
});
const singleUpload = upload.single('image');

router.post('/posts', function (req, res) {
  singleUpload(req, res, function (err) {
    if (err) {
      console.error('Error occurred:', err);
      return res.sendStatus(422);
    }

    const newImage = new Image({
      Name: req.body.Name, 
      File: req.file.originalname, 
      Location: req.file.location, 
  });
    newImage.save()
    
    console.log('Save to DB:', {
      name: req.body.name,
      fileName: req.file.originalname,
      imageUrl: req.file.location
    })
    
    return res.sendStatus(201);
  });
});

router.get('/posts', function (req, res) {
  Image.find().then(function(image){
    res.json({image})
  })
})



//first see if password match
router.post('/register', 
  (req, res) => {
    const { 
        CompanyName,  
        Image,
        FirstName, 
        LastName, 
        Phone, 
        Email, 
        Address, 
        City, 
        State, 
        Zip, 
        Role, 
        Username, 
        Password, 
        ConfirmPassword,
        Birthday,
        AuditionID,
    } = req.body
    if (Password !== ConfirmPassword){
        return res.json({
            msg: "Password does not match"
        })
    } 

//now check if username is unique
    User.findOne({Username: Username}).then(user => {
        if (user) {
            return res.json({
                msg: "Username is already taken"
            })
        }
    })

//check email is unique
    User.findOne({Email: Email}).then(user => {
        if (user){
            return res.json({
                msg: "Email is already registered"
            })
        }
    })

    //if everything works, create a user and hash passsword
    const newUser = new User({
        CompanyName: CompanyName, 
        Image: Image, 
        FirstName: FirstName, 
        LastName: LastName, 
        Phone: Phone, 
        Email: Email, 
        Address: Address, 
        City: City, 
        State: State, 
        Zip: Zip, 
        Role: Role, 
        Username: Username, 
        Password: Password, 
        Birthday: Birthday,
        AuditionID: AuditionID,
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.Password, salt, (err, hash) => {
            // if (err) {
            //     return res.json(err);
            // } else {
                newUser.Password = hash;
                newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: "User is now registered"
                })
            })
            // }
            
        })
    })

})

router.post('/login', (req, res) => {
    User.findOne({ Username: req.body.Username}).then(user => {
        if (!user) {
            return res.json({
                success: false,
                msg: "Username is not found",
            });
        } else {
            bcrypt.compare(req.body.Password, user.Password).then(isMatch => {
                if(isMatch){
                    const payload = {
                        _id: user._id,
                        Username: user.Username,
                        Name: user.Name,
                        Email: user.Email,
                    };
                    jwt.sign(payload, key, { 
                        expiresIn: 604800 
                    }, (err, token) => {
                        res.json({
                            success: true,
                            token: `Bearer ${token}`,
                            user: user,
                            msg: "User logged in.",
                        })
                    } 
                    );
                } else {
                    return res.json({
                        msg: "Incorrect Password",
                        success: false
                    });
                }
            })
        }
    })
})

router.get('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    return res.json({
        user: req.user
    });

})

router.get('/all', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  User.find().then(function(users){
    res.json({users});
  }).catch(function(error){
    res.status(400).json({msg: error.message})
  })

})

router.put('/:profileId', passport.authenticate('jwt', {
      session: false,
    }),
    async (req, res) => {
      User.findById(req.params.profileId).then(async function (user) {
          if (user == null) {
            res.status(404);
            return res.json({
              msg: `There is no user with the ID of ${req.params.userID}`,
            });
          } else {
            if (req.body.CompanyName != undefined) {
              user.CompanyName = req.body.CompanyName;
            }
            if (req.body.Image != undefined) {
              user.Image = req.body.Image;
            }
            if (req.body.FirstName != undefined) {
              user.FirstName = req.body.FirstName;
            }
            if (req.body.LastName != undefined) {
              user.LastName = req.body.LastName;
            }
            if (req.body.Phone != undefined) {
              user.Phone = req.body.Phone;
            }
            if (req.body.Email != undefined) {
              user.Email = req.body.Email;
            }
            if (req.body.Address != undefined) {
              user.Address = req.body.Address;
            }
            if (req.body.City != undefined) {
              user.City = req.body.City;
            }
            if (req.body.State != undefined) {
              user.State = req.body.State;
            }
            if (req.body.Zip != undefined) {
              user.Zip = req.body.Zip;
            }
            if (req.body.Username != undefined) {
              user.Username = req.body.Username;
            }
            if (req.body.AuditionID != undefined) {
              user.AuditionID = req.body.AuditionID;
            }
            if (req.body.Password != undefined) {
              bcrypt.hash(req.body.password, 10, async (err, hash) => {
                if (err) {
                  return res.json(err);
                }
                user.Password = hash;
                user.save().then(user => {
                  res.status(200);
                  res.json({
                    success: true,
                    msg: 'Password is updated!',
                  });
                }).catch(function (error) {
                  res.status(400).json({ msg: error.message });
                });
              });
            } else {
              user.save()
            }
          }
        })
        .catch(function (error) {
          res.status(400).json({ msg: error.message });
        });
    }
  );

module.exports = router;