
let express = require('express');
let router = express.Router();
 
const juego = require('../controllers/juego.controller.js');

router.post('/api/juego/create', juego.create);
router.get('/api/juego/all', juego.retrieveAll);
router.get('/api/juego/onebyid/:id', juego.getById);
router.put('/api/juego/update/:id', juego.updateById);
router.delete('/api/juego/delete/:id', juego.deleteById);

module.exports = router;