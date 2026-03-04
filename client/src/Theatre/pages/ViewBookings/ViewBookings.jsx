import React from "react";
import styles from "./ViewBookings.module.css";

const bookings = [
    {
        id: "TKT-8291",
        user: "Vikram Rathore",
        movie: "Interstellar",
        seats: "J12, J13",
        amount: "₹640",
        date: "20 Feb 2026",
        status: "confirmed",
        avatar: "VR",
    },
    {
        id: "TKT-8292",
        user: "Ananya Sharma",
        movie: "The Dark Knight",
        seats: "A1, A2, A3",
        amount: "₹960",
        date: "20 Feb 2026",
        status: "confirmed",
        avatar: "AS",
    },
    {
        id: "TKT-8293",
        user: "Rahul Gupta",
        movie: "Oppenheimer",
        seats: "D5",
        amount: "₹320",
        date: "21 Feb 2026",
        status: "pending",
        avatar: "RG",
    },
    {
        id: "TKT-8294",
        user: "Zoya Khan",
        movie: "Inception",
        seats: "F8, F9",
        amount: "₹500",
        date: "22 Feb 2026",
        status: "cancelled",
        avatar: "ZK",
    },
];

const ViewBookings = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.titleArea}>
                    <h1 className={styles.title}>
                        All <span>Bookings</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Track and manage ticket bookings.
                    </p>
                </div>
            </header>

            <div className={styles.tableCard}>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Customer</th>
                                <th>Movie</th>
                                <th>Seats</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td className={styles.idCell}>{booking.id}</td>

                                    <td>
                                        <div className={styles.userCell}>
                                            <div className={styles.avatar}>
                                                {booking.avatar}
                                            </div>
                                            <span>{booking.user}</span>
                                        </div>
                                    </td>

                                    <td className={styles.movieCell}>
                                        {booking.movie}
                                    </td>

                                    <td>{booking.seats}</td>

                                    <td className={styles.amountCell}>
                                        {booking.amount}
                                    </td>

                                    <td>{booking.date}</td>

                                    <td>
                                        <span
                                            className={`${styles.status} ${styles[booking.status]}`}
                                        >
                                            {booking.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewBookings;