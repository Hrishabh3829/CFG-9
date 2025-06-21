# CRY Frontend-Backend Integration

This document outlines the integration between the frontend React application and the backend Node.js/Express API for the CRY (Child Rights and You) project.

## 🚀 Features Implemented

### Authentication System
- **JWT-based authentication** with secure cookie storage
- **Role-based access control** (Frontliner, NGO, Admin)
- **Protected routes** that require authentication
- **Automatic redirect** to login for unauthenticated users

### Frontend Components
- **Login/Signup Page** - Unified authentication interface
- **Dashboard** - Role-specific dashboards with different functionalities
- **ProtectedRoute** - Route wrapper for authentication checks
- **Updated Navbar** - Dynamic navigation based on auth status

### Backend API Endpoints
- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/login` - User login
- `POST /api/v1/user/logout` - User logout
- `GET /api/v1/user/profile` - Get user profile (protected)

## 🛠️ Setup Instructions

### Backend Setup
1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with:
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## 🔐 Authentication Flow

1. **Registration**: Users can register as either "Frontliner" or "NGO"
2. **Login**: Users authenticate with email and password
3. **Token Storage**: JWT tokens are stored in HTTP-only cookies
4. **Route Protection**: Protected routes check authentication status
5. **Dashboard Access**: Users are redirected to role-specific dashboards

## 👥 User Roles

### Frontliner
- Report child rights violations
- Track their reports
- Connect with NGOs
- Access training resources

### NGO
- Review and respond to reports
- Manage organization profile
- Coordinate with frontliners
- Access funding opportunities

### Admin
- Manage all users and organizations
- Review and approve reports
- Monitor system analytics
- Configure system settings

## 🔧 API Endpoints

### Public Endpoints
- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/user/login` - User login

### Protected Endpoints
- `GET /api/v1/user/profile` - Get user profile
- `POST /api/v1/user/logout` - User logout

## 🎨 Frontend Routes

- `/` - Home page
- `/login` - Authentication page
- `/dashboard` - Protected dashboard (role-specific)
- `/news` - News page
- `/contact` - Contact page

## 🔒 Security Features

- **JWT Tokens** stored in HTTP-only cookies
- **Password hashing** using bcrypt
- **CORS configuration** for cross-origin requests
- **Input validation** on both frontend and backend
- **Role-based authorization** middleware

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the backend CORS configuration includes your frontend URL
2. **Authentication Failures**: Check that JWT_SECRET is properly set in backend .env
3. **Cookie Issues**: Verify cookie settings work for your development environment
4. **Database Connection**: Ensure MongoDB connection string is correct

### Development Tips

- Use browser developer tools to check network requests
- Check browser console for frontend errors
- Monitor backend console for server logs
- Verify environment variables are loaded correctly

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cry_db
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_BACKEND_URL=http://localhost:5000
```

## 🚀 Deployment Notes

- Set `NODE_ENV=production` in production
- Use HTTPS in production for secure cookie transmission
- Configure proper CORS origins for production domains
- Set up proper MongoDB connection for production

## 📞 Support

For issues or questions about the integration, check:
1. Backend console logs
2. Frontend browser console
3. Network tab in browser developer tools
4. Database connection status 