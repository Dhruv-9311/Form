const Form = require('../Model/formModel');
const bcrypt = require('bcrypt');
const Login = require('../Model/loginModel');

const createLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email in Form collection
        const user = await Form.findOne({ email });
        if(!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!password) {
            return res.status(400).json({ message: 'Password is required' });
        }
        
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Create login record
        const login = new Login({
            email: user.email,
            password: user.password
        });
        await login.save();
        
        res.status(200).json({ 
            message: 'Login successful',
            user: { 
                id: user._id, 
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createLogin
};