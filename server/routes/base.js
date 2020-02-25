const { Router } = require('express');

const router = Router();

router.get('/:entity', (req, res) => {
  res.json({
    message: `Hello ${req.params.entity}`
  }).status(200);
});

module.exports = router;
