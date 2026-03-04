import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./TicketView.module.css";

const BASE_URL = "http://127.0.0.1:8000";

const TicketView = () => {
    const { bookingId } = useParams();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${BASE_URL}/booking-details/${bookingId}/`)
            .then((res) => {
                console.log("Ticket Data:", res.data);
                setTicket(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Ticket fetch error:", err);
                setLoading(false);
            });
    }, [bookingId]);

    if (loading) {
        return (
            <div className={styles.ticketPage}>
                <h2 style={{ color: "white" }}>Loading Ticket...</h2>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className={styles.ticketPage}>
                <h2 style={{ color: "white" }}>Ticket Not Found</h2>
            </div>
        );
    }

    // FIXED POSTER URL
    const posterUrl = ticket.movie_poster
        ? `${BASE_URL}${ticket.movie_poster.startsWith("/") ? "" : "/"}${ticket.movie_poster}`
        : "";

    return (
        <div className={styles.ticketPage}>

            {/* Header */}
            <div className={styles.confirmHeader}>
                <div className={styles.badge}>✓ Booking Confirmed</div>
                <p className={styles.refText}>
                    Booking Ref: {ticket.booking_id * 50016}
                </p>
            </div>

            {/* Ticket Card */}
            <div className={styles.ticketWrapper}>

                {/* TOP SECTION */}
                <div className={styles.ticketMain}>

                    <div className={styles.poster}>
                        {posterUrl && (
                            <img
                                src={posterUrl}
                                alt={ticket.movie || "Movie Poster"}
                            />
                        )}
                        <div className={styles.posterOverlay}></div>

                        <div className={styles.posterContent}>
                            <h1>{ticket.movie}</h1>
                            <p>{ticket.tagline || ""}</p>
                        </div>
                    </div>

                    <div className={styles.infoRow}>
                        <div className={styles.infoCell}>
                            <span>Date</span>
                            <h4>{ticket.booking_todate || ticket.booking_date}</h4>
                        </div>

                        <div className={styles.infoCell}>
                            <span>Time</span>
                            <h4>{ticket.booking_time}</h4>
                        </div>

                        <div className={styles.infoCell}>
                            <span>Seats</span>
                            <h4>{ticket.seats?.join(", ")}</h4>
                        </div>
                    </div>

                    <div className={styles.theatre}>
                        <span>Theatre</span>
                        <h4>{ticket.theatre}</h4>
                    </div>
                </div>

                {/* Divider */}
                <div className={styles.divider}></div>

                {/* STUB */}
                <div className={styles.ticketStub}>
                    <div className={styles.qrBox}>
                        <div className={styles.qrPlaceholder}></div>
                    </div>

                    <div className={styles.stubInfo}>
                        <p className={styles.scan}>Scan to Enter</p>

                        <div className={styles.stubBlock}>
                            <span>Booking ID</span>
                            <h4>{ticket.booking_id * 50016}</h4>
                        </div>

                        <div className={styles.stubBlock}>
                            <span>Passenger</span>
                            <h4>{ticket.user_name}</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                <button className={styles.downloadBtn}>Download Ticket</button>
                <button className={styles.shareBtn}>Share</button>
            </div>

        </div>
    );
};

export default TicketView; 