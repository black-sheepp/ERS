const mongoose = require("mongoose");

const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join('/Uploads/users/avatars')
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
     },
     {
          timestamps: true,
     }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
