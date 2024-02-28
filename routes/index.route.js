const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/contactus', (req, res, next) => {
  res.render('contactus');
});

module.exports = router;
