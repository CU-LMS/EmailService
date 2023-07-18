const jwt = require('jsonwebtoken')
const User = require('../models/User')

const register = async (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
    })
    try {
        const savedUser = await newUser.save();
        const count = await User.countDocuments({})
        if (count == 1) {
            await User.findOneAndUpdate({ email: req.body.email }, {
                isAdmin: true,
                role: 'admin'
            })
        }
        res.status(201).json({ msg: "user registered successfully" });
    } catch (error) {
        res.status(500).json(error.message);
    }
}

const login = async (req, res) => {
    try {
        //finding user with the provided username
        const user = await User.findOne({ email: req.body.email });

        //if user does not exist
        if (!user) {
            return res.status(401).json("Wrong credentials");
        }
        //calling instance method to comparehashed password
        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) {
            return res.status(401).json("Wrong credentials");
        }
        //if every thing is okay then send the user details except password
        const accestoken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
        const { password, ...others } = user._doc;
        res.status(201).json({ ...others, accestoken });
    } catch (error) {
        res.status(500).json(error.message);
        console.log(error)
    }
}
const changeRole = async (req, res) => {
    try {
        if (req.body.role && req.body.isAdmin && req.body.approvedBy && req.body.email) {
            const changedUser = await User.findOneAndUpdate({ email: req.body.email }, {
                isAdmin: req.body.isAdmin,
                role: req.body.role,
                approvedBy: req.body.approvedBy,
            })
            return res.status(201).json({ msg: "user role changed" })
        }
        throw new Error("Please provide all required data")
    } catch (error) {
        console.log(error.message)
        res.status(403).json({ msg: error.message })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 })
        res.status(200).json(users)
    } catch (error) {
        res.status(403).json({ msg: error.message })
    }
}

const deleteUsers = async (req, res) => {
    try {
        if (req.params.userEmail) {
            await User.findOneAndDelete({ email: req.params.userEmail })
            return res.status(200).json({ msg: 'user deleted successfully' })
        }
        throw new Error("User does not exist")
    } catch (error) {
        res.status(403).json({ msg: error.message })
    }
}

module.exports = {
    login,
    register,
    changeRole,
    getAllUsers,
    deleteUsers
}
