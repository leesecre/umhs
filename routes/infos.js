var router = require('express').Router();
var Info = require('../models/info');

// Find All
router.get('/', (req, res) => {
  Info.findAll()
    .then((infos) => {
      if (!infos.length) return res.status(404).send({ err: 'Info not found' });
      res.send(`find successfully: ${infos}`);
    })
    .catch(err => res.status(500).send(err));
});

// Find One by infoid
router.get('/infoid/:infoid', (req, res) => {
  console.log(req);
  Info.findOneByinfoid(req.params.infoid)
    .then((info) => {
      if (!info) return res.status(404).send({ err: 'Info not found' });
      res.send(`findOne successfully: ${info}`);
    })
    .catch(err => res.status(500).send(err));
});
// Find One by id
router.get('/id/:_id', (req, res) => {
  Info.findOneBy_id(req.params._id)
    .then((info) => {
      if (!info) return res.status(404).send({ err: 'Info not found' });
      res.send(`findOne successfully: ${info}`);
    })
    .catch(err => res.status(500).send(err));
});
// Fnde One by ID and send message
router.post('/login/local', function (req, res, next) {
  var localEmail = req.body.email;
  var localPassword = req.body.password;

  var findConditionLocalUser = {
      infoid: localEmail,
      pw: localPassword
  }
  Info.findOne(findConditionLocalUser)
       .exec(function (err, Info) {
           if (err){
             console.log("err");
               res.json({
                approve_id: "NO",
                approve_pw: "NO",
                _id: "NO"
               });
           } else if (!Info) {
            console.log("NoId");
               res.json({
                approve_id: "NO",
                approve_pw: "NO",
                _id: "NO"
               });
           } else if(Info) {
            console.log(Info._id);
               res.json({
                approve_id: "OK",
                approve_pw: "OK",
                _id: Info._id 
               });
           }
       });
});

router.post('/login/register', function (req, res, next) {
  var localEmail = req.body.infoid;
  var localPassword = req.body.pw;

  var temp = new Info();
  temp.infoid = localEmail;
  temp.pw = localPassword;
  Info.findOneByinfoid(localEmail)
       .exec(function (err, Info) {
           if (err){
              console.log("err");
               res.json({
                key: "failed"
               });
           } else if (!Info) {
                temp.save(function(err){
                 if(err){
                  res.json({key: "failed"});
                  return;
                  }
                 res.json({key: "success"});
            });
        
           } else if(Info) {
              console.log("found user");
               res.json({
                key: "failed"
               });
           }
       });
});

// Create new info document
router.post('/', (req, res) => {
  Info.create(req.body)
    .then(info => res.send(info))
    .catch(err => res.status(500).send(err));
});

// Update by infoid
router.put('/infoid/:infoid', (req, res) => {
  Info.updateByinfoid(req.params.infoid, req.body)
    .then(info => res.send(info))
    .catch(err => res.status(500).send(err));
});

// Delete by infoid
router.delete('/infoid/:infoid', (req, res) => {
  Info.deleteByinfoid(req.params.infoid)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;