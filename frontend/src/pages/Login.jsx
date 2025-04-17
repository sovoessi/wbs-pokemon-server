import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/login', formData);
      login(res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                </label>
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="username" 
                    name="username" 
                    placeholder="Username"
                    type="text" 
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input 
                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                    id="password" 
                    name="password" 
                    type="password" 
                    placeholder="******************"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <p className="text-red-500 text-xs italic">Please choose a password.</p>
            </div>
            <div className="flex items-center justify-between">
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                    type="submit"
                >
                    Sign In
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </form>
        </div>
    </div>
  );
};

export default Login;
