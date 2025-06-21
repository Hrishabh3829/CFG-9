import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail', // or your email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // Use app password for Gmail
    },
  });
};

// Send verification email
export const sendVerificationEmail = async (email, verificationToken, userName) => {
  try {
    const transporter = createTransporter();
    
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'CRY - Email Verification',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #000; color: #FFD700; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">CRY - Child Rights and You</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Welcome to CRY, ${userName}!</h2>
            
            <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
              Thank you for registering with CRY. To complete your registration and access your account, 
              please verify your email address by clicking the button below:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background-color: #000; color: #FFD700; padding: 12px 30px; 
                        text-decoration: none; border-radius: 5px; display: inline-block; 
                        font-weight: bold;">
                Verify Email Address
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
              If the button doesn't work, you can copy and paste this link into your browser:
            </p>
            
            <p style="color: #333; font-size: 12px; word-break: break-all; background-color: #eee; 
                       padding: 10px; border-radius: 3px;">
              ${verificationUrl}
            </p>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              This verification link will expire in 24 hours. If you didn't create an account with CRY, 
              please ignore this email.
            </p>
          </div>
          
          <div style="background-color: #000; color: #FFD700; padding: 15px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">Ensuring happier childhoods by mobilizing potential and inspiring action.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
};

// Send password reset email (bonus feature)
export const sendPasswordResetEmail = async (email, resetToken, userName) => {
  try {
    const transporter = createTransporter();
    
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'CRY - Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #000; color: #FFD700; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">CRY - Child Rights and You</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Password Reset Request</h2>
            
            <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
              Hello ${userName}, we received a request to reset your password. 
              Click the button below to create a new password:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #000; color: #FFD700; padding: 12px 30px; 
                        text-decoration: none; border-radius: 5px; display: inline-block; 
                        font-weight: bold;">
                Reset Password
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
              If the button doesn't work, you can copy and paste this link into your browser:
            </p>
            
            <p style="color: #333; font-size: 12px; word-break: break-all; background-color: #eee; 
                       padding: 10px; border-radius: 3px;">
              ${resetUrl}
            </p>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              This reset link will expire in 1 hour. If you didn't request a password reset, 
              please ignore this email.
            </p>
          </div>
          
          <div style="background-color: #000; color: #FFD700; padding: 15px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">Ensuring happier childhoods by mobilizing potential and inspiring action.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
}; 