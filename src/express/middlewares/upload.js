'use strict';

const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);

const PATH_UPLOAD = path.resolve(__dirname, `../public/img`);

/*
  TODO: необходимо добавить проверку на существовании директории, если она изменится
*/

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, PATH_UPLOAD);
  },
  filename(_req, file, cb) {
    const extension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${nanoid()}${extension}`);
  },
});

const upload = multer({storage});

module.exports = upload;
