const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { calculateSleepScore } = require("../services/user");

const hello = (req, res) => {
    res.send({
        success: 1,
        message: "Hello World",
    });
}

const register = async (req, res) => {
    try {
        let { nickname, password } = req.body;
        if (!nickname || !password) {
            return res.status(400).send({
                success: 0,
                message: 'Provide nickname and password',
            });
        }

        const existingUser = await User.findOne({ nickname });
        if (existingUser) {
            return res.status(409).send({
                success: 0,
                message: 'nickname already exists, choose different nickname',
            });
        }

        password = await bcrypt.hash(password, 10);
        const user = new User({
            nickname,
            password,
        });
        const saved = await user.save();
        res.send({
            success: 1,
            id: saved._id,
            nickname: saved.nickname,
            message: 'user created successfully',
        })

    } catch (err) {
        res.status(400).send({
            success: 0,
            message: err.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { nickname, password } = req.body;
        if (!nickname || !password) {
            return res.status(400).send({
                success: 0,
                message: 'Provide nickname and password',
            });
        }
        const user = await User.findOne({ nickname });
        if (!user) {
            return res.status(401).send({
                success: 0,
                message: 'Invalid nickname',
            });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send({
                success: 0,
                message: 'Invalid username or password',
            });
        }

        const payload = { nickname: user.nickname, id: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        res.send({
            success: 1,
            token,
            id: user._id,
            nickname: user.nickname,
            message: 'Logged in successfully',
        })

    } catch (err) {
        res.status(400).send({
            success: 0,
            message: err.message
        })
    }
}

const addSleepChanges = async (req, res) => {
    try {
        const { id, changes } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({
                success: 0,
                message: "User not found",
            });
        }

        user.sleepChanges = changes;
        await user.save();

        res.send({
            success: 1,
            message: "Changes added successfully"
        });
    } catch (err) {
        res.status(500).send({
            success: 0,
            message: err.message,
        });
    }
}

const addSleepStruggleDuration = async (req, res) => {
    try {
        const { id, struggle } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({
                success: 0,
                message: "User not found",
            });
        }

        user.sleepStruggleDuration = struggle;
        await user.save();

        res.json({
            success: 1,
            message: "Sleep struggle duration added successfully",
        });
    } catch (err) {
        res.status(500).send({
            success: 0,
            message: err.message,
        });
    }
}

const addBedSleepTime = async (req, res) => {
    try {
        const { id, sleepTime } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: 0,
                message: "User not found",
            });
        }

        user.sleepBedTime = sleepTime;
        await user.save();

        res.send({
            success: 1,
            message: "Sleep time added successfully",
        });
    } catch (err) {
        res.status(500).send({
            success: 0,
            message: err.message,
        });
    }
}

const addBedWakeupTime = async (req, res) => {
    try {
        const { id, wakeupTime } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: 0,
                message: "User not found",
            });
        }

        user.sleepWakeUpTime = wakeupTime;
        await user.save();

        res.send({
            success: 1,
            message: "Wakeup time added successfully",
        });
    } catch (err) {
        res.status(500).send({
            success: 0,
            message: err.message,
        });
    }
}

const addSleepHours = async (req, res) => {
    try {
        const { id, sleepHours } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: 0,
                message: "User not found",
            });
        }

        user.sleepHours = sleepHours;
        await user.save();

        res.send({
            success: 1,
            message: "Sleep hours added successfully",
        });
    } catch (err) {
        res.status(500).send({
            success: 0,
            message: err.message,
        });
    }
}

const getSleepScore = async (req, res) => {
    try {
        const { id } = req.user;
        if (!id) {
            return res.status(400).send({
                success: 0,
                message: 'Provide user id',
            });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({
                success: 0,
                message: 'User not found',
            });
        }

        const sleepScore = calculateSleepScore(user);
        res.send({
            success: 1,
            sleepScore,
        });

    } catch (err) {
        res.status(500).send({
            success: 0,
            message: err.message,
        });
    }
}

module.exports = {
    addSleepChanges,
    addSleepStruggleDuration,
    addBedSleepTime,
    addBedWakeupTime,
    addSleepHours,
    register,
    login,
    hello,
    getSleepScore,
}