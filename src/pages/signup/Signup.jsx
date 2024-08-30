/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const Signup = () => {
    const context = useContext(MyContext);
    const { loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // User Signup State 
    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    const validateEmail = (email) => {
        // Regular expression for a simple email validation
        const emailRegex = /^[^\s@]+@gmail\.com$/;
        return emailRegex.test(email);
      };

    const isValidate = validateEmail(userSignup.email); 

    const userSignupFunction = async () => {
        // validation 
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
            toast.error("All Fields are required");
            return;
        }

        else if(!isValidate){
            alert('Please Enter Valid Email Address');
            return;
        }


        else{
        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

            // create user object
            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            };

            // create user Reference
            const userReference = collection(fireDB, "user");

            // Add User Detail
            await addDoc(userReference, user);

            setUserSignup({
                name: "",
                email: "",
                password: ""
            });

            toast.success("Signup Successfully");
            alert("Signup Successfully");
            setLoading(false);
            navigate('/login');
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Signup failed. Please try again.");
        }
    }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            {loading && <Loader />}
            {/* Login Form  */}
            <div className="bg-white p-8 border border-gray-300 rounded-xl shadow-lg w-full max-w-sm">
                {/* Top Heading  */}
                <div className="mb-6 text-center">
                    <h2 className='text-3xl font-extrabold text-gray-600'>
                        Create Account
                    </h2>
                    <p className="mt-2 text-gray-500">Join us for an amazing experience!</p>
                </div>

                {/* Input Fields  */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder='Full Name'
                        value={userSignup.name}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                name: e.target.value
                            });
                        }}
                        className='bg-gray-100 border border-gray-300 px-4 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-pink-500'
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="email"
                        placeholder='Email Address'
                        value={userSignup.email}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
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
                        value={userSignup.password}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                password: e.target.value
                            });
                        }}
                        className='bg-gray-100 border border-gray-300 px-4 py-2 w-full rounded-md outline-none focus:ring-2 focus:ring-pink-500'
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-4">
                    <button
                        type='button'
                        onClick={userSignupFunction}
                        className='bg-gray-600 hover:bg-gray-500 transition duration-200 w-full text-white text-lg py-2 font-bold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50'
                    >
                        Signup
                    </button>
                </div>

                <div className="text-center">
                    <p className='text-gray-700'>Already have an account? <Link className='text-pink-600 font-semibold' to={'/login'}>Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
