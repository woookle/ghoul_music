const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'image') {
      cb(null, 'uploads/images/');
    } else if (file.fieldname === 'audio') {
      cb(null, 'uploads/audios/');
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = uuidv4();
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;