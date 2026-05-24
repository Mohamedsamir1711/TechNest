const express = require('express');
const router = express.Router();
const user = require('../controller/user');
const addUser = require('../validations/addUser')
const validator = require('../middlewares/validator')


router.get('/',user.getAllUsers);
router.post('/', validator(addUser), user.addUser);
router.get('/status', user.getStatus);
router.get('/deleted', user.getDeletedUsers);
router.get('/:id', user.getOneUser);
router.put('/:id', user.editUser);
router.delete('/:id', user.deleteUser);
router.patch('/soft-delete/:id', user.softDeleteUser);

module.exports = router;