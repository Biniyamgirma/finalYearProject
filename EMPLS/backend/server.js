const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const createTable= require("./database/createTable");
const db=require("./database/createDataBase")
 require("dotenv").config();
const app = express();
const { generateToken, comparePassword } = require('./utils/jwtUtils');
const port = 3004;
const cors = require("cors");

// console.log(process.env.NAME,"HELLO");
// createTable();
// const token = generateToken({
//     policeOfficerId: "PO00002",
//     role: 4,
//     policeStationId: "PS00001",
//     townId: 1
// });
// console.log(token);
// db.prepare(`
//   ALTER TABLE policeOfficer ADD COLUMN profilePicture TEXT;
// `).run();
// db.close();
//middelware for handling
// adding a column to a table
// try {
//     db.prepare('ALTER TABLE policeOfficer ADD COLUMN profilepicture TEXT').run();
//     console.log('Column added successfully');
// } catch (err) {
//     console.error('Error adding column:', err);
// } finally {
//     db.close();
// }
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(function(req,res,next){
    res.locals.errors=[];

    // if (token) {
    //   try {
    //     const token = req.header('Authorization')?.replace('Bearer ', '');
    //     req.user = decoded;
    //   } catch (err) {
    //     req.user = null;
    //   }
    // } else {
    //   req.user = null;
    // }
    
    // res.locals.user = req.user;
    // console.log(process.env.JWTSECRET);
    next();
})
//app.use("/api/police",require("./routes/contactRoutes"));// there is no any error in the route i just need to use localhost:4023/api/police
// app.use("/api/police/admin",require("./routes/policeOfficerAdminRoute"));
app.use("/api/police/police/officer",require("./routes/policeOfficerRoute"));
app.use("/api/admin",require("./routes/policeOfficerAdminRoute/policeOfficerAdminRoute"));
app.use("/api/police/root",require("./routes/routesForRootAdmin/rootAdminRoute"));
app.use("/api/police",require("./routes/loginRoute/loginRoute"));
app.use("/api/post",require("./routes/postRoute/postRoute"));
app.use("/api/report",require("./routes/reportRoute/reportRoute"));
app.use("/api/message",require("./routes/messageRoute/messageRoute"));



app.use("/api/test",require("./routes/test/routeTest"));
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