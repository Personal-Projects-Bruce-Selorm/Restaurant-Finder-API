/**
*base file routes
*/

// dependencies
const {Router} = require('express')
const restaurantController = require('../controller/RestuarantController')

const router  = Router();

router.post('/restuarant',restaurantController.post)
router.get('/restuarant',restaurantController.get)
router.delete('/restuarant',restaurantController.delete)


module.exports = router