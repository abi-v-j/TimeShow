import React, { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";
import logo from "../../../assets/Logo/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [showSearch, setShowSearch] = useState(false);
    const searchRef = useRef(null);

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSearch(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={styles.navbar}>

            <h2 className={styles.logo}>
                Time<span>Show</span>
            </h2>


            <div className={styles.menu}>
                <Link to="/User" className={styles.link}>Home</Link>
                <Link to="/User/MovieListing" className={styles.link}>Movies</Link>
                <Link to="/User/SeatBooking" className={styles.link}>Theaters</Link>
                <Link to="/User/MovieDetails" className={styles.link}>Releases</Link>
            </div>


            <div className={styles.actions}>
                <div className={styles.searchWrapper} ref={searchRef}>
                    <SearchIcon
                        className={styles.searchIcon}
                        onClick={() => setShowSearch(true)}
                    />

                    <input
                        type="text"
                        placeholder="Search"
                        className={`${styles.searchInput} ${showSearch ? styles.active : ""
                            }`}
                    />
                </div>

                <Link className={styles.loginBtn} to={'/guest/login'} >Login</Link>
            </div>
        </div>
    );
};

export default Navbar;
