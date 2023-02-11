const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const authRouter = require("./routers/auth.js");
const multer = require("multer")
const userRouter = require("./routers/users.js");
const postRouter = require("./routers/posts.js");
const categoriesRouter = require("./routers/categories.js");
const cookieParser = require("cookie-parser");
// const apiConfig = require("./api.config.js")
const cors = require("cors")
// apiConfig.headers()

dotenv.config()
const app = express() 
 
 
 
app.use(express.json())
app.use(cookieParser())
app.use(cors())
  
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
  }).then(console.log("Connection MongoDB!"))
  .catch(err => console.log(err)) 
 
  const storege = multer.diskStorage({
    destination:(req, file, cb) => {   
      cb(null, "images")
    },
    filename:(req, file, cb) => {
      cb(null, req.body.name);
    },    
  }); 

  const upload = multer({ storage: storege });
 
app.post("/api/upload", upload.single("file"),(req, res) => {
  res.status(200).json("File has been uploaded")
})
  
app.use("/api/auth", authRouter)   
app.use("/api/users", userRouter)
app.use("/api/post", postRouter)
app.use("/api/posts", postRouter)
app.use("/api/categories", categoriesRouter) 

const PORT = process.env.PORT_URL

app.listen(PORT, () => console.log(`Backend is running at port: ${PORT}`));   