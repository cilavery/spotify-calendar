const router = require('express').Router();
const { Event } = require('../db/models');

module.exports = router;

router.get('/', (req, res, next) => {
  Event.findAll()
  .then(events => {
    res.json(events)
  })
  .catch(next)
})

router.post('/', (req, res, next) => {
  Event.create(req.body)
  .then(created => {
    res.json(created)
  })
  .catch(next)
})


router.delete('/delete/:id', (req, res, next) => {
  let eventId = req.params.id
  Event.destroy({
    where: {
      id: eventId
    }
  })
  .then(() => res.sendStatus(204))
  .catch(err => console.error(err))
});


router.put('/:id', (req, res, next) => {

})
