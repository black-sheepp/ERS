const mongoose = require("mongoose");

const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join("/Uploads/users/avatars");

const userSchema = new mongoose.Schema(
     {
          firstName: {
               type: String,
               required: true,
          },
          lastName: {
               type: String,
               required: true,
          },
          email: {
               type: String,
               required: true,
               unique: true,
          },
          password: {
               type: String,
               required: true,
          },
          address: {
               type: String,
               required: true,
          },
          github: {
               type: String,
               required: true,
          },
          linkedIn: {
               type: String,
               required: true,
          },
          companyName: {
               type: String,
               required: true,
          },
          jobProfile: {
               type: String,
               required: true,
          },
          skills: {
               type: String,
               required: true,
          },
          phone: {
               type: Number,
               required: true,
          },
          role: {
               type: String,
               required: true,
          },
          avatar: {
               type: String,
          },
     },
     {
          timestamps: true,
     }
);

const storage = multer.diskStorage({
     destination: function (req, file, cb) {
          cb(null, path.join(__dirname,'..', AVATAR_PATH));
     },
     filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + "-" + uniqueSuffix);
     },
});

// static mehtods to access publically
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model("User", userSchema);
module.exports = User;
