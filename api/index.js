const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const authRouter = require("./routers/auth.js");
const multer = require("multer");
const userRouter = require("./routers/users.js");
const postRouter = require("./routers/posts.js");
const categoriesRouter = require("./routers/categories.js");
const cookieParser = require("cookie-parser");
// const apiConfig = require("./api.config.js")
const cors = require("cors");
// apiConfig.headers()

dotenv.config();
const app = express();

 
 
app.use(express.json());
app.use(cookieParser());
app.use(cors());
  
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
  }).then(console.log("Connection MongoDB!"))
  .catch(err => console.log(err));
  
  const storage = multer.diskStorage({
    destination: function (req, res, cb){
      cb(null,'../client/public/upload')
    },
    filename: function (req, file, cb){
      cb(null, Date.now() + file.originalname)
    },
  })
  
  const upload = multer({ storage })
  
  app.post('/api/upload', upload.single("file"), function(req,res){
      const file = req.file;
      res.status(200).json(file.filename)
  })
  
app.use("/api/auth", authRouter);     
app.use("/api/users", userRouter);
app.use("/api/post", postRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", categoriesRouter);    

const PORT = process.env.PORT_URL   

app.listen(PORT, () => console.log(`Backend is running at port: ${PORT}`));      