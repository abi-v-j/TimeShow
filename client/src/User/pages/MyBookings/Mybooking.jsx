import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MyBooking.module.css";
import { Link } from "react-router";

const MyBookings = () => {

    const userId = sessionStorage.getItem("uid");
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/MyBookings/${userId}/`)
            .then(res => {
                console.log("Bookings Data:", res.data);
                setBookings(res.data.data);
            })
            .catch(err => console.log(err));
    }, [userId]);

    return (
        <div className={styles.page}>

            <h2 className={styles.title}>My Bookings</h2>

            <div className={styles.container}>

                {bookings.map((d, index) => (
                    <div key={index} className={styles.card}>

                        <div className={styles.poster}>
                            <img src={`http://127.0.0.1:8000/${d.movie_poster}`} alt={d.movie} />
                        </div>

                        <div className={styles.details}>

                            <h3 className={styles.movie}>{d.movie}</h3>

                            <p><span>Date:</span> {d.booking_todate}</p>
                            <p><span>Time:</span> {d.booking_time}</p>
                            <p>Seats: {d.seats?.join(", ")}</p>
                            <p><span>Amount:</span> ₹{d.booking_amount}</p>

                            <div className={styles.bottom}>

                                {d.booking_status === 1 ? (
                                    <span className={styles.paid}>Paid</span>
                                ) : (
                                    <span className={styles.pending}>Pending</span>
                                )}

                                <Link to={`/ticket/${d.booking_id}`}>
                                    <button className={styles.ticketBtn}>
                                        View Ticket
                                    </button>
                                </Link>

                            </div>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default MyBookings;