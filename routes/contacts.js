var router = require('express').Router();
var Contact = require('../models/contact');

// Find All
router.get('/', (req, res) => {
  Contact.findAll()
    .then((contacts) => {
      if (!contacts.length) return res.status(404).send({ err: 'Contact not found' });
      res.send(`find successfully: ${contacts}`);
    })
    .catch(err => res.status(500).send(err));
});

router.get('/search', (req, res) => {
    Contact.findOneByidname(req.body)
    .then((contact) => {
        if (!contact) return res.status(404).send({ err: 'Contact not found' });
        res.send(`findOne successfully: ${contact}`);
      })
      .catch(err => res.status(500).send(err));
  });

// Find One by id
router.get('/contactid/:contactid', (req, res) => {
  Contact.findOneBycontactid(req.params.contactid)
    .then((contact) => {
      if (!contact) return res.status(404).send({ err: 'Contact not found' });
      console.log("1");
      res.send(contact);
    })
    .catch(err => res.status(500).send(err));
});
router.post('/private', (req, res) => {
    Contact.findOneBycontactid(req.body.contactid)
    .then((contacts) => {
      if (!contacts.length) return res.status(404).send({ err: 'Contact not found' });
      res.send(contacts);
    })
  });
// updating
router.post('/private/books', function (req, res) {
    Contact.findOneByidname(req.body)
            .exec(function (err, rContact){
                if (err){
                    res.json({
                     approve_id: "NO",
                     approve_pw: "NO"
                    });}
                if (!rContact){
                    console.log("1");
                    Contact.create(req.body)
                        .then(contact => res.send(contact))
                        .catch(err => res.status(500).send(err));
                 } 
                else if(rContact){
                    console.log("2");
                    Contact.updateByname(req.body.name, req.body)
                        .then(contact => res.send(contact))
                        .catch(err => res.status(500).send(err));
                }
            });  
});
//downloading
// router.post('/private', function (req, res) {
//     Contact.findOneBycontactid(req.body.contactid)
//             .exec(function (err, rContact){
//                 if (err){
//                     res.json({
//                      approve_id: "NO",
//                      approve_pw: "NO"
//                     });}
//                 if (!rContact) {
//                     Contact.create(req.body)
//                         .then(contact => res.send(contact))
//                         .catch(err => res.status(500).send(err));
//                 } else if(rContact) {
//                      Contact.updateByname(req.body.name, req.body)
//                         .then(contact => res.send(contact))
//                         .catch(err => res.status(500).send(err));
//                 }
//             });
// });
// Create new contact document
router.post('/', (req, res) => {
  Contact.create(req.body)
    .then(contact => res.send(contact))
    .catch(err => res.status(500).send(err));
});

// Update by id
router.put('/id/:id', (req, res) => {
  Contact.updateBycontactid(req.params.id, req.body)
    .then(contact => res.send(contact))
    .catch(err => res.status(500).send(err));
});
// Update by name
router.put('/name/:name', (req, res) => {
    Contact.updateByname(req.body.name, req.body)
      .then(contact => res.send(contact))
      .catch(err => res.status(500).send(err));
  });
// Delete by id
router.delete('/id/:id', (req, res) => {
  Contact.deleteBycontactid(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;