const express=require("express")

const {connectToMongodb}=require("./connect")
const app=express()
const port=1000
connectToMongodb("mongodb://127.0.0.1:27017/CourseProject")
// app.use(cookieparser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set("view engine" ,"ejs")
app.set("views",path.resolve("./views"))

app.listen(port,()=>{
    console.log('server started on port',port);
    
})