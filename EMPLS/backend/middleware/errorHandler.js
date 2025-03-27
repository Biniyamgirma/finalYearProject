const constants = require('../constants/constant');
const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode : 500;
    console.log(statusCode,":", constants.BAD_REQUEST);// the code has some bug on importing the values in constant module
   switch (statusCode) {
    case constants.SERVER_ERROR:
        res.json({title:"server error",message:err.message , stackTrace:err.stack});
        break;
   case constants.UN_AUTHORIZED:
    res.json({title:"trying to access unauthorize content",message:err.message , stackTrace:err.stack});
        break;
    case 400:
        res.json({title:"bad request",message:err.message , stackTrace:err.stack});
        break;
    case constants.NOT_FOUND:
        res.json({message:err.message , stackTrace:err.stack});
        break;
    case constants.REQUEST_TIMEOUT:
        res.json({message:err.message , stackTrace:err.stack});
        break;
    default: 
    console.log("no error ??/??");
        break;
   }
    
}

module.exports = errorHandler;