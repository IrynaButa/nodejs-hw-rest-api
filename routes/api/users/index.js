const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/usersCtrl')
//const validate = require('./validation')

router.post('/signup', ctrl.signup)
router.post('/login',  ctrl.login)
router.post('/logout',  ctrl.logout)

router.get('/users/current', ctrl.checkUserByToken);

router.patch(
  '/users',
  ctrl.updateUserSubscription
);

module.exports = router