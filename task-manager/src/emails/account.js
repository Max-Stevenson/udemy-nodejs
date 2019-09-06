require('dotenv').config();
const apiKey = process.env.SEND_GRID_API;
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(apiKey);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: email,
        subject: 'Thanks for Joining!',
        // template strings
        text: `Welcome to the app, ${name}. Let me know if you have improvements!`
    })
};

module.exports = {
    sendWelcomeEmail
}