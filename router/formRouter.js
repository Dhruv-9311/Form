const express = require('express');
const router = express.Router();
const {
    getAllForms,
    createForm,
    getFormById,
    updateForm,
    deleteForm
} = require('../Controller/formController');
const { createLogin } = require('../Controller/loginController');

router.post('/post', createForm);
router.post('/login/post', createLogin);
router.get('/', getAllForms);
router.get('/:id', getFormById);
router.put('/:id', updateForm);
router.delete('/:id', deleteForm);

module.exports = router;