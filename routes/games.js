var router = require('express').Router();
var Game = require('../models/game');

// Find All
router.get('/', (req, res) => {
  Game.findAll()
    .then((games) => {
      if (!games.length) return res.status(404).send({ err: 'Game not found' });
      res.send(games);
    })
    .catch(err => res.status(500).send(err));
});


// Find One by id
router.get('/gameid/:gameid', (req, res) => {
  Game.findOneBygameid(req.params.gameid)
    .then((game) => {
      if (!game) return res.status(404).send({ err: 'Game not found' });
      console.log("1");
      res.send(game);
    })
    .catch(err => res.status(500).send(err));
});
// requesting my info
router.post('/request', function (req, res) {
    Game.findOneBykey(req.body.key)
        .then((game) => {
             if (!game) return res.status(404).send({ err: 'Game not found' });
                res.send(game);
            })
        .catch(err => res.status(500).send(err));
});
// hunting info
router.post('/hunt', function (req, res) {
  Game.findOneBymynum(req.body.mynum)
      .then((game) => {
           if (!game) return res.status(404).send({ err: 'Game not found' });
              res.send(game);
          })
      .catch(err => res.status(500).send(err));
});
// hunting info
router.post('/hunting1', function (req, res) {
  Game.updateBymynum(req.body.tnum, req.body.mytnum)
      .then((game) => {
           if (!game) return res.status(404).send({ err: 'Game not found' });
           console.log(req.body.tnum)
              console.log(req.body.mytnum)
              res.send(game);
          })
      .catch(err => res.status(500).send(err));
});
// hunting2 info
router.post('/hunting2', function (req, res) {
  Game.updateBymynum2(req.body.tnum, req.body.hnum)
      .then((game) => {
           if (!game) return res.status(404).send({ err: 'Game not found' });
              console.log("hunted")
              res.send(game);
          })
      .catch(err => res.status(500).send(err));
});
// leader info
router.post('/leader', function (req, res) {
  Game.findOneBymynum(req.body.mynum)
      .then((game) => {
           if (!game) return res.status(404).send({ err: 'Game not found' });
              res.send(game);
          })
      .catch(err => res.status(500).send(err));
});


// Create new game document
router.post('/', (req, res) => {
  Game.create(req.body)
    .then(game => res.send(game))
    .catch(err => res.status(500).send(err));
});

// Update by id
router.put('/id/:id', (req, res) => {
  Game.updateBygameid(req.params.id, req.body)
    .then(game => res.send(game))
    .catch(err => res.status(500).send(err));
});
// Update by name
router.put('/name/:name', (req, res) => {
    Game.updateByname(req.body.name, req.body)
      .then(game => res.send(game))
      .catch(err => res.status(500).send(err));
  });
// Delete by id
router.delete('/id/:id', (req, res) => {
  Game.deleteBygameid(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;