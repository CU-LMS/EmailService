
//dynamic template data
const getDynamicTemplateDataByType = (user,type) => {
    let dynamicTemplateData = {}
    switch (type) {
        case 'ol':
            dynamicTemplateData = {
                fullname: user?.Student_Name,
                uid: user?.UID,
                usernameLms: user?.LMS_User_Id,
                passwordLms: user?.LMS_Password,
                usernameUni: user?.CUCHD_Email,
                passwordUni: user?.CUCHD_Password
            }
            break;
        case 'odl':
            dynamicTemplateData = {
                fullname: user?.Student_Name,
                uid: user?.UID,
                usernameLms: user?.LMS_User_Id,
                passwordLms: user?.LMS_Password,
                usernameUni: user?.CUCHD_Email,
                passwordUni: user?.CUCHD_Password
            }
            break;
        case 'pending_documents':
            dynamicTemplateData = {
                fullname: user?.Name,
                userId: user?.UserId,
                dateString: user?.DateString,
                pending_documents: user?.Pending_Documents,
            }
            break;
        default:
            dynamicTemplateData = {

            }
            break;
    }
    return dynamicTemplateData
}

module.exports = {
    getDynamicTemplateDataByType
}