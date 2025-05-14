const express=require("express")
const path=require("path")
require('./middlewares/passport');
const {connectToMongodb}=require("./connect")
const app=express()
const expressSession=require("express-session")
const cookieparser=require("cookie-parser")
const passport=require("passport")
const userroute=require("./routes/user")
const port=1000
connectToMongodb("mongodb://127.0.0.1:27017/CourseProject")
// app.use(cookieparser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set("view engine" ,"ejs")
app.use(cookieparser())
app.use(passport.initialize())
app.use(expressSession({
    secret: 'Sanchit@123$', 
    resave: false,
    saveUninitialized: true
  }));
app.use(passport.session())
app.set("views",path.resolve("./views"))
app.use("/",userroute)
app.listen(port,()=>{
    console.log('server started on port',port);
    
})
