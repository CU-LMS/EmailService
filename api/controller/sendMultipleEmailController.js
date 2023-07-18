const csv = require('csvtojson')
const sendEmail = require('../utils/emailMultiple')

const sendMultipleEmail = async (req, res) => {
    try {
        const file = req.file
        if (!file) {
            throw new Error('Please upload a file')
        }
        const jsonArrayData = await csv().fromFile(req.file.path);
        for (const recipient of jsonArrayData) {
            const dynamicTemplateData = {
                fullname: recipient?.Student_Name,
                uid: recipient?.UID,
                usernameLms: recipient?.LMS_User_Id,
                passwordLms: recipient?.LMS_Password,
                usernameUni: recipient?.CUCHD_Email, 
                passwordUni: recipient?.Cuchd_Password
            }
            const to = recipient.Email_Id
            await sendEmail(to, process.env.SENDDGRID_SENDER, 'UIMS and LMS credentials-Chandigarh University Online Learning', process.env.SENDGRID_CREDENTIALS_TEMPLATEID, dynamicTemplateData);
        }
        res.status(201).json({ msg: "All mail sent successfully" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

module.exports = {
    sendMultipleEmail
}
