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
router.get("/admin-dash", passport.checkAuthentication, userctrl.adminDash);
router.get("/employee-dash", passport.checkAuthentication, userctrl.employeeDash);
router.get("/sign-out", passport.checkAuthentication, userctrl.signOut);
router.get('/profile/:id',passport.checkAuthentication,userctrl.openProfile);
router.get('/update-profile/:id',passport.checkAuthentication,userctrl.updateProfile)

module.exports = router;
