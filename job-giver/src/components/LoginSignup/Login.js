import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { validate } from "../validate";
import { notify } from "../toast";
import styles from "./SignUp.module.css";

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const auth = getAuth();
    const navigate = useNavigate();
    useEffect(() => {
        setErrors(validate(data, "login"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, touched]);

    const changeHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const focusHandler = (event) => {
        setTouched({ ...touched, [event.target.name]: true });
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        if (!Object.keys(errors).length) {
            try {
                const { email, password } = data;
                await signInWithEmailAndPassword(auth, email, password);
                notify("You Logged in", "success"); // Redirect to home page after successful login
                console.log(auth.currentUser?.email);
                navigate('/home')
            } catch (error) {
                notify("Failed to log in. Please try again.", "error");
                console.error("Error logging in:", error);
            }
        } else {
            notify("Invalid data. Please correct the errors.", "error");
            setTouched({
                email: true,
                password: true,
            });
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler} className={styles.formContainer}>
                <h2 className={styles.header}>Login</h2>
                <div className={styles.formField}>
                    <label>Email : </label>
                    <input
                        className={
                            errors.email && touched.email
                                ? styles.uncompleted
                                : styles.formInput
                        }
                        type="text"
                        name="email"
                        value={data.email}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                    ></input>
                    {errors.email && touched.email && (
                        <span>{errors.email}</span>
                    )}
                </div>
                <div className={styles.formField}>
                    <label>Password : </label>
                    <input
                        className={
                            errors.password && touched.password
                                ? styles.uncompleted
                                : styles.formInput
                        }
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                    ></input>
                    {errors.password && touched.password && (
                        <span>{errors.password}</span>
                    )}
                </div>
                <div className={styles.formButtons}>
                    <Link to="/signup">Sign Up</Link>
                    <button type="submit">Login</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;