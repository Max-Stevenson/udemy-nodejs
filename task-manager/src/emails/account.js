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

const cancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: email,
        subject: 'We\'re sorry to see you go!',
        text: `${name}, Why did you leave - was it something we said?`
    })
}

module.exports = {
    sendWelcomeEmail,
    cancelationEmail
}