const express = require('express');
const router = express.Router();
const carrerControllers = require('../controllers/carrer');


router.get('/carrer', carrerControllers.getCarrers);
router.get('/carrer/:id', carrerControllers.getCareerById);
router.post('/carrer', carrerControllers.postCarrer);
router.put('/carrer/:id', carrerControllers.updateCarrer);

module.exports = router;