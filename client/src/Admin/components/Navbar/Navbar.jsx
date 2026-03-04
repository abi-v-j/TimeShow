import React, { useEffect, useState } from "react";
import style from "./Navbar.module.css";
import profile from "../../../assets/Profile/profile.jpg";

import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Navbar = () => {
    const [theme, setTheme] = useState("dark");

    // Apply theme
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div className={style.Navbar}>
            <div className={style.NavbarContainer}>
                {/* Search */}
                <div className={style.Search}>
                    <input type="text" placeholder="Search" />
                    <SearchIcon className={style.icon} />
                </div>

                {/* Right Items */}
                <div className={style.items}>
                    <div className={style.item}>
                        <LanguageIcon className={style.icon} />
                        English
                    </div>

                    {/*  THEME ICON */}
                    <div className={style.item} onClick={toggleTheme}>
                        {theme === "dark" ? (
                            <DarkModeIcon className={style.icon} />
                        ) : (
                            <LightModeIcon className={style.icon} />
                        )}
                    </div>

                    <div className={style.item}>
                        <FullscreenExitIcon className={style.icon} />
                    </div>

                    <div className={style.item}>
                        <NotificationsIcon className={style.icon} />
                        <span className={style.counter}>5</span>
                    </div>

                    <div className={style.item}>
                        <ChatBubbleIcon className={style.icon} />
                        <span className={style.counter}>5</span>
                    </div>

                    <div className={style.item}>
                        <FeaturedPlayListIcon className={style.icon} />
                    </div>

                    <div className={style.item}>
                        <img src={profile} alt="profile" className={style.profileImg} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
