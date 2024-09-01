'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import Link from 'next/link';

export default function RegisterForm() {
  const [formValues, setFormValues] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormValues((old) => ({ ...old, [name]: value }));
  }

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    if (formValues.password !== formValues.confirm) {
      setIsSubmitting(false);
      return alert('Passwords do not match');
    }

    if (formValues.password.length < 8) {
      setIsSubmitting(false);
      return alert('Password must be at least 8 characters long');
    }

    try {
      const res = await fetch(`${apiUrl}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formValues.name,
          email: formValues.email,
          password: formValues.password,
        }),
      });

      if (!res.ok) {
        setIsSubmitting(false);
        return alert('Registration failed');
      }

      setFormValues({ name: '', email: '', password: '', confirm: '' });
      setSuccessMessage('Registration successful! Redirecting to login page...');
      setTimeout(() => {
        window.location.href = '/Login';
      }, 2000);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-full max-w-md mx-auto bg-white bg-opacity-25 shadow-lg border-2 border-purple-600 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-8">
            <input
              type="text"
              name="name"
              id="name"
              value={formValues.name}
              required
              onChange={handleInput}
              className="w-full py-2 px-0 text-gray-800 border-b-2 border-gray-600 bg-transparent focus:border-blue-600 outline-none"
            />
            <label
              htmlFor="name"
              className="absolute top-0 left-0 text-gray-800 text-sm transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left pointer-events-none"
            >
              Name
            </label>
          </div>
          <div className="relative mb-8">
            <input
              type="email"
              name="email"
              id="email"
              value={formValues.email}
              required
              onChange={handleInput}
              className="w-full py-2 px-0 text-gray-800 border-b-2 border-gray-600 bg-transparent focus:border-blue-600 outline-none"
            />
            <label
              htmlFor="email"
              className="absolute top-0 left-0 text-gray-800 text-sm transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left pointer-events-none"
            >
              Email
            </label>
          </div>
          <div className="relative mb-8">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              value={formValues.password}
              required
              onChange={handleInput}
              className="w-full py-2 px-0 text-gray-800 border-b-2 border-gray-600 bg-transparent focus:border-blue-600 outline-none"
            />
            <label
              htmlFor="password"
              className="absolute top-0 left-0 text-gray-800 text-sm transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left pointer-events-none"
            >
              Password
            </label>
            <span
              className="absolute top-2 right-2 cursor-pointer text-blue-600 text-xs"
              onClick={togglePassword}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>
          <div className="relative mb-8">
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirm"
              id="confirm"
              value={formValues.confirm}
              required
              onChange={handleInput}
              className="w-full py-2 px-0 text-gray-800 border-b-2 border-gray-600 bg-transparent focus:border-blue-600 outline-none"
            />
            <label
              htmlFor="confirm"
              className="absolute top-0 left-0 text-gray-800 text-sm transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left pointer-events-none"
            >
              Confirm Password
            </label>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg transition-transform duration-300 hover:from-purple-600 hover:to-blue-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
          {successMessage && <p className="text-center text-green-600 mt-4">{successMessage}</p>}
          <p className="text-center mt-5">
            Already have an account?{' '}
            <Link href="/Login" className="text-blue-600 hover:text-purple-600">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
