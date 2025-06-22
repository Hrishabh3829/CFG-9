# CFG-9 API Documentation

## Base URL
```
http://localhost:5000/api/v1
```

## Authentication
This API uses **cookie-based JWT authentication**. After login, the JWT token is automatically stored in an HTTP-only cookie and sent with subsequent requests. No manual token handling is required.

**Important Notes:**
- Cookies are automatically handled by the browser/Postman
- No need to manually add Authorization headers
- Tokens are secure and protected from XSS attacks
- Cookies are automatically cleared on logout

---

## 1. Authentication Endpoints

### 1.1 Register User
**POST** `/user/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "PartnerNGO",
  "ngoInfo": {
    "name": "Helping Hands NGO",
    "address": "123 Charity Street, City",
    "registrationNumber": "NGO123456",
    "contactPerson": "John Doe",
    "phoneNumber": "+1234567890"
  }
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "user_id_here",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "PartnerNGO",
    "ngoInfo": {
      "name": "Helping Hands NGO",
      "address": "123 Charity Street, City",
      "registrationNumber": "NGO123456",
      "contactPerson": "John Doe",
      "phoneNumber": "+1234567890"
    }
  }
}
```

### 1.2 Login User
**POST** `/user/login`

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Welcome back, John Doe",
  "user": {
    "_id": "user_id_here",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "PartnerNGO"
  }
}
```

**Note:** The JWT token is automatically set as an HTTP-only cookie and will be sent with all subsequent requests.

### 1.3 Logout User
**GET** `/user/logout`

**Response:**
```json
{
  "message": "Logged out Successfully.",
  "success": true
}
```

**Note:** This clears the authentication cookie.

---

## 2. Admin Endpoints (Admin Only)

### 2.1 Create NGO
**POST** `/admin/ngos`

**Request Body:**
```json
{
  "name": "Save the Children NGO",
  "email": "info@savethechildren.org",
  "password": "ngo123456",
  "ngoInfo": {
    "name": "Save the Children International",
    "address": "456 Hope Avenue, Charity City",
    "registrationNumber": "NGO789012",
    "contactPerson": "Sarah Johnson",
    "phoneNumber": "+1987654321"
  }
}
```

**Response:**
```json
{
  "message": "NGO created successfully",
  "ngo": {
    "_id": "ngo_id_here",
    "name": "Save the Children NGO",
    "email": "info@savethechildren.org",
    "role": "PartnerNGO",
    "ngoInfo": {
      "name": "Save the Children International",
      "address": "456 Hope Avenue, Charity City",
      "registrationNumber": "NGO789012",
      "contactPerson": "Sarah Johnson",
      "phoneNumber": "+1987654321"
    }
  }
}
```

### 2.2 Create Frontliner
**POST** `/admin/frontliners`

**Request Body:**
```json
{
  "name": "Maria Rodriguez",
  "email": "maria.rodriguez@field.org",
  "password": "frontliner123",
  "frontlinerInfo": {
    "region": "North Region",
    "assignedProjects": [],
    "supervisor": "Dr. James Wilson"
  }
}
```

**Response:**
```json
{
  "message": "Frontliner created successfully",
  "frontliner": {
    "_id": "frontliner_id_here",
    "name": "Maria Rodriguez",
    "email": "maria.rodriguez@field.org",
    "role": "Frontliner",
    "frontlinerInfo": {
      "region": "North Region",
      "assignedProjects": [],
      "supervisor": "Dr. James Wilson"
    }
  }
}
```

### 2.3 Get All NGOs
**GET** `/admin/ngos`

**Response:**
```json
{
  "message": "NGOs retrieved successfully",
  "count": 2,
  "ngos": [
    {
      "_id": "ngo_id_1",
      "name": "Helping Hands NGO",
      "email": "john.doe@example.com",
      "role": "PartnerNGO",
      "ngoInfo": {
        "name": "Helping Hands NGO",
        "address": "123 Charity Street, City",
        "registrationNumber": "NGO123456",
        "contactPerson": "John Doe",
        "phoneNumber": "+1234567890"
      }
    },
    {
      "_id": "ngo_id_2",
      "name": "Save the Children NGO",
      "email": "info@savethechildren.org",
      "role": "PartnerNGO",
      "ngoInfo": {
        "name": "Save the Children International",
        "address": "456 Hope Avenue, Charity City",
        "registrationNumber": "NGO789012",
        "contactPerson": "Sarah Johnson",
        "phoneNumber": "+1987654321"
      }
    }
  ]
}
```

### 2.4 Get All Frontliners
**GET** `/admin/frontliners`

**Response:**
```json
{
  "message": "Frontliners retrieved successfully",
  "count": 1,
  "frontliners": [
    {
      "_id": "frontliner_id_here",
      "name": "Maria Rodriguez",
      "email": "maria.rodriguez@field.org",
      "role": "Frontliner",
      "frontlinerInfo": {
        "region": "North Region",
        "assignedProjects": [],
        "supervisor": "Dr. James Wilson"
      }
    }
  ]
}
```

### 2.5 Update Admin Settings
**PUT** `/admin/settings/:userId`

**Request Body:**
```json
{
  "projectNotificationCount": 5,
  "notificationsEnabled": true
}
```

**Response:**
```json
{
  "message": "Admin settings updated successfully",
  "admin": {
    "_id": "admin_id_here",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "Admin",
    "adminSettings": {
      "projectNotificationCount": 5,
      "notificationsEnabled": true
    }
  }
}
```

### 2.6 Get Admin Dashboard
**GET** `/admin/dashboard/:userId`

**Response:**
```json
{
  "message": "Dashboard data retrieved successfully",
  "stats": {
    "totalUsers": 5,
    "ngoCount": 2,
    "frontlinerCount": 3
  },
  "recentNGOs": [
    {
      "_id": "ngo_id_1",
      "name": "Helping Hands NGO",
      "email": "john.doe@example.com",
      "role": "PartnerNGO"
    }
  ],
  "recentFrontliners": [
    {
      "_id": "frontliner_id_1",
      "name": "Maria Rodriguez",
      "email": "maria.rodriguez@field.org",
      "role": "Frontliner"
    }
  ],
  "adminSettings": {
    "projectNotificationCount": 5,
    "notificationsEnabled": true
  }
}
```

### 2.7 Toggle User Status
**PUT** `/admin/users/:userId/status`

**Request Body:**
```json
{
  "isActive": false
}
```

**Response:**
```json
{
  "message": "User deactivated successfully",
  "user": {
    "_id": "user_id_here",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "PartnerNGO",
    "isActive": false
  }
}
```

---

## 3. Project Management Endpoints

### 3.1 Create Project
**POST** `/projects`

**Request Body:**
```json
{
  "name": "Education for All",
  "startDate": "2024-01-15",
  "partnerNgo": "ngo_user_id_here",
  "frontliners": ["frontliner_user_id_here"],
  "status": "Active"
}
```

**Response:**
```json
{
  "message": "Project created successfully",
  "project": {
    "_id": "project_id_here",
    "name": "Education for All",
    "startDate": "2024-01-15T00:00:00.000Z",
    "partnerNgo": "ngo_user_id_here",
    "frontliners": ["frontliner_user_id_here"],
    "status": "Active",
    "createdAt": "2024-01-10T10:00:00.000Z",
    "updatedAt": "2024-01-10T10:00:00.000Z"
  }
}
```

### 3.2 Get All Projects
**GET** `/projects`

**Response:**
```json
[
  {
    "_id": "project_id_1",
    "name": "Education for All",
    "startDate": "2024-01-15T00:00:00.000Z",
    "partnerNgo": {
      "_id": "ngo_user_id_here",
      "name": "Helping Hands NGO",
      "email": "john.doe@example.com"
    },
    "frontliners": [
      {
        "_id": "frontliner_user_id_here",
        "name": "Maria Rodriguez",
        "email": "maria.rodriguez@field.org"
      }
    ],
    "status": "Active",
    "createdAt": "2024-01-10T10:00:00.000Z",
    "updatedAt": "2024-01-10T10:00:00.000Z"
  }
]
```

### 3.3 Get Project by ID
**GET** `/projects/:projectId`

**Response:**
```json
{
  "_id": "project_id_here",
  "name": "Education for All",
  "startDate": "2024-01-15T00:00:00.000Z",
  "partnerNgo": {
    "_id": "ngo_user_id_here",
    "name": "Helping Hands NGO",
    "email": "john.doe@example.com",
    "ngoInfo": {
      "name": "Helping Hands NGO",
      "address": "123 Charity Street, City",
      "registrationNumber": "NGO123456",
      "contactPerson": "John Doe",
      "phoneNumber": "+1234567890"
    }
  },
  "frontliners": [
    {
      "_id": "frontliner_user_id_here",
      "name": "Maria Rodriguez",
      "email": "maria.rodriguez@field.org"
    }
  ],
  "status": "Active",
  "createdAt": "2024-01-10T10:00:00.000Z",
  "updatedAt": "2024-01-10T10:00:00.000Z"
}
```

### 3.4 Update Project
**PUT** `/projects/:projectId`

**Request Body:**
```json
{
  "name": "Education for All - Updated",
  "status": "Completed",
  "frontliners": ["frontliner_user_id_1", "frontliner_user_id_2"]
}
```

**Response:**
```json
{
  "message": "Project updated successfully",
  "project": {
    "_id": "project_id_here",
    "name": "Education for All - Updated",
    "startDate": "2024-01-15T00:00:00.000Z",
    "partnerNgo": "ngo_user_id_here",
    "frontliners": ["frontliner_user_id_1", "frontliner_user_id_2"],
    "status": "Completed",
    "createdAt": "2024-01-10T10:00:00.000Z",
    "updatedAt": "2024-01-10T11:00:00.000Z"
  }
}
```

### 3.5 Delete Project
**DELETE** `/projects/:projectId`

**Response:**
```json
{
  "message": "Project deleted successfully"
}
```

---

## 4. Task Management Endpoints

### 4.1 Create Task
**POST** `/tasks`

**Request Body:**
```json
{
  "title": "Conduct Community Survey",
  "project": "project_id_here",
  "assignedTo": "frontliner_user_id_here",
  "dueDate": "2024-02-15",
  "status": "Pending"
}
```

**Response:**
```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "task_id_here",
    "title": "Conduct Community Survey",
    "project": "project_id_here",
    "assignedTo": "frontliner_user_id_here",
    "dueDate": "2024-02-15T00:00:00.000Z",
    "status": "Pending",
    "createdAt": "2024-01-10T10:00:00.000Z",
    "updatedAt": "2024-01-10T10:00:00.000Z"
  }
}
```

### 4.2 Get Project Tasks
**GET** `/tasks/project/:projectId`

**Response:**
```json
[
  {
    "_id": "task_id_1",
    "title": "Conduct Community Survey",
    "project": "project_id_here",
    "assignedTo": {
      "_id": "frontliner_user_id_here",
      "name": "Maria Rodriguez",
      "role": "Frontliner"
    },
    "dueDate": "2024-02-15T00:00:00.000Z",
    "status": "Pending",
    "createdAt": "2024-01-10T10:00:00.000Z",
    "updatedAt": "2024-01-10T10:00:00.000Z"
  },
  {
    "_id": "task_id_2",
    "title": "Data Analysis",
    "project": "project_id_here",
    "assignedTo": {
      "_id": "frontliner_user_id_2",
      "name": "John Smith",
      "role": "Frontliner"
    },
    "dueDate": "2024-02-20T00:00:00.000Z",
    "status": "In Progress",
    "createdAt": "2024-01-10T11:00:00.000Z",
    "updatedAt": "2024-01-10T11:00:00.000Z"
  }
]
```

### 4.3 q
**PUT** `/tasks/:taskId`

**Request Body:**
```json
{
  "title": "Conduct Community Survey - Updated",
  "dueDate": "2024-02-20",
  "status": "In Progress"
}
```

**Response:**
```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "task_id_here",
    "title": "Conduct Community Survey - Updated",
    "project": "project_id_here",
    "assignedTo": "frontliner_user_id_here",
    "dueDate": "2024-02-20T00:00:00.000Z",
    "status": "In Progress",
    "createdAt": "2024-01-10T10:00:00.000Z",
    "updatedAt": "2024-01-10T12:00:00.000Z"
  }
}
```

### 4.4 Submit Task (with file upload)
**POST** `/tasks/:taskId/submit`

**Body:** `multipart/form-data`
- `file`: File to upload

**Response:**
```json
{
  "message": "Task submitted successfully",
  "task": {
    "_id": "task_id_here",
    "title": "Conduct Community Survey",
    "project": "project_id_here",
    "assignedTo": "frontliner_user_id_here",
    "dueDate": "2024-02-15T00:00:00.000Z",
    "status": "Submitted",
    "submission": {
      "fileUrl": "https://cloudinary.com/example/file.pdf",
      "submissionDate": "2024-01-10T12:00:00.000Z"
    },
    "createdAt": "2024-01-10T10:00:00.000Z",
    "updatedAt": "2024-01-10T12:00:00.000Z"
  }
}
```

### 4.5 Delete Task
**DELETE** `/tasks/:taskId`

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

---

## 5. Error Responses

### 5.1 Validation Error (400)
```json
{
  "message": "All fields are required"
}
```

### 5.2 Authentication Error (401)
```json
{
  "message": "User not Authenticated",
  "success": false
}
```

### 5.3 Authorization Error (403)
```json
{
  "message": "Access denied. Admin privileges required."
}
```

### 5.4 Not Found Error (404)
```json
{
  "message": "Project not found"
}
```

### 5.5 Server Error (500)
```json
{
  "message": "Server error"
}
```

---

## 6. User Roles

- **Admin**: Full access to all endpoints, can manage users and projects
- **PartnerNGO**: Can create and manage projects, view assigned tasks
- **Frontliner**: Can view assigned projects and tasks, submit task work

---

## 7. Testing with Postman

### **Important Setup for Cookie Authentication:**

1. **Import the Collection**: Import `Postman_Collection_Cookie_Auth.json` into Postman

2. **Enable Cookie Handling**: 
   - Go to Postman Settings → General
   - Enable "Automatically follow redirects"
   - Enable "Send cookies with requests"

3. **Set Base URL**: Update the `baseUrl` variable to your server URL (default: `http://localhost:5000/api/v1`)

