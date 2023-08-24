const Review = require("../Models/review");
const User = require("../Models/user");
module.exports.createUser = async function (req, res) {
     try {
          if (req.body.password != req.body.confirm_password) {
               console.log("password not matched");
               return res.redirect("back");
          }

          let user = await User.findOne({ email: req.body.email });

          if (!user) {
               User.create(req.body);
               req.flash("success", "User Created");
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

module.exports.createSession = function (req, res) {
     if (req.user.role == "Admin") {
          req.flash("success", "Logged in Successfully");
          return res.redirect("/user/admin-dash");
     } else if(req.user.role == "Employee"){
          req.flash("success", "Logged in Successfully");
          return res.redirect("/user/employee-dash");
     }
     else{
          req.flash("success", "Logged in Successfully");
          return res.redirect("/user/user-not-found");
     }
};

module.exports.adminDash = async function (req, res) {
     return res.render("adminDash", {
          title: "Admin",
          allUser: await User.find({}).sort({ firstName: 1 }),
          reviewTask: await Review.find({ senderAdmin: req.user.id, reviewDone: true })
               .sort({ createdAt: -1 })
               .populate({ path: "senderAdmin", select: ["firstName", "lastName"] })
               .populate({ path: "reviewer", select: ["firstName", "lastName"] })
               .populate({ path: "reviewToUser", select: ["firstName", "lastName"] }),
     });
};

module.exports.employeeDash = async function (req, res) {
     try {
          const findReview = await Review.find({ reviewer: req.user.id, reviewDone: false })
               .sort({ updatedAt: -1 })
               .populate({ path: "senderAdmin", select: ["firstName", "lastName"] })
               .populate({ path: "reviewer", select: ["firstName", "lastName"] })
               .populate({ path: "reviewToUser", select: ["firstName", "lastName"] });

          const reviewHistory = await Review.find({ reviewer: req.user.id, reviewDone: true })
               .sort({ updatedAt: -1 })
               .populate({ path: "senderAdmin", select: ["firstName", "lastName"] })
               .populate({ path: "reviewer", select: ["firstName", "lastName"] })
               .populate({ path: "reviewToUser", select: ["firstName", "lastName"] });

          const review = findReview || ""; // Set review to an empty string if findReview is falsy

          return res.render("employeeDash", {
               title: "Employee",
               review: review,
               reviewHistory: reviewHistory,
          });
     } catch (err) {
          // Handle any errors that occur during the process
          console.error(err);
          // Optionally, you can send an error response to the client
          return res.status(500).json({ error: "Internal Server Error" });
     }
};

module.exports.signOut = function (req, res) {
     req.logout(function (err) {
          if (err) {
               return next(err);
          }
          req.flash("success", "Logged out Successfully");
          res.redirect("/");
     });
};

module.exports.openProfile = async function (req, res) {
     const reviewRecord = await Review.find({ reviewToUser: req.params.id, reviewDone: true })
          .sort({ updatedAt: -1 })
          .populate({ path: "senderAdmin", select: ["firstName", "lastName"] })
          .populate({ path: "reviewer", select: ["firstName", "lastName"] })
          .populate({ path: "reviewToUser", select: ["firstName", "lastName"] });

     return res.render("profile", {
          title: "Profile",
          userone: await User.findById(req.params.id),
          reviewRecord: reviewRecord,
     });
};

module.exports.updateProfile = async function (req, res) {
     return res.render("updateProfile", {
          title: "Update Profile",
          userone: await User.findById(req.params.id),
     });
};

module.exports.pleaseUpdate = async function (req, res) {
     if (req.params.id) {
          try {
               let user = await User.findById(req.params.id);
               User.uploadedAvatar(req, res, function (err) {
                    if (err) {
                         console.log("*********Multer Error:", err);
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
                    user.role = req.body.role;

                    if (req.file) {
                         user.avatar = User.avatarPath + "/" + req.file.filename;
                    }
                    user.save();
                    req.flash("success", "Profile Updated!!");
                    return res.redirect("back");
               });
          } catch (err) {
               console.log(err);
          }
     } else {
          return res.status(401).send("Unauthorised");
     }
};

module.exports.createEmployee = function (req, res) {
     return res.render("createEmployee", {
          title: "New Employee",
     });
};

module.exports.assignTask = async function (req, res) {
     return res.render("assignTask", {
          title: "Assign Task",
          allUser: await User.find({}).sort({ firstName: 1 }),
          reviewPending: await Review.find({ senderAdmin: req.user.id, reviewDone: false })
               .sort({ createdAt: -1 })
               .populate({ path: "senderAdmin", select: ["firstName", "lastName"] })
               .populate({ path: "reviewer", select: ["firstName", "lastName"] })
               .populate({ path: "reviewToUser", select: ["firstName", "lastName"] }),
          reviewDone: await Review.find({ senderAdmin: req.user.id, reviewDone: true })
               .sort({ createdAt: -1 })
               .populate({ path: "senderAdmin", select: ["firstName", "lastName"] })
               .populate({ path: "reviewer", select: ["firstName", "lastName"] })
               .populate({ path: "reviewToUser", select: ["firstName", "lastName"] }),
     });
};

module.exports.perfomAssignTask = async function (req, res) {
     try {
          if (req.user.role == "Admin") {
               if (req.body.reviewer != req.body.reviewToUser) {
                    let review = await Review.create({
                         rating: 0,
                         review: "",
                         senderAdmin: req.body.senderAdmin,
                         reviewer: req.body.reviewer,
                         reviewToUser: req.body.reviewToUser,
                         reviewDone: false,
                    });
                    console.log(review);
                    req.flash("success", "Review Task Assigned!");
                    return res.redirect("back");
               } else {
                    req.flash("error", "Employee cannot review own profile!");
                    return res.redirect("back");
               }
          } else {
               req.flash("error", "You are not Admin !");
               return res.redirect("back");
          }
     } catch (err) {
          console.log("Errror in setting up the user " + err);
          req.flash("error", "Internal Server Error");
     }
};

module.exports.reviewDone = async function (req, res) {
     try {
          const review = await Review.findOneAndUpdate(
               { reviewToUser: req.params.id, reviewDone: false },
               {
                    rating: req.body.rating,
                    review: req.body.review,
                    reviewDone: true,
               }
          );

          let allReviews = await Review.find({ reviewToUser: req.params.id, reviewDone: true });
          let usercall = req.params.id
          await calculateStar(allReviews, usercall);

          await req.flash("success", "Review Submitted!");
          return res.redirect("/user/employee-dash");
     } catch (error) {
          console.log(error);
     }
};

async function calculateStar(allReviews,usercall) {
     let reviewCount = 0;
     let reviewSum = 0;
     let finalReviewAvg = 0;
     for (let reviewOne of allReviews) {
          reviewSum += reviewOne.rating;
          reviewCount++;
     }
     finalReviewAvg = reviewSum / reviewCount;

     await User.findOneAndUpdate(
          { _id: usercall},
          {
               star: finalReviewAvg,
          }
     );

     return; 
}

module.exports.deleteUser = async function (req, res) {
     let deletedUser = await User.findByIdAndUpdate({ _id: req.params.id },{
          role: "",
     });
     console.log(deletedUser);
     req.flash("success", "Employee Deleted!");
     return res.redirect("back");
};

module.exports.userNotFound = function(req,res){
     req.flash("error", "User not found as Admin/Employee!");
     return res.render('usernotfound',{
          title: "User Not Found"
     });
}

module.exports.archievedUser = async function(req,res){
     return res.render("archivedUser", {
          title: "Archived Users",
          allUser: await User.find({}).sort({ firstName: 1 }),
          reviewTask: await Review.find({ senderAdmin: req.user.id, role: "" })
               .sort({ createdAt: -1 })
               .populate({ path: "senderAdmin", select: ["firstName", "lastName"] })
               .populate({ path: "reviewer", select: ["firstName", "lastName"] })
               .populate({ path: "reviewToUser", select: ["firstName", "lastName"] }),
     });
} 