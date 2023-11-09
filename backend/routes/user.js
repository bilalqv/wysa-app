const express = require('express');
const userController = require('../controllers/user');
const { isLogin } = require('../middleware/auth');

const router = express.Router();

router.get('/', userController.hello); // dummy route for testing
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/addnickname', userController.addNickname);
router.post('/addsleepchanges', isLogin, userController.addSleepChanges);
router.post('/addsleepstruggle', isLogin, userController.addSleepStruggleDuration);
router.post('/addbedtime', isLogin, userController.addBedSleepTime);
router.post('/addwakeuptime', isLogin, userController.addBedWakeupTime);
router.post('/addsleephours', isLogin, userController.addSleepHours);



module.exports = router;