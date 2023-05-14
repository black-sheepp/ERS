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

module.exports.createSession = function(req,res){
     if(req.user.role == "Admin"){
          return res.redirect('/user/admin-dash')
     }else{
          return res.redirect('/user/employee-dash')
     }

}

module.exports.adminDash = function(req,res){
     return res.render("adminDash",{
          title: "Admin"
     })
}
module.exports.employeeDash = function(req,res){
     return res.render("employeeDash",{
          title: "Employee"
     })
}

module.exports.signOut = function(req,res){
     req.logout(function(err) {
          if (err) { return next(err); }
          res.redirect('/');
        });
}