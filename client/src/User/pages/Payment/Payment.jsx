import React, { useEffect, useState } from "react";
import styles from "./Payment.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Payment = () => {
    const [bookingData, setBookingData] = useState(null);
    const { bookingId } = useParams();
    const navigate = useNavigate();

    const handlePayment = async () => {

        try {
            await axios.put(
                `http://127.0.0.1:8000/make-payment/${bookingId}/`
            );

            alert("Payment Successful");
            navigate(`/user/ticket/${bookingId}`);

        } catch (error) {
            alert("Payment Failed");
        }
    };

    useEffect(() => {

        axios.get(
            `http://127.0.0.1:8000/booking-details/${bookingId}/`
        )
            .then(res => {
                setBookingData(res.data);
            })
            .catch(err => {
                console.error(err);
            });

    }, [bookingId]);

    return (
        <div className={styles.paymentPage}>
            <div className={styles.paymentCard}>

                <h2 className={styles.paymentTitle}>Secure Payment</h2>

                <div className={styles.innerCard}>

                    {/* Booking Summary */}
                    <div className={styles.summarySection}>
                        <div className={styles.summaryHeader}>
                            <h4>Booking Summary</h4>

                            {/* Small badge style icons */}
                            <div className={styles.badgeWrapper}>
                                <img
                                    src="https://img.icons8.com/color/96/visa.png"
                                    alt="Visa"
                                />
                                <img
                                    src="https://img.icons8.com/color/96/mastercard-logo.png"
                                    alt="Mastercard"
                                />
                            </div>
                        </div>

                        <div className={styles.summaryGrid}>
                            {bookingData && (
                                <>
                                    <p>Movie: {bookingData.movie}</p>
                                    <p>Theatre: {bookingData.theatre}</p>
                                    <p>Screen: {bookingData.screen}</p>
                                    <p>Seats: {bookingData.seats.join(", ")}</p>
                                    <h3 className={styles.totalAmount}>
                                        Total Amount: ₹ {bookingData.amount}
                                    </h3>
                                </>
                            )}
                        </div>

                        {/* <h3 className={styles.totalAmount}>Total Amount: ₹ {bookingData.amount}</h3> */}
                    </div>

                    <div className={styles.divider}></div>

                    {/* Payment Form */}
                    <form className={styles.paymentForm}>

                        <div className={styles.formGroup}>
                            <label>Card Number</label>

                            <div className={styles.cardInputWrapper}>
                                <input placeholder="1234 5678 9012 3456" />

                                <div className={styles.cardIcons}>
                                    <img
                                        src="https://img.icons8.com/color/96/visa.png"
                                        alt="Visa"
                                    />
                                    <img
                                        src="https://img.icons8.com/color/96/mastercard-logo.png"
                                        alt="Mastercard"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Card Holder Name</label>
                                <input placeholder="John Doe" />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Expiry Date</label>
                                <input placeholder="MM / YY" />
                            </div>

                            <div className={styles.formGroup}>
                                <label>CVV</label>
                                <input placeholder="•••" />
                            </div>
                        </div>

                        <button
                            type="button"
                            className={styles.paymentBtn}
                            onClick={handlePayment}
                        >
                            Pay ₹ 500
                        </button>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default Payment;