import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   try {
  //     const res = await API.post('/auth/register', formData);
  //     login(res.data.token);
  //     navigate('/');
  //   } catch (err) {
  //     setError(err.response?.data?.error || 'Registration failed');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/register', formData);
      login(res.data.token); 
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };  

  return (
    <div>
      <h2>Register</h2>
      <form class="w-full max-w-sm" onSubmit={handleSubmit}>
        <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                    Username
                </label>
            </div>
            <div class="md:w-2/3">
                <input 
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                    name="username" 
                    type="text" 
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>
        </div>
        <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
                Password
            </label>
            </div>
            <div class="md:w-2/3">
            <input 
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                name='password'
                type="password"
                id="inline-password" 
                placeholder="******************"
                value={formData.password}
                onChange={handleChange}
                required
            />
            </div>
        </div>
        {/* <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3"></div>
            <label class="md:w-2/3 block text-gray-500 font-bold">
            <input class="mr-2 leading-tight" type="checkbox"/>
            <span class="text-sm">
                Send me your newsletter!
            </span>
            </label>
        </div> */}
        <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
            <div class="md:w-2/3">
                <button 
                    class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
                    type="submit"
                    disabled={!formData.username || !formData.password}
                >
                    Sign Up
                </button>
                {error && (
                    <p style={{ color: 'red', marginTop: '10px' }}>
                        {error}
                    </p>
                )}
            </div>
        </div>
        </form>
    </div>
  );
};

export default Register;
