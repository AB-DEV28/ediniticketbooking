import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdAlternateEmail, MdPerson } from 'react-icons/md';
import { FaFingerprint, FaPhone } from 'react-icons/fa';
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  });
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost/ediniticketbooking/src/serveur/api/auth/signup.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        // Store user data in sessionStorage
        sessionStorage.setItem('user', JSON.stringify(data.user));
        // Redirect to home page
        navigate('/');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Signup error:', err);
    }
  };

  return (
    <div
      className='w-full h-screen flex items-center justify-center relative'
      style={{ backgroundImage: "url('src/assets/hero1.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute w-full h-full bg-black/15 backdrop-blur-md"></div>
      <form onSubmit={handleSubmit} className='relative w-[90%] max-w-sm md:max-w-md lg:max-w-md p-5 bg-red flex-col flex items-center gap-3 rounded-xl shadow-black/60 shadow-lg'>
        
        <h1 className='text-lg md:text-xl font-semibold text-white'>Create Account</h1>
        <p className='text-xs md:text-sm text-center font-thin text-white'>Already have an account?
          <Link to="/login" className='text-white font-normal cursor-pointer'> Login</Link>
        </p>

        {error && (
          <div className='w-full p-2 bg-red-100 text-red-600 text-sm rounded-lg'>
            {error}
          </div>
        )}

        <div className='w-full flex flex-col gap-3'>
          <div className='w-full flex items-center bg-white p-2 rounded-xl gap-2'>
            <MdPerson className='text-red' />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder='First Name'
              className='bg-transparent border-0 w-full outline-none text-sm md:text-base'
              required
            />
          </div>

          <div className='w-full flex items-center bg-white p-2 rounded-xl gap-2'>
            <MdPerson className='text-red' />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder='Last Name'
              className='bg-transparent border-0 w-full outline-none text-sm md:text-base'
              required
            />
          </div>

          <div className='w-full flex items-center bg-white p-2 rounded-xl gap-2'>
            <MdAlternateEmail className='text-red' />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder='Email account'
              className='bg-transparent border-0 w-full outline-none text-sm md:text-base'
              required
            />
          </div>

          <div className='w-full flex items-center bg-white p-2 rounded-xl gap-2 relative'>
            <FaFingerprint className='text-red' />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder='Password'
              className='bg-transparent border-0 w-full outline-none text-sm md:text-base'
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className='absolute right-2'
            >
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </button>
          </div>

          <div className='w-full flex items-center bg-white p-2 rounded-xl gap-2'>
            <FaPhone className='text-red' />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder='Phone Number'
              className='bg-transparent border-0 w-full outline-none text-sm md:text-base'
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className='w-full bg-white text-red font-semibold p-2 rounded-xl hover:bg-gray-100 transition-colors'
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
