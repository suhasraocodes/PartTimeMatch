import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import app from "../../Firebase/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { validate } from "../validate";
import { notify } from "../toast";
import styles from "./SignUp.module.css";

const SignUp = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        isAccepted: false,
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const auth = getAuth(app);

    useEffect(() => {
        setErrors(validate(data, "signup"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, touched]);

    const changeHandler = (event) => {
        if (event.target.name === "isAccepted") {
            setData({ ...data, [event.target.name]: event.target.checked });
        } else {
            setData({ ...data, [event.target.name]: event.target.value });
        }
    };

    const focusHandler = (event) => {
        setTouched({ ...touched, [event.target.name]: true });
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        if (!Object.keys(errors).length) {
            try {
                const { email, password } = data;
                await createUserWithEmailAndPassword(auth, email, password);
                notify("You Signed up successfully!", "success");
                console.log(getAuth().currentUser?.email)
                navigate("/home");

            } catch (error) {
                notify("Failed to sign up. Please try again later.", "error");
                console.error("Error signing up:", error);
            }
        } else {
            notify("Invalid data. Please correct the errors.", "error");
            setTouched({
                name: true,
                email: true,
                password: true,
                confirmPassword: true,
                isAccepted: true,
            });
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler} className={styles.formContainer}>
                <h2 className={styles.header}>Sign Up</h2>
                <div className={styles.formField}>
                    <label>Name : </label>
                    <input
                        className={
                            errors.name && touched.name
                                ? styles.uncompleted
                                : styles.formInput
                        }
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                    ></input>
                    {errors.name && touched.name && <span>{errors.name}</span>}
                </div>
                <div className={styles.formField}>
                    <label>Email : </label>
                    <input
                        className={
                            errors.email && touched.email
                                ? styles.uncompleted
                                : styles.formInput
                        }
                        type="email"
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
                <div className={styles.formField}>
                    <label>Confirm Password : </label>
                    <input
                        className={
                            errors.confirmPassword && touched.confirmPassword
                                ? styles.uncompleted
                                : styles.formInput
                        }
                        type="password"
                        name="confirmPassword"
                        value={data.confirmPassword}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                    ></input>
                    {errors.confirmPassword && touched.confirmPassword && (
                        <span>{errors.confirmPassword}</span>
                    )}
                </div>
                <div className={styles.formField}>
                    <div className={styles.checkBoxContainer}>
                        <label>
                            I accept terms of privacy policy{" "}
                        </label>
                        <input
                            type="checkbox"
                            name="isAccepted"
                            checked={data.isAccepted}
                            onChange={changeHandler}
                            onFocus={focusHandler}
                        ></input>
                    </div>
                    {errors.isAccepted && touched.isAccepted && (
                        <span>{errors.isAccepted}</span>
                    )}
                </div>
                <div className={styles.formButtons}>
                    <Link to="/">Login</Link>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default SignUp;
