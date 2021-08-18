const { Router } = require ('express');
const { check } = require('express-validator')
const router =Router(); 

const { createUserCtrl, loginUserCtrl, renewTokenCtrl } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } =require( '../middlewares/validar-jwt');



router.post(
    '/new',
     [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),             
        check('password','La password debe de ser de más de 6 caracteres').isLength({ min:6 }),
        validarCampos
     ]
     ,createUserCtrl );

router.post(
        '/',
        [
            check('email','El email es obligatorio').isEmail(),  
            check('password','La password debe de ser de más de 6 caracteres').isLength({ min:5 }),
            validarCampos
        ],
        loginUserCtrl );

router.get('/renew', validarJWT , renewTokenCtrl );

module.exports = router;

