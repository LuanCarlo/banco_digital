var multer = require('multer');
var path = require('path');
var crypto = require('crypto');



module.exports = {
    dest: path.resolve(__dirname, '..','..', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..','..', 'uploads'))
        },
        filename: (req, file, cb) => {
            fileName = file.originalname;

            cb (null, fileName);
        }
    }),
    limits: {
        fileSize: 6 * 1024 + 1024
    }, 
    filrFilter: (req, file, cb) => {
        var allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
        ];

        if (allowedMimes.includes(file.mimetype)){
            cb(null, true);
        } else {
            console.log('erro');
            cb(new Error('invalid file type'));
        }
    }
};