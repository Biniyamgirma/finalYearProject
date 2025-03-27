
// @desc get all the posts from our database my sqilite 
//@route GET /api/police
//@access point for know public
const getContacts = (req,res)=>{
    res.json({message:"this data is from the contact controller"})
};

// // @desc create a new post in our database
// //@route POST /api/police
// //@access point for know public
// const createContact = (req,res)=>{
//     console.log(req.body);
//     const {townId, subCityId, postDescription, firstName, middleName, lastName, age, lastLocation, gender, policeStationId, policeOfficerId, postStatus, personStatus, imagePath}=req.body;
//     const ourStatment = db.prepare("INSERT INTO  posts(townId, subCityId, postDescription, firstName, middleName, lastName, age, lastLocation, gender, policeStationId, policeOfficerId, postStatus, personStatus, imagePath) VALUES (?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?)")
//     const result = ourStatment.run(townId,subCityId,postDescription,firstName,middleName,lastName,age,lastLocation,gender,policeStationId,policeOfficerId,postStatus,personStatus,imagePath)// i have added re.user.userId i dont know if this will make an error or not 
//     const lookupStatement=db.prepare("SELECT * FROM posts WHERE ROWID = ?")
//     const ourUser = lookupStatement.get(result.lastInsertRowid);

//     //)
    

//   console.log(result)
//     const getPostStatement = db.prepare("SELECT * FROM posts WHERE ROWID=?")
//     const realPost = getPostStatement.get(result.lastInsertRowid)

//     res.redirect(`/post/${realPost.id}`)

//     // req.json().then((data) => {
//     //     
//     //   });
    
//     // if(!name || !age){
//     //     res.status(400);
//     //     throw new Error("all filds are required");
//     // }
//     // res.status(201);
//     // res.json({"message":"post method","name":`${name}`
//     // });
// }




// //@desc insert a new report in report table
// //@rout POST /api/police/report/userreport
// //@access point for know public

// const addReport = (req,res)=>{
//     const{postId,townId,subCityId,reportDescription,userId,policeStationId}=req.body;
//     const ourStatment = db.prepare("INSERT INTO  report(postId, townId, subCityId, reportDescription, userId, policeStationId) VALUES (?, ?, ?, ?,?,?)")
//     const result = ourStatment.run(postId,townId,subCityId,reportDescription,userId,policeStationId)

//     const lookupStatement=db.prepare("SELECT * FROM posts WHERE ROWID = ?")
//     const ourUser = lookupStatement.get(result.lastInsertRowid);
// }





// // @desc UPDATE a contact in the database
// //@route PUT /api/police:id
// //@access point for know public
// const updateContact = (req,res)=>{
//     res.status(200);
//     res.json({"message":`update contact${req.params.id}`});
// }
// // @desc delete a contact in our database
// //@route DELETE api/police:id
// //@access point for know public
// const deleteContact = (req,res)=>{
//     res.status(200);
//     res.json({"message":`delete contact${req.params.id}`});
// }
// // @desc get indvidual contact in our database
// //@route GET api/police:id
// //@access point for know public
// const getIndivdualContact = (req,res)=>{
//     res.status(200);
//     res.json({"message":`user contact${req.params.id}`});
// }
//, deleteContact, updateContact, createContact, getIndivdualContact
module.exports = {getContacts};