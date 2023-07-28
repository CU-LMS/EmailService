
//get template name according to type
const getTemplateNameByType = (type)=>{
    let templateName = ''
    switch (type) {
        case 'ol':
            templateName = process.env.AWS_SES_CREDENTIAL_IDOL_TEMPLATE_OL
            break;
        case 'odl':
            templateName = process.env.AWS_SES_CREDENTIAL_IDOL_TEMPLATE_ODL
            break;
        case 'pending_documents':
            templateName = process.env.AWS_SES_CREDENTIAL_IDOL_TEMPLATE_PENDING
            break;
        default:
            templateName = process.env.AWS_SES_CREDENTIAL_IDOL_TEMPLATE_DEFAULT
            break;
    }
    return templateName
}

module.exports = {
    getTemplateNameByType
}