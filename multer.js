const multer = require('multer');
const path = require('path');

const DIR = './uploads';

let storage = multer.diskStorage({
  fileFilter:(req,file,callback)=>{
    if(path.extname(file.originalname)!=='.csv'){
      return callback(new Error('Only csv files allowed'));
    }
    callback(null,true)
  },
  destination:(req,file,callback)=>{
    callback(null,DIR);
  },
  filename:(req,file,cb)=>{
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

let storages = multer.diskStorage({
    destination:(req,file,callback)=>{
      callback(null,DIR);
    },
    filename:(req,file,cb)=>{
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  let uploadFile = multer({storage : storages});
  
let upload = multer({storage : storage});

module.exports.upload = upload;
module.exports.uploadFile = uploadFile;