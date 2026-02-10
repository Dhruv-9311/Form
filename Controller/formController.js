const Form = require('../Model/formModel');

// Get all forms
const getAllForms = async (req, res) => {
    try {
        const forms = await Form.find().sort({ createdAt: -1 });
        res.json(forms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new form
const createForm = async (req, res) => {
    try {
        console.log('Request body:', req.body); // Debug log
        
        const newForm = new Form(req.body);
        const savedForm = await newForm.save();
        
        console.log('Saved form:', savedForm); // Debug log
        res.status(201).json(savedForm);
    } catch (error) {
        console.error('Error saving form:', error); // Debug log
        res.status(400).json({ message: error.message });
    }
};

// Get form by ID
const getFormById = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.json(form);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update form by ID
const updateForm = async (req, res) => {
    try {
        const form = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.json(form);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete form by ID
const deleteForm = async (req, res) => {
    try {
        const form = await Form.findByIdAndDelete(req.params.id);
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.json({ message: 'Form deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllForms,
    createForm,
    getFormById,
    updateForm,
    deleteForm
};
