'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react'; 
import axios from 'axios';

const RegPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = useSupabaseClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('/api/register', { email, password });
      if (response.data.success) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (!error) {
          setEmail('');
          setPassword('');
          router.push('/');
          router.refresh(); // Оновлення стану
        } else {
          setError(error.message);
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xs mx-auto p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Registration</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-2 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Пароль:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-2 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
          />
        </label>
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition cursor-pointer"
      >
        Register
      </button>
      <a href="/"></a>
    </form>
  );
};

export default RegPage;
