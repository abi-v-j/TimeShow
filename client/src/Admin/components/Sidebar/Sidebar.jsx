import React from 'react'
import style from './Sidebar.module.css'
import { Link } from 'react-router'
import logo from '../../../assets/Logo/logo.png'
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import MovieIcon from '@mui/icons-material/Movie';
import PlaceIcon from '@mui/icons-material/Place';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
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

                <Link to="/admin/district" className={style.menuitem}>
                    <SlowMotionVideoIcon className={style.icon} />

                    <span>District</span>
                </Link>

                <Link to="/admin/Genres" className={style.menuitem}>
                    <AddReactionIcon className={style.icon} />
                    <span>Genres</span>
                </Link>

                <Link to="/admin/MovieGenres" className={style.menuitem}>
                    <MovieIcon className={style.icon} />
                    <span>Movie Genre</span>
                </Link>

                <Link to="/admin/City" className={style.menuitem}>
                    <PlaceIcon className={style.icon} />
                    <span>City</span>
                </Link>

                <Link to="/admin/Movies" className={style.menuitem}>
                    <MovieIcon className={style.icon} />
                    <span>Movies</span>
                </Link>

                <Link to="/admin/ScreenType" className={style.menuitem}>
                    <MovieIcon className={style.icon} />
                    <span>Screen Type</span>
                </Link>

                <Link to="/admin/SeatType" className={style.menuitem}>
                    <MovieIcon className={style.icon} />
                    <span>Seat Type</span>
                </Link>

                <Link to="/admin/ListBookings" className={style.menuitem}>
                    <ReceiptLongIcon className={style.icon} />
                    <span>ListBookings</span>
                </Link>

            </div>

        </div >
    )
}

export default Sidebar
