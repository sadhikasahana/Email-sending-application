# Email-sending-application

This project is a custom email-sending application that allows users to send personalized emails using data from a Google Sheet or CSV file. It features a user-friendly dashboard for tracking email status and analytics.

## Features

- Upload a CSV file or connect to a Google Sheet for email customization.
- Connect your email account securely using OAuth2 or SMTP.
- Customize email content using placeholders for personalized messages.
- Schedule emails for specific times with throttling options.
- Real-time analytics dashboard to track sent emails, pending emails, and delivery status.
- Integration with popular Email Service Providers (ESP) for email delivery tracking.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Email Sending**: Nodemailer
- **Data Handling**: CSV/Google Sheets API

## Prerequisites

- Node.js 
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sadhikasahana/Email-sending-application.git
   cd gmail-api-project
2. Install the required packages:
   ```bash
   npm install

3. Start the server:
   ```bash
   npm start

4. Open your browser and go to http://localhost:3000.

5. Upload a CSV file with the following columns: Company Name, Email
   
6. Enter a customizable prompt in the provided input box (use placeholders like {Company Name}).

7. Click on "Send Emails" to start sending personalized emails.
   
8. View the real-time analytics on the dashboard which will display: Total Emails Sent, Emails Pending


For any questions or inquiries, please reach out to me at sadhikasahana@gmail.com .  
