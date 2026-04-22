import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, updatePassword, updateCourse, logout } = useAuth();
  const navigate = useNavigate();
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: ''
  });
  const [courseForm, setCourseForm] = useState({
    course: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setCourseForm({ course: user.course });
    }
  }, [user]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const result = await updatePassword(passwordForm.currentPassword, passwordForm.newPassword);
    
    if (result.success) {
      setMessage('Password updated successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '' });
    } else {
      setMessage(result.message);
    }
    
    setLoading(false);
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const result = await updateCourse(courseForm.course);
    
    if (result.success) {
      setMessage('Course updated successfully!');
    } else {
      setMessage(result.message);
    }
    
    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
        <div className="container">
          <a className="navbar-brand" href="#">Student Portal</a>
          <div className="navbar-nav ms-auto">
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <h1 className="mb-4">Welcome, {user.name}!</h1>
        
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Student Details</h5>
              </div>
              <div className="card-body">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Course:</strong> {user.course}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Update Password</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handlePasswordSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({
                        ...passwordForm,
                        currentPassword: e.target.value
                      })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value
                      })}
                      required
                      minLength="6"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary-custom"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Change Course</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleCourseSubmit}>
                  <div className="mb-3">
                    <label className="form-label">New Course</label>
                    <input
                      type="text"
                      className="form-control"
                      value={courseForm.course}
                      onChange={(e) => setCourseForm({
                        course: e.target.value
                      })}
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary-custom"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Course'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {message && (
          <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
