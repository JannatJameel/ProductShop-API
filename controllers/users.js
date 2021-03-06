const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db/models");

exports.signup = async (req, res, next) => {
    const { password } = req.body;
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        req.body.password = hashedPassword;
        const newUser = await User.create(req.body);
        res.status(201).json({ message: "User created successfully" });
    } catch(error) {
        next(error);
    }
};

exports.signin = async (req, res) => {
    const {user} = req;
    const payload = {
        id: user.id,
        username: user.username,
        exp: Date.now() + 1.8e+6,
    };
    const token = jwt.sign(JSON.stringify(payload), "classifiedkey");
    res.json({ token });
};