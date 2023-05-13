const User = require('../Models/user')
module.exports.createUser = async function (req, res) {
    try {
         if (req.body.password != req.body.confirm_password) {
              console.log("password not matched");
              return res.redirect("back");
         }

         let user = await User.findOne({ email: req.body.email });

         if (!user) {
              User.create(req.body);
              return res.redirect("/sign-in");
         }

         if (user) {
              return res.redirect("/sign-in");
         } else {
              return res.redirect("back");
         }
    } catch (err) { 
         console.log(err);
    }
};