const User = require('../models/User');
const generateToken = require('../utils/generateToken');



//Register a new user
// POST /api/users
// Public route
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const userExists = await User.findOne({email});

        if(userExists) {
            res.status(400).json({message: 'user already exists.'});
        }else {
            const user = await User.create({
                name,
                email,
                password
            })

            if(user) {
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id)
                })
            }else {
                res.status(400).json({
                    message: 'Invalid user data.'
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

//Login an existing user
// POST /api/users/login
// Public route
const loginUser = async (req, res) => {
    
    try {
        const {email, password} = req.body;

        const user  = await User.findOne({email});

        if(!user) {
            res.status(400).json({
                message: "incorrect email or password."
            })
        }else {
            const isMatch = await user.isValidPassword(password);
            if(!isMatch) {
                res.status(400).json({
                    message: "incorrect email or password."
                })
            }else {
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id)
                })
            }
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
    
}




module.exports = {registerUser, loginUser};




