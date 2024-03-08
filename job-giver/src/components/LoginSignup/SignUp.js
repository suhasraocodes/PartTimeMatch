import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { validate } from "../validate";
import app from "../../Firebase/firebase";

const SignUp = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [darkMode, setDarkMode] = useState(false); // State for dark mode
    const navigate = useNavigate();

    const auth = getAuth(app);

    const changeHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        console.log("Data:", data); // Log data to ensure it's correct
        const validationErrors = validate(data, "signup");
        setErrors(validationErrors);
        console.log(Object.keys(validationErrors).length );
    
        if ((Object.keys(validationErrors).length-1) === 0) {
            try {
                const { email, password } = data;
                
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log("User created:", user);
                
                toast.success('Signed up successfully!');
                navigate('/home');
            } catch (error) {
                toast.error("Failed to sign up. Please try again.");
                console.error("Error signing up:", error);
            }
        } else {
            toast.error("Invalid data. Please correct the errors.");
        }
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} py-6 flex flex-col justify-center sm:py-12`}>
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className={`text-2xl font-semibold ${darkMode ? 'text-black' : ''}`}>Signup Form with Floating Labels</h1>
                        </div>
                        <form onSubmit={submitHandler} className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input
                                        autoComplete="off"
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={data.name}
                                        onChange={changeHandler}
                                        className={`peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 focus:outline-none focus:border-rose-600 ${errors.name ? 'border-red-500' : ''} ${darkMode ? 'text-black' : ''}`}
                                        placeholder="Name"
                                    />
                                    <label
                                        htmlFor="name"
                                        className={`absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ${data.name ? '-top-3.5' : 'top-2'}`}
                                    >
                                        Name
                                    </label>
                                    {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                                </div>
                                <div className="relative">
                                    <input
                                        autoComplete="off"
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={data.email}
                                        onChange={changeHandler}
                                        className={`peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 focus:outline-none focus:border-rose-600 ${errors.email ? 'border-red-500' : ''} ${darkMode ? 'text-black' : ''}`}
                                        placeholder="Email address"
                                    />
                                    <label
                                        htmlFor="email"
                                        className={`absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ${data.email ? '-top-3.5' : 'top-2'}`}
                                    >
                                        Email Address
                                    </label>
                                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                                </div>
                                <div className="relative">
                                    <input
                                        autoComplete="off"
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={data.password}
                                        onChange={changeHandler}
                                        className={`peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 focus:outline-none focus:border-rose-600 ${errors.password ? 'border-red-500' : ''} ${darkMode ? 'text-black' : ''}`}
                                        placeholder="Password"
                                    />
                                    <label
                                        htmlFor="password"
                                        className={`absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ${data.password ? '-top-3.5' : 'top-2'}`}
                                    >
                                        Password
                                    </label>
                                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                                </div>
                                <div className="relative">
                                    <input
                                        autoComplete="off"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={data.confirmPassword}
                                        onChange={changeHandler}
                                        className={`peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 focus:outline-none focus:border-rose-600 ${errors.confirmPassword ? 'border-red-500' : ''} ${darkMode ? 'text-black' : ''}`}
                                        placeholder="Confirm Password"
                                    />
                                    <label
                                        htmlFor="confirmPassword"
                                        className={`absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ${data.confirmPassword ? '-top-3.5' : 'top-2'}`}
                                    >
                                        Confirm Password
                                    </label>
                                    {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
                                </div>
                                <div className="relative">
                                    <button type="submit" className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="mt-4 text-center">
                <Link to="/" className={`text-blue-500 hover:text-blue-700 ${darkMode ? 'text-white' : 'text-black'}`}>Login</Link>
            </div>
            <ToastContainer />
            <div className="absolute top-4 right-4">
                <button className={`bg-transparent ${darkMode ? 'text-white' : 'text-black'} py-2 px-4 border border-white rounded`} onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
            </div>
        </div>
    );
};

export default SignUp;
