const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to,from ,subject, templateId, dynamicTemplateData) => {
    const msg = {
        to: to,
        from:  {
            email: from,
            name: "Chandigarh University - Online Learning"
          },
        subject,
        templateId,
        dynamicTemplateData
    };
    try {
        await sgMail.send(msg)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = sendEmail