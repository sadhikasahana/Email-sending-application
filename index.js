const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); 
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sadhikasahana@gmail.com', 
        pass: 'hjzm xeul uwek' 
    }
});

app.post('/send-emails', (req, res) => {
    const { emails, prompt } = req.body; 

    const emailPromises = emails.map(emailData => {
        const { recipientEmail, companyName } = emailData;
        const emailContent = generateEmailContent(prompt, companyName);

        const mailOptions = {
            from: 'sadhikasahana@gmail.com',
            to: recipientEmail,
            subject: 'Testing',
            text: emailContent
        };

        return transporter.sendMail(mailOptions)
            .then(info => {
                console.log(`Email sent to ${recipientEmail}: ${info.response}`);
                return { recipientEmail, status: 'Sent', deliveryStatus: 'Delivered' };
            })
            .catch(error => {
                console.error(`Error sending email to ${recipientEmail}: ${error}`);
                return { recipientEmail, status: 'Failed', deliveryStatus: 'Bounced' };
            });
    });

    Promise.all(emailPromises)
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            console.error('Error processing email sending:', err);
            res.status(500).send('Error sending emails');
        });
});

function generateEmailContent(prompt, companyName) {
    return prompt.replace(/{Company Name}/g, companyName); 
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use((req, res) => {
    res.status(404).send('Sorry, we cannot find that!');
});
