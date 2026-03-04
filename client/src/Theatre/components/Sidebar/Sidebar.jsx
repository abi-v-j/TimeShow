import React from 'react'
import style from './Sidebar.module.css'
import { Link } from 'react-router'
import logo from '../../../assets/Logo/logo.png'

import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import MovieIcon from '@mui/icons-material/Movie';

import DashboardIcon from '@mui/icons-material/Dashboard';


const Sidebar = () => {
    return (
        <div className={style.Sidebar}>
            <div className={style.Top}>
                <img src={logo} width="170" alt="Logo" />
            </div>
            <hr />
            <div className={style.menu}>

                <Link to="/" className={style.menuitem}>
                    <DashboardIcon className={style.icon} />

                    <span>dashboard</span>
                </Link>

                <Link to="/Theatre/Shows" className={style.menuitem}>
                    <SlowMotionVideoIcon className={style.icon} />

                    <span>Shows</span>
                </Link>

                <Link to="/Theatre/Screen" className={style.menuitem}>
                    <SlowMotionVideoIcon className={style.icon} />

                    <span>Screen</span>
                </Link>

                <Link to="/Theatre/AddShows" className={style.menuitem}>
                    <AddReactionIcon className={style.icon} />
                    <span>Add Shows</span>
                </Link>

                <Link to="/Theatre/AddSeater" className={style.menuitem}>
                    <AddReactionIcon className={style.icon} />
                    <span>Add Seater</span>
                </Link>

                <Link to="/Theatre/ViewBookings" className={style.menuitem}>
                    <MovieIcon className={style.icon} />
                    <span>View Bookings</span>
                </Link>



            </div>

        </div >
    )
}

export default Sidebar
