require('dotenv').config();
const apiKey = process.env.SEND_GRID_API;
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(apiKey);

sgMail.send({
    to: '',
    from: '',
    subject: 'This is a test email',
    text: 'I hope this gets to you'
});