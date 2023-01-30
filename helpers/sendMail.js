const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv')
dotenv.config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async(data) => {
    try {
        const email = {...data, from: 'pavlena@ukr.net'}
        await sgMail.send(email);
        return true;
    } catch (error) {
        throw error;
    }
}

module.exports = sendMail;