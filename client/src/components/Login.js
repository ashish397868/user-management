import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [resetMode, setResetMode] = useState('login'); // login, forgot, verify, reset
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    const url="http://localhost:5000";

    try {
      if (resetMode === 'login') {
        const response = await axios.post(`${url}/login`, formData, {
          withCredentials: true
        });
        login(response.data);
        navigate('/');      } else if (resetMode === 'forgot') {
        await axios.post(`${url}/forgot-password`, { email: formData.email });
        setMessage({ type: 'success', text: 'Reset code sent to your email' });
        setResetMode('verify');} else if (resetMode === 'verify') {
        console.log('Verifying reset code:', { 
          email: formData.email, 
          resetCode 
        });
        const response = await axios.post(`${url}/verify-reset-code`, { 
          email: formData.email, 
          resetCode 
        });
        console.log('Verify code response:', response.data);
        setMessage({ type: 'success', text: 'Code verified successfully' });
        setResetMode('reset');} else if (resetMode === 'reset') {
        console.log('Sending reset password request:', {
          email: formData.email,
          resetCode,
          newPassword
        });
        const response = await axios.post(`${url}/reset-password`, {
          email: formData.email,
          resetCode,
          newPassword
        });
        console.log('Reset password response:', response.data);
        setMessage({ type: 'success', text: 'Password reset successfully' });
        setResetMode('login');
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'An error occurred' 
      });
    }
  };

  const renderLoginForm = () => (
    <>
      <div>
        <label htmlFor="email" className="sr-only">Email address</label>              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 sm:py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm sm:text-base"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password" className="sr-only">Password</label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
            ) : (
              <AiOutlineEye className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
      </div>
    </>
  );

  const renderForgotPasswordForm = () => (
    <div>
      <label htmlFor="email" className="sr-only">Email address</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder="Email address"
        value={formData.email}
        onChange={handleChange}
      />
    </div>
  );

  const renderVerifyCodeForm = () => (
    <div>
      <input
        type="text"
        required
        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder="Enter 6-digit code"
        value={resetCode}
        onChange={(e) => setResetCode(e.target.value)}
        maxLength={6}
      />
    </div>
  );

  const renderResetPasswordForm = () => (
    <div>
      <div className="relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          required
          className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
          ) : (
            <AiOutlineEye className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8 p-4 sm:p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900">
          {resetMode === 'login' ? 'Sign in to your account' :
           resetMode === 'forgot' ? 'Reset your password' :
           resetMode === 'verify' ? 'Enter verification code' :
           'Set new password'}
        </h2>
          {message.text && (
          <div className={`rounded-md p-3 sm:p-4 text-sm sm:text-base ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {resetMode === 'login' && renderLoginForm()}
            {resetMode === 'forgot' && renderForgotPasswordForm()}
            {resetMode === 'verify' && renderVerifyCodeForm()}
            {resetMode === 'reset' && renderResetPasswordForm()}
          </div>

          <div className="flex items-center justify-between">
            {resetMode === 'login' ? (
              <button
                type="button"
                onClick={() => setResetMode('forgot')}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setResetMode('login')}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Back to login
              </button>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {resetMode === 'login' ? 'Sign in' :
               resetMode === 'forgot' ? 'Send reset code' :
               resetMode === 'verify' ? 'Verify code' :
               'Reset password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;