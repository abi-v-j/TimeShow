import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MovieListing from "../User/pages/MovieListing/MovieListing";
import MovieDetails from '../User/pages/MovieDetails/MovieDetails';
import UserLayout from '../User/UserLayout/UserLayout';
import SeatBooking from '../User/pages/SeatBooking/SeatBooking';
import TheatreView from '../User/pages/TheatreView/TheatreView';
import MyProfile from '../User/pages/MyProfile/Myprofile';
import ChangePassword from '../User/pages/ChangePassword/ChangePassword';
import EditProfile from '../User/pages/EditProfile/EditProfile';
import Payment from '../User/pages/Payment/Payment';
import TicketView from '../User/pages/TicketView/TicketView';
import MyBookings from '../User/pages/MyBookings/Mybooking';

const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/MovieListing" element={<MovieListing />} />
            <Route path="movie/:id" element={<MovieDetails />} />
            <Route path="/SeatBooking/:theaterId/:movieId/:time/:screenId" element={<SeatBooking />} />
            <Route path="/TheatreView" element={<TheatreView />} />
            <Route path="/MyProfile" element={<MyProfile />} />
            <Route path="/EditProfile" element={<EditProfile />} />
            <Route path="/ChangePassword" element={<ChangePassword />} />
            <Route path="/payment/:bookingId" element={<Payment />} />
            <Route path="/ticket/:bookingId" element={<TicketView />} />
            <Route path="/mybookings" element={<MyBookings />} />
        </Routes>
    );
};

export default UserRoutes;
