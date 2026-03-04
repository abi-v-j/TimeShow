import styles from "./Registration.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Registration = () => {

    // ✅ Proper states
    const [userDatas, setUserDatas] = useState([]);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userContact, setUserContact] = useState("");

    // ✅ Animation states
    const [loading, setLoading] = useState(false);
    const [errorAnim, setErrorAnim] = useState(false);

    // ✅ Save User
    const handleSave = () => {

        if (!userName || !userEmail || !userPassword || !userContact) {
            setErrorAnim(true);
            setTimeout(() => setErrorAnim(false), 400);
            return;
        }

        setLoading(true);

        const Fdata = new FormData();
        Fdata.append("user_name", userName);
        Fdata.append("user_email", userEmail);
        Fdata.append("user_password", userPassword);
        Fdata.append("user_contact", userContact);

        axios.post("http://127.0.0.1:8000/User/", Fdata)
            .then((response) => {
                console.log("User saved successfully:", response.data);
                setLoading(false);

                // Optional: clear form
                setUserName("");
                setUserEmail("");
                setUserPassword("");
                setUserContact("");

                loadUsers();
            })
            .catch((error) => {
                console.error("Error saving user:", error);
                setLoading(false);
                setErrorAnim(true);
                setTimeout(() => setErrorAnim(false), 400);
            });
    };

    // ✅ Load Users
    const loadUsers = () => {
        axios.get("http://127.0.0.1:8000/User/")
            .then((response) => {
                setUserDatas(response.data.data);
            })
            .catch((error) => {
                console.error("Error loading user:", error);
            });
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className={styles.overlay}>
            <div className={`${styles.signupCard} ${errorAnim ? styles.shake : ""}`}>

                <button className={styles.closeBtn}>×</button>

                <h2 className={styles.title}>Create your account</h2>
                <p className={styles.subtitle}>
                    Welcome! Please fill in the details to get started.
                </p>

                <button className={styles.googleBtn}>
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="google"
                    />
                    Continue with Google
                </button>

                <div className={styles.divider}>
                    <span>or</span>
                </div>

                <label className={styles.label}>User Name</label>
                <input
                    type="text"
                    placeholder="Enter your User name"
                    className={styles.input}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />

                <label className={styles.label}>Email address</label>
                <input
                    type="email"
                    placeholder="Enter your email address"
                    className={styles.input}
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />

                <label className={styles.label}>Phone number</label>
                <div className={styles.phoneInput}>
                    <select className={styles.select}>
                        <option>IN</option>
                    </select>
                    <span className={styles.code}>+91</span>
                    <input
                        type="text"
                        placeholder="Enter your phone number"
                        className={styles.input}
                        value={userContact}
                        onChange={(e) => setUserContact(e.target.value)}
                    />
                </div>

                <label className={styles.label}>Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    className={styles.input}
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                />

                <button
                    onClick={handleSave}
                    className={styles.continueBtn}
                    disabled={loading}
                >
                    {loading ? <span className={styles.loader}></span> : "Continue ▶"}
                </button>

                <p className={styles.signinText}>
                    Already have an account?{" "}
                    <Link to={"/guest/login"}>Sign in</Link>
                </p>

            </div>
        </div>
    );
};

export default Registration;