4. **Testing Workflow**:
   - Start with "Register Admin User" to create an admin account
   - Use "Login Admin" to authenticate (cookies are automatically handled)
   - Test admin operations (create NGOs, frontliners, etc.)
   - Use "Login NGO" or "Login Frontliner" to test different user roles
   - Update collection variables with actual IDs from responses

5. **Cookie Management**:
   - Cookies are automatically sent with requests after login
   - No need to manually add Authorization headers
   - Use "Logout User" to clear cookies

### **Testing Different User Roles:**

1. **Admin Testing**:
   - Register/Login as Admin
   - Test all admin endpoints
   - Create NGOs and Frontliners

2. **NGO Testing**:
   - Register/Login as PartnerNGO
   - Create and manage projects
   - Assign frontliners to projects

3. **Frontliner Testing**:
   - Register/Login as Frontliner
   - View assigned projects and tasks
   - Submit task work with files

---

## 8. Environment Variables

Make sure to set up these environment variables in your `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

---

## 9. Security Features

### **Cookie Security:**
- **httpOnly**: Prevents XSS attacks by blocking JavaScript access
- **secure**: HTTPS only in production
- **sameSite**: CSRF protection
- **maxAge**: Automatic expiration (1 day)

### **Authentication Flow:**
1. User logs in with email/password
2. Server validates credentials
3. JWT token is generated and set as HTTP-only cookie
4. All subsequent requests automatically include the cookie
5. Server validates token on each protected request
6. Logout clears the cookie

### **Benefits of Cookie Authentication:**
- **Automatic**: No manual token handling required
- **Secure**: Protected from XSS and CSRF attacks
- **Stateless**: JWT tokens contain all necessary information
- **Scalable**: Works across multiple domains/subdomains 