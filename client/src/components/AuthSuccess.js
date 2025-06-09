import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      const fetchUser = async () => {
        try {
          // Set the token in axios defaults
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          const response = await axios.get('http://localhost:5000/api/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });            if (response.data && response.data.user) {
            // Login the user with token and user data
            login(token, response.data.user);
            // Redirect based on user role
            if (response.data.user.role === 'admin') {
              navigate('/admin/dashboard');
            } else {
              navigate('/dashboard');
            }
          } else {
            setError('Invalid user data received');
            setTimeout(() => navigate('/login'), 3000);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError(error.response?.data?.message || 'Authentication failed');
          setTimeout(() => navigate('/login'), 3000);
        }
      };

      fetchUser();
    } else {
      setError('No authentication token received');
      setTimeout(() => navigate('/login'), 3000);
    }
  }, [login, navigate, searchParams]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2 text-red-600">Authentication Error</h2>
          <p className="text-gray-600">{error}</p>
          <p className="text-gray-500 mt-2">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Processing your login...</h2>
        <p className="text-gray-600">Please wait while we complete the authentication.</p>
      </div>
    </div>
  );
};

export default AuthSuccess;
