const router = require("express").Router()
const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,     
      email: req.body.email,
      password: hashPass,
    }); 

    const user = await newUser.save();
    res.status(200).json({msg:"User created!",user});
  } catch (error) {
    res.status(500).json(error);
  }
}); 
 
//Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Validate

  if (!username) {
    return res.status(404).json("Email required!");
  }
  if (!password) {
    return res.status(404).json("Password required!");
  }
 
  //Check user exists
  const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json("User not exists!");
    }

  //Check if password match
  const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
    return res.status(404).json({msg:"Autentication is successfully", token}); 
    }

  try {
    const secret = process.env.SECRET;
  
    const token = jwt.sign(
      { 
         id:user.id
      },
      secret,   
    )
    res.cookie("Access_token", token, {  
      httpOnly: true 
    })
    res.status(200).json(username) 
    
    
  } catch (error) {
    console.log(error);
    res.status(500).json("Error at the Server");
    
  }
   
});

router.post("/logout", async (req, res) => {
  res.clearCookie("Access_token", {
    sameSite:"none",
    secure:true
  })
  .status(200).json({msg:"User has been logged out."}) 
})
 
module.exports = router;
