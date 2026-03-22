// Import the necessary modules here
import nodemailer from "nodemailer";

export const sendWelcomeEmail = async (user) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.STORFLEET_SMPT_MAIL,
      pass: process.env.STORFLEET_SMPT_MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.STORFLEET_MAIL,
    to: user.email,
    subject: "Welcome to StoreFleet! 🎉",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 40px auto;
                  background-color: #ffffff;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              }
              .header {
                  background-color: #20d49a;
                  text-align: center;
                  padding: 30px 20px;
              }
              .logo {
                  max-width: 150px;
              }
              .header h1 {
                  color: #ffffff;
                  margin: 10px 0 0;
                  font-size: 24px;
              }
              .content {
                  padding: 30px 40px;
                  color: #333333;
              }
              .content h2 {
                  color: #20d49a;
              }
              .button {
                  display: inline-block;
                  margin-top: 20px;
                  padding: 12px 28px;
                  background-color: #20d49a;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 5px;
                  font-weight: bold;
              }
              .footer {
                  text-align: center;
                  padding: 20px;
                  font-size: 12px;
                  color: #aaaaaa;
                  background-color: #f9f9f9;
              }
              @media only screen and (max-width: 600px) {
                  .content { padding: 20px; }
                  .logo { max-width: 100px; }
                  .button { display: block; text-align: center; }
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <img class="logo" src="https://files.codingninjas.in/logo1-32230.png" alt="StoreFleet Logo">
                  <h1>Welcome to StoreFleet!</h1>
              </div>
              <div class="content">
                  <h2>Hello, ${user.name}! 👋</h2>
                  <p>We're thrilled to have you on board. StoreFleet is your one-stop destination for instant delivery of groceries, electronics, smartphones, and much more — delivered to your doorstep in no time!</p>
                  <p>Here's what you can do now:</p>
                  <ul>
                      <li>🛍️ Browse thousands of products</li>
                      <li>⚡ Get instant delivery on your orders</li>
                      <li>⭐ Rate and review products</li>
                      <li>🔐 Manage your profile securely</li>
                  </ul>
                  <p>Start shopping now and experience the fastest delivery service!</p>
                  <a class="button" href="${process.env.FRONTEND_URL || '#'}">Start Shopping</a>
              </div>
              <div class="footer">
                  <p>© ${new Date().getFullYear()} StoreFleet. All rights reserved.</p>
                  <p>If you did not create an account, please ignore this email.</p>
              </div>
          </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};
