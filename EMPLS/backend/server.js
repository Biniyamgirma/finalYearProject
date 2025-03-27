const express = require("express");
const errorHandler = require("./middleware/errorHandler");
 require("dotenv").config();
const app = express();
const port = process.env.PORT || 3004;
// console.log(process.env.NAME,"HELLO");

//middelware for handling
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(function(req,res,next){
    res.locals.errors=[];

    // try to decode incoming cookie
      try {
        const decoded = jwt.verify(req.cookies.ourSimpleApp, process.env.ENCRYPTIONKEY)
        req.user = decoded
      } catch (error) {
        req.user = false
      }
      res.locals.user = req.user
     // console.log(req.user)
    next();
})
app.use("/api/police",require("./routes/contactRoutes"));// there is no any error in the route i just need to use localhost:4023/api/police
app.use("/api/police/admin",require("./routes/policeOfficerAdminRoute"));
app.use("/api/police/police/officer",require("./routes/policeOfficerRoute"));
app.use("/api/police/user",require("./routes/regularUserRoute"));
app.use("/api/police/root",require("./routes/rootAdminRoute"));
app.use(errorHandler);
//@server port listener i dont know why but it uses port 3004 not the env port

// app.get("/api/police",(req,res)=>{
//     res.json({message:"hello from server if this message displays this mean that the error is in the middle ware"})
// })

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});