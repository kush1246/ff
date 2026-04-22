# Deployment Troubleshooting Guide

## Common Issues & Solutions

### 1. Backend Deployment Issues

#### Issue: Backend not starting
**Symptoms**: 
- Service shows "Failed" or "Crashed" in Render dashboard
- Logs show connection errors

**Solutions**:
1. Check environment variables in Render dashboard:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `MONGODB_URI=mongodb+srv://admin:admin123@cluster0.aj38bkc.mongodb.net/student-auth`
   - `JWT_SECRET=your_secure_jwt_secret_key_here`

2. Ensure package.json has correct engines:
   ```json
   "engines": {
     "node": ">=14.0.0"
   }
   ```

3. Check MongoDB Atlas IP access:
   - Go to MongoDB Atlas dashboard
   - Network Access tab
   - Add IP: `0.0.0.0/0` (allows all IPs)

#### Issue: CORS errors
**Symptoms**: 
- Frontend can't connect to backend
- Console shows CORS errors

**Solutions**:
1. Backend CORS is configured for specific origins
2. Update frontend URL in backend CORS settings
3. Ensure frontend URL matches deployed URL

### 2. Frontend Deployment Issues

#### Issue: Build fails
**Symptoms**: 
- Static site shows "Failed" in Render
- Build logs show errors

**Solutions**:
1. Check package.json scripts
2. Ensure all dependencies are installed
3. Check for syntax errors in React components

#### Issue: API calls failing
**Symptoms**: 
- Frontend loads but can't authenticate
- Network errors in browser console

**Solutions**:
1. Check `REACT_APP_API_URL` environment variable
2. Ensure backend is running and accessible
3. Update API URL to match deployed backend URL

### 3. Testing Steps

#### Test Backend:
1. Visit: `https://your-backend.onrender.com/`
2. Should see: `{"message": "Student Authentication API is running"}`

#### Test Frontend:
1. Visit: `https://your-frontend.onrender.com/`
2. Try to register a new user
3. Check browser console for errors

### 4. Quick Fix Commands

#### Redeploy Backend:
1. Go to Render dashboard
2. Click on backend service
3. Click "Manual Deploy" -> "Deploy Latest Commit"

#### Redeploy Frontend:
1. Go to Render dashboard
2. Click on frontend service
3. Click "Manual Deploy" -> "Deploy Latest Commit"

### 5. Environment Variables Checklist

**Backend**:
- [ ] NODE_ENV=production
- [ ] PORT=5000
- [ ] MONGODB_URI (your MongoDB Atlas string)
- [ ] JWT_SECRET (secure random string)

**Frontend**:
- [ ] REACT_APP_API_URL=https://your-backend.onrender.com

### 6. MongoDB Atlas Setup

1. Go to MongoDB Atlas dashboard
2. Click "Network Access"
3. Click "Add IP Address"
4. Select "Allow Access From Anywhere" (0.0.0.0/0)
5. Click "Confirm"

### 7. Debug URLs

Replace with your actual URLs:
- Backend: `https://student-auth-backend.onrender.com`
- Frontend: `https://student-auth-frontend.onrender.com`

### 8. Common Error Messages

**"ECONNREFUSED"**: Backend not running or wrong URL
**"CORS policy error"**: CORS configuration issue
**"Database connection failed"**: MongoDB URI or network access issue
**"Build failed"**: Package.json or dependency issue
