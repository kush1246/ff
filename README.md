# Student Login & Registration System - MERN Stack

A complete student authentication system built with MongoDB, Express, React, and Node.js.

## Features

- **Student Registration**: Create new student accounts with name, email, password, and course
- **Student Login**: Secure authentication with JWT tokens
- **Protected Dashboard**: Access student details and update information
- **Password Management**: Update passwords with old password verification
- **Course Management**: Change enrolled courses
- **Secure Logout**: Clear tokens and redirect to login

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- bcryptjs for password hashing
- JWT for authentication
- CORS for cross-origin requests

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- Bootstrap 5 for styling
- Context API for state management

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (installed and running)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
# Create .env file with these variables:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student-auth
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend application:
```bash
npm start
```

## API Endpoints

### Authentication Routes
- `POST /api/register` - Register a new student
- `POST /api/login` - Login student and return JWT token
- `GET /api/student` - Get student details (protected)

### Update Routes
- `PUT /api/update-password` - Update student password (protected)
- `PUT /api/update-course` - Update student course (protected)

## Usage

1. Make sure MongoDB is running on your system
2. Start the backend server (runs on port 5000)
3. Start the frontend application (runs on port 3000)
4. Open your browser and navigate to `http://localhost:3000`
5. Register a new student account or login with existing credentials
6. Access the dashboard to view and update your information

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected routes with middleware
- Input validation and sanitization
- Secure password update (requires old password verification)

## Error Handling

- Duplicate email registration prevention
- Invalid login credentials handling
- Unauthorized access protection
- Form validation on frontend and backend
- User-friendly error messages

## Deployment

### Backend (Render/Vercel)
1. Set environment variables in your hosting platform
2. Update MongoDB URI to production database
3. Set JWT_SECRET to a secure random string
4. Deploy the backend application

### Frontend (Vercel)
1. Update API base URL to production backend
2. Build and deploy the React application
3. Configure environment variables if needed

## Project Structure

```
prct/
  backend/
    models/
      Student.js
    routes/
      auth.js
    server.js
    package.json
    .env
  frontend/
    src/
      components/
        Login.js
        Register.js
        Dashboard.js
      context/
        AuthContext.js
      App.js
      index.js
      index.css
    public/
      index.html
    package.json
  README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
