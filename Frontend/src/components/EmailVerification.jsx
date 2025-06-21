import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('No verification token found.');
      return;
    }

    verifyEmail(token);
  }, [searchParams]);

  const verifyEmail = async (token) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/user/verify-email/${token}`);
      setStatus('success');
      setMessage(response.data.message);
    } catch (error) {
      setStatus('error');
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred during email verification. Please try again.');
      }
    }
  };

  const handleResendVerification = async () => {
    // This would typically get the email from the user or a form
    // For now, we'll show a message to contact support
    setMessage('Please contact support to resend verification email.');
  };

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold mb-4">Verifying Your Email</h2>
            <p className="text-yellow-300">Please wait while we verify your email address...</p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-green-400">Email Verified Successfully!</h2>
            <p className="text-yellow-300 mb-6">{message}</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-600 transition"
            >
              Go to Login
            </button>
          </div>
        );

      case 'error':
        return (
          <div className="text-center">
            <div className="bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-red-400">Verification Failed</h2>
            <p className="text-yellow-300 mb-6">{message}</p>
            <div className="space-y-3">
              <button
                onClick={handleResendVerification}
                className="bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-600 transition mr-3"
              >
                Resend Verification
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
              >
                Go to Login
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-yellow-400 flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">CRY - Child Rights and You</h1>
          <p className="mt-2 text-yellow-300">
            Email Verification
          </p>
        </div>

        <div className="bg-yellow-100 text-black p-8 rounded-xl">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification; 