import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Ensure you have react-router-dom installed
import MyContext from '../../context/myContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import toast from 'react-hot-toast'

const Login = () => {

  const context = useContext(MyContext);
  const {loading, setLoading} = context;
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  }); 

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    return emailRegex.test(email);
  };

  const isValidate = validateEmail(userLogin.email); 

  const handleLogin = async () => {
    if(userLogin.email === '' || userLogin.password === ''){
      alert('All Fields required');
      return;
    }

    else if(!isValidate){
      alert('Please Enter Valid Email Address');
      return;
    }

    else{
      setLoading(true);
      try {
        const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
        try {
          const q = query(
              collection(fireDB, "user"),
              where('uid', '==', users?.user?.uid)
          );
          const data = onSnapshot(q, (QuerySnapshot) => {
              let user;
              QuerySnapshot.forEach((doc) => user = doc.data());
              localStorage.setItem("users", JSON.stringify(user) )
              setUserLogin({
                  email: "",
                  password: ""
              })
              toast.success("Login Successfully");
              setLoading(false);
              if(user.role == "user") {
                  navigate('/pages/dashboard/userdashboard');
              }else{
                  navigate('/pages/dashboard/admindashboard');
              }
          });
          return () => data;
      } catch (error) {
          console.log(error);
          setLoading(false);
      }
  } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Login Failed");
  }
}
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      {loading && <Loader />}
      {/* Login Form */}
      <div className="bg-white p-8 border border-gray-300 rounded-xl shadow-lg w-full max-w-sm">
        {/* Top Heading */}
        <div className="mb-6 text-center">
          <h2 className='text-3xl font-extrabold text-gray-600'>
            Login
          </h2>
          <p className="mt-2 text-gray-500">Welcome back! Please log in to your account.</p>
        </div>

        {/* Input Fields */}
        <div className="mb-4">
          <input
            type="email"
            placeholder='Email Address'
            value={userLogin.email}
            onChange={(e) => {
              setUserLogin({
                ...userLogin,
                email: e.target.value
              });
            }}
            className='bg-gray-100 border border-gray-300 px-4 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-pink-500'
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder='Password'
            value={userLogin.password}
            onChange={(e) => {
              setUserLogin({
                ...userLogin,
                password: e.target.value
              });
            }}
            className='bg-gray-100 border border-gray-300 px-4 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-pink-500'
          />
        </div>

        {/* Login Button */}
        <div className="mb-4">
          <button
            type='button'
            onClick={handleLogin}
            className='bg-gray-600 hover:bg-gray-500 transition duration-200 w-full text-white text-lg py-2 font-bold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50'
          >
            Login
          </button>
        </div>

        <div className="text-center">
          <p className='text-gray-700'>
            Don't have an account? <Link className='text-pink-600 font-semibold' to={'/signup'}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
