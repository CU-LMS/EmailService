const multer = require("multer");
const { sendMultipleEmail } = require("../controller/sendMultipleEmailController");
const router = require('express').Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + '-' +file.originalname)
    }
})

const upload = multer({ storage: storage })

// const upload = multer({ dest: './public/uploads' })

router.route('/email/multiple').post(upload.single('uploadField'), sendMultipleEmail)



module.exports = router