const express = require('express');
const router = express.Router();
const carrerControllers = require('../controllers/career');


router.get('/career', carrerControllers.getCarrers);
router.get('/career/:id', carrerControllers.getCareerById);
router.post('/career', carrerControllers.postCarrer);
router.put('/career/:id', carrerControllers.updateCarrer);

module.exports = router;