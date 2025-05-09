const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const createTable= require("./database/createTable");
const db=require("./database/createDataBase")
 require("dotenv").config();
const app = express();

const port = process.env.PORT || 3004;
// console.log(process.env.NAME,"HELLO");
createTable();
// db.close();
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
//app.use("/api/police",require("./routes/contactRoutes"));// there is no any error in the route i just need to use localhost:4023/api/police
// app.use("/api/police/admin",require("./routes/policeOfficerAdminRoute"));
app.use("/api/police/police/officer",require("./routes/policeOfficerRoute"));
app.use("/api/admin",require("./routes/policeOfficerAdminRoute/policeOfficerAdminRoute"));
app.use("/api/police/root",require("./routes/routesForRootAdmin/rootAdminRoute"));
app.use(errorHandler);




// app.get("/api/police",(req,res)=>{
//   const ourStatment = db.prepare("INSERT INTO region (regionId, regionName) VALUES('Addis Ababa', 1)");
//   const result=ourStatment.run();
//   if(!result){
//     console.log("there is a problem with the data you are trying to insert");;
//   }
//   console.log(result)
//   res.send("hello from add region route")

// })

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});