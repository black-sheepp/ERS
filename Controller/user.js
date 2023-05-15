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

module.exports.adminDash = async function(req,res){
     
     return res.render("adminDash",{
          title: "Admin",
          allUser: await User.find({}).sort({firstName: 1})
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

module.exports.openProfile = async function(req,res){
     return res.render("profile",{
          title: "Profile",
          userone: await User.findById(req.params.id)
     })
}

module.exports.updateProfile = function(req,res){
     return res.render("updateProfile",{
          title: 'Update Profile'
     })
}

module.exports.pleaseUpdate = async function(req,res){
     try{
          let user = await User.findOne(req.params._id);
          if(user){
               let updatedUser = await User.findByIdAndUpdate(req.params.id,req.body);
               if(updatedUser){
                    return res.redirect('back')
               }
          }else{
               console.log("Unauthorised User")
          }
     }catch(err){
          console.log(err)
     }
}