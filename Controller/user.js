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
          req.flash('success','Logged in Successfully')
          return res.redirect('/user/admin-dash')
     }else{
          req.flash('success','Logged in Successfully')
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
          req.flash('success','Logged out Successfully')
          res.redirect('/');
        });
}

module.exports.openProfile = async function(req,res){
     return res.render("profile",{
          title: "Profile",
          userone: await User.findById(req.params.id)
     })
}

module.exports.updateProfile = async function(req,res){
     return res.render("updateProfile",{
          title: 'Update Profile',
          userone: await User.findById(req.params.id),
     })
}

module.exports.pleaseUpdate = async function(req,res){
     if(req.params.id){
          try{
               let user = await User.findById(req.params.id);
               User.uploadedAvatar(req,res,function(err){
                    if(err){
                         console.log('*********Multer Error:',err)
                    }
                    user.firstName = req.body.firstName;
                    user.lastName = req.body.lastName;
                    user.email = req.body.email;
                    user.phone = req.body.phone;
                    user.password = req.body.password;
                    user.address = req.body.address;
                    user.github = req.body.github;
                    user.linkedIn = req.body.linkedIn;
                    user.companyName = req.body.companyName;
                    user.jobProfile = req.body.jobProfile;
                    user.skills = req.body.skills;

                    if(req.file){
                         user.avatar  = User.avatarPath + '/' + req.file.filename;
                    }
                    user.save();
                    return res.redirect('back')

               })
          }catch(err){
               console.log(err)
          }
     }else{
          return res.status(401).send('Unauthorised')
     }
}