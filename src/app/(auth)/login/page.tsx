'use client';

import LoginPage from '@/components/features/auth/login-page';

export default function Login() {
  const handleLogin = async (data: { email: string; password: string; rememberMe?: boolean }) => {
    console.log('Login data:', data);
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleAppleLogin = () => {
    console.log('Apple login clicked');
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  return (
    <div data-theme="light">
      <LoginPage
        onLogin={handleLogin}
        onGoogleLogin={handleGoogleLogin}
        onAppleLogin={handleAppleLogin}
        onForgotPassword={handleForgotPassword}
      />
    </div>
  );
}

