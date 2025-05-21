import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdAlternateEmail } from 'react-icons/md';
import { FaFingerprint, FaFacebook, FaTwitter } from 'react-icons/fa';
import { IoMdEyeOff, IoMdEye } from 'react-icons/io'; // Changed IoEye to IoMdEye

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

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
      const response = await fetch('http://localhost/ediniticketbooking/src/serveur/api/auth/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        // Store user data in localStorage if rememberMe is checked
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(data.user));
        } else {
          sessionStorage.setItem('user', JSON.stringify(data.user));
        }
        // Redirect to home page or dashboard
        navigate('/');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div
      className='w-full h-screen flex items-center justify-center relative '
      style={{ backgroundImage: "url('src/assets/hero1.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute w-full h-full bg-black/15 backdrop-blur-md"></div>
      <form onSubmit={handleSubmit} className=' relative w-[90%] max-w-sm md:max-w-md lg:max-w-md p-5 bg-red flex-col flex items-center gap-3 rounded-xl shadow-black/60 shadow-lg '>
        
        <h1 className='text-lg md:text-xl font-semibold text-white '>Welcome Back</h1>
        <p className='text-xs md:text-sm text-center font-thin text-white '>Don't have an account ?
          <Link to="/signup" className='text-white font-normal cursor-pointer'> Sign up</Link>
        </p>

        {error && (
          <div className='w-full p-2 bg-red-100 text-red-600 text-sm rounded-lg'>
            {error}
          </div>
        )}

        <div className='w-full flex flex-col gap-3'>
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
            {showPassword ? (
              <IoMdEyeOff
                className='absolute right-5 cursor-pointer text-red'
                onClick={togglePasswordVisibility}
              />
            ) : (
              <IoMdEye // Changed from IoEye to IoMdEye
                className='absolute right-5 cursor-pointer text-red'
                onClick={togglePasswordVisibility}
              />
            )}
          </div>

          <div className='flex items-center justify-between'>
            <label className='flex items-center gap-2'>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMe}
                className='text-red'
              />
              <span className='text-xs md:text-sm text-white'>Remember Me</span>
            </label>
            <a href="#" className='text-xs font-thin text-white cursor-pointer'>
              Forgot Password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          className='w-full p-2 bg-secend2 rounded-xl mt-3 hover:bg-secend1 text-sm md:text-base text-white font-normal'
        >
          Log in
        </button>

        <div className='relative w-full flex items-center justify-center py-3'>
          <div className='w-2/3 h-[0.25px] bg-white'></div>
          <h3 className='text-xs md:text-sm px-4 text-white font-thin'>Or</h3>
          <div className='w-2/3 h-[0.25px] bg-white'></div>
        </div>

        <div className='w-full flex items-center justify-evenly'>
          <div className='p-2 md:px-10 bg-secend2 cursor-pointer rounded-xl hover:bg-secend1'>
            <FaFacebook className='text-lg md:text-xl text-white' />
          </div>

          <div className='p-1 md:px-6 lg:px-10 bg-secend2 cursor-pointer rounded-xl hover:bg-secend1'>
            <img src="/google.png" alt="google" className='w-6 md:w-8' />
          </div>

          <div className='p-2 md:px-10 bg-secend2 cursor-pointer rounded-xl hover:bg-secend1'>
            <FaTwitter className='text-lg md:text-xl text-white' />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
