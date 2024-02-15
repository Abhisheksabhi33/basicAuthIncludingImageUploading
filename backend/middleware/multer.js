const multer = require('multer');

const storage = multer.diskStorage({});

const imageFileFilter = (req, file, cb) => {
    
    if(!file.mimetype.startsWith('image')){
         cb('Not an image! Please upload an image', false);
    }

   cb(null, true);
}



exports.uploadingImage = multer({storage, fileFilter: imageFileFilter});