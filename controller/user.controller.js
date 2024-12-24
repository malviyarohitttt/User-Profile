let UserModel = require("../model/user.model.js");
var bcrypt = require("bcryptjs");
let cloudinary = require("../utility/cloudinary");
let fs = require("fs");

class Users {
  saveProfile = async (req, res) => {
    // console.log(req.file);
    let { name, email, password, mobile } = req.body;
    if (!(name && email && password && mobile)) {
      return res.status(400).send({ msg: "Please fill all the fields!" });
    }

    try {
      // Check if user already exists
      const isExist = await UserModel.findOne({
        $or: [{ email: req.body.email }, { mobile: req.body.mobile }],
      });

      if (isExist) {
        return res.status(409).json({
          status: "false",
          message: "User already exists",
        });
      }
      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      req.body.password = hashPassword; // Assign hashed password back to request body


      // upload image to cloudinary cloud
      let data = await cloudinary.uploader.upload(req.file.path, {
        folder: "UserProfileImages",
        resource_type: "auto",
      });
      if(data.secure_url){   // if image uploaded successfully then delete the image from local storage
        fs.unlinkSync(req.file.path);
      }
      req.body.image = data.secure_url; // Assign image url to request body 

      // Create a new user
      const newUser = new UserModel(req.body); 
      const response = await newUser.save();
      response.password = undefined;  // remove password from response object
      if (response) {  // If user saved successfully then send response
        return res.status(200).json({
          status: "true",
          message: "User saved successfully",
          data: response,
        });
      } else {  // If user save failed then send response with error message
        return res.status(400).json({
          status: "false",
          message: "User save failed",
        });
      }
    } catch (error) {   // If any error occurs then send response with error message
      return res.status(500).json({
        msg: "Unexpected Error!",
        error: error.message,
      });
    }
  };
}

module.exports = new Users();
