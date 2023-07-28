const { SESClient, SendBulkTemplatedEmailCommand } = require('@aws-sdk/client-ses');
const { getTemplateNameByType } = require('../helpers/getTemplateName');
const { getDynamicTemplateDataByType } = require('../helpers/getDynamicTemplateData');
const SES_CONFIG = {
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: process.env.AWS_SES_REGION
}

//creating new ses service object
const sesClient = new SESClient(SES_CONFIG)

const sendBulkTemplateEmailAwsSES = async (users,filePath,type) => {

    const sendBulkTemplatedEmailCommand = new SendBulkTemplatedEmailCommand({
        Destinations: users.map((user) => ({
            Destination: { ToAddresses: [user?.Email_Id] },
            ReplacementTemplateData: JSON.stringify(getDynamicTemplateDataByType(user,type)),
        })),

        DefaultTemplateData: JSON.stringify({
            fullname: 'Na',
            uid: 'Na uid',
            usernameLms: 'Na username lms',
            passwordLms: 'Na password lms',
            usernameUni: 'Na username uni',
            passwordUni: 'Na password uni'
        }),
        Source: process.env.AWS_SES_SENDER,
        Template: getTemplateNameByType(type),
    })

    try {
        await sesClient.send(sendBulkTemplatedEmailCommand)
    } catch (error) {
        console.log(error)
    }
}

module.exports = sendBulkTemplateEmailAwsSES