const router = require("express").Router();
const passport = require("passport");
const userctrl = require("../Controller/user");

router.post("/create-user", userctrl.createUser);
router.post(
     "/create-session",
     passport.authenticate("local", {
          failureRedirect: "/sign-in",
     }),
     userctrl.createSession
);
router.get('/auth/google',passport.authenticate('google',{scope: ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/sign-in'}),userctrl.createSession)
router.get("/admin-dash", passport.checkAuthentication, userctrl.adminDash);
router.get("/employee-dash", passport.checkAuthentication, userctrl.employeeDash);
router.get("/sign-out", passport.checkAuthentication, userctrl.signOut);
router.get('/profile/:id',passport.checkAuthentication,userctrl.openProfile);
router.get('/update-profile/:id',passport.checkAuthentication,userctrl.updateProfile)
router.post('/update-success/:id',passport.checkAuthentication,userctrl.pleaseUpdate)
router.get('/createEmployee',passport.checkAuthentication,userctrl.createEmployee)
router.post('/feedback-submit',passport.checkAuthentication,userctrl.feedbackSubmit)
router.get('/assign-task',passport.checkAuthentication, userctrl.assignTask)

module.exports = router;
