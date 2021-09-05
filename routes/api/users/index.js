const express = require('express')
const router = express.Router()
const ctrl = require('../../../controllers/usersCtrl')
//const validate = require('./validation')

router.post('/users/signup', ctrl.signup)
router.post('/users/login',  ctrl.login)
router.post('/users/logout',  ctrl.logout)

// router
//   .get('/:contactId', validate.validateMongoId, ctrl.getContactById)
//   .delete('/:contactId', validate.validateMongoId, ctrl.removeContact)
//   .put('/:contactId', validate.updateContact, ctrl.updateContact)

// router
//   .patch('/:contactId/favorite', validate.validateMongoId, ctrl.getFavorite)

module.exports = router