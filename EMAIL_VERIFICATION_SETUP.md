# Email Verification Setup Guide

This guide will help you set up email verification for your CRY application using Nodemailer.

## 🔧 Backend Environment Variables

Add these variables to your `Backend/.env` file:

```env
# Existing variables
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cry_db
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
NODE_ENV=development

# New email variables
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:5173
```

## 📧 Email Service Configuration

### Option 1: Gmail (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in `EMAIL_PASSWORD`

### Option 2: Other Email Services

You can modify the `emailService.js` file to use other services:

```javascript
// For Outlook/Hotmail
const transporter = nodemailer.createTransporter({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// For custom SMTP
const transporter = nodemailer.createTransporter({
  host: 'smtp.your-provider.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

## 🚀 How Email Verification Works

### 1. Registration Flow
1. User fills registration form
2. Backend creates user with `isVerified: false`
3. Generates unique verification token
4. Sends verification email with link
5. User receives email with verification link

### 2. Verification Flow
1. User clicks verification link in email
2. Frontend extracts token from URL
3. Backend verifies token and marks user as verified
4. User can now log in

### 3. Login Protection
- Users cannot log in until email is verified
- Clear error message guides users to check email

## 📋 API Endpoints

### New Endpoints Added:

1. **`GET /api/v1/user/verify-email/:token`**
   - Verifies email using token
   - Returns success/error message

2. **`POST /api/v1/user/resend-verification`**
   - Resends verification email
   - Requires email in request body

### Updated Endpoints:

1. **`POST /api/v1/user/register`**
   - Now sends verification email
   - Returns verification status

2. **`POST /api/v1/user/login`**
   - Now checks `isVerified` status
   - Blocks unverified users

## 🎨 Frontend Components

### New Components:
- **`EmailVerification.jsx`** - Handles verification process
- **Updated `Login.jsx`** - Shows verification messages

### Routes:
- **`/verify-email`** - Email verification page

## 🔒 Security Features

1. **Token Expiration**: Verification tokens expire after 24 hours
2. **Unique Tokens**: Each token is cryptographically secure
3. **One-time Use**: Tokens are cleared after verification
4. **Email Validation**: Prevents login without verification

## 🧪 Testing the Setup

### 1. Test Registration
```bash
# Register a new user
curl -X POST http://localhost:5000/api/v1/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "your-test-email@gmail.com",
    "password": "TestPass123!",
    "role": "frontliner"
  }'
```

### 2. Check Email
- Look for verification email in your inbox
- Check spam folder if not found

### 3. Test Verification
- Click the verification link in the email
- Should redirect to verification success page

### 4. Test Login
- Try logging in with the verified account
- Should work normally

## 🐛 Troubleshooting

### Common Issues:

1. **"Email could not be sent"**
   - Check `EMAIL_USER` and `EMAIL_PASSWORD` in `.env`
   - Verify Gmail app password is correct
   - Check if 2FA is enabled on Gmail

2. **"Invalid credentials" on login**
   - Make sure email is verified first
   - Check if verification link was clicked

3. **"Invalid or expired verification token"**
   - Token expires after 24 hours
   - Use resend verification endpoint

4. **CORS errors**
   - Ensure `FRONTEND_URL` is correct in `.env`
   - Check CORS configuration in `index.js`

### Debug Steps:

1. **Check Backend Logs**:
   ```bash
   cd Backend
   npm start
   # Look for email sending logs
   ```

2. **Check Email Service**:
   ```javascript
   // Add this to emailService.js for debugging
   console.log('Email config:', {
     user: process.env.EMAIL_USER,
     pass: process.env.EMAIL_PASSWORD ? 'SET' : 'NOT SET'
   });
   ```

3. **Test Email Service**:
   ```javascript
   // Add this to test email sending
   const testEmail = await sendVerificationEmail('test@example.com', 'test-token', 'Test User');
   console.log('Test email result:', testEmail);
   ```

## 🔄 Production Deployment

### Environment Variables for Production:
```env
NODE_ENV=production
EMAIL_USER=your-production-email@domain.com
EMAIL_PASSWORD=your-production-app-password
FRONTEND_URL=https://your-domain.com
```

### Security Considerations:
1. Use strong, unique app passwords
2. Enable HTTPS for secure cookie transmission
3. Use environment-specific email templates
4. Monitor email delivery rates
5. Set up email service monitoring

## 📞 Support

If you encounter issues:

1. Check the backend console for error messages
2. Verify all environment variables are set correctly
3. Test email service configuration
4. Check MongoDB connection
5. Review CORS settings

The email verification system is now fully integrated and ready to use! 