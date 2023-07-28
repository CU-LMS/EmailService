const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('put_your_key_here');

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