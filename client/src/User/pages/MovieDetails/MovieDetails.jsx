import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MovieDetails.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const dates = [
    { day: "Mon", date: "4" },
    { day: "Tue", date: "5" },
    { day: "Wed", date: "6" },
    { day: "Thu", date: "7" },
    { day: "Fri", date: "8" },
    { day: "Sat", date: "9" },
];

const filters = ["2D", "IMAX", "Dolby Atmos", "4DX", "Laser"];

const MovieDetails = () => {
    // console.log("MovieDetails Working");
    const { id } = useParams();
    const [theatres, setTheatres] = useState([]);
    const [movieDetailsDatas, setmovieDetailsDatas] = useState(null);
    const [activeFilter, setActiveFilter] = useState("2D");
    const [activeDate, setActiveDate] = useState("4");

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/MovieTheatersWithShows/${id}/`)
            .then((response) => {
                setTheatres(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);


    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/Movie/${id}/`)
            .then((response) => {
                setmovieDetailsDatas(response.data);

            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);

    if (!movieDetailsDatas) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            {/* ===== BANNER ===== */}
            <div
                className={styles.banner}>
                <img src={`http://127.0.0.1:8000/${movieDetailsDatas.movie_banner}`} />
                <div className={styles.overlay}>

                </div>

                <div className={styles.content}>
                    <div className={styles.poster}>
                        <img src={`http://127.0.0.1:8000/${movieDetailsDatas.movie_poster}`} />
                    </div>

                    <div className={styles.details}>
                        <span className={styles.lang}>{movieDetailsDatas.movie_language}</span>

                        <h1>{movieDetailsDatas.movie_title}</h1>

                        <div className={styles.rating}>
                            {/* ⭐ {movieDetailsDatas.movie_rating} / 10 <span>({movieDetailsDatas.movie_votes} Votes)</span> */}
                        </div>

                        <p className={styles.meta}>
                            •{movieDetailsDatas.movie_duration}• Romance, Drama • 2025
                        </p>

                        <p className={styles.desc}>
                            {movieDetailsDatas.movie_description}
                        </p>

                        <div className={styles.actions}>
                            <button className={styles.trailer}>▶ Watch Trailer</button>
                            {/* <Link to="/user/SeatBooking" className={styles.book}>
                                Book Tickets
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div >

            {/* ===== RATING ===== */}
            <div className={styles.ratingBox}>
                <div className={styles.ratingLeft}>
                    ⭐ <span className={styles.score}>
                        {movieDetailsDatas.movie_rating || "8.8"}/10
                    </span>
                    <span className={styles.votes}>
                        ({movieDetailsDatas.movie_votes || "15.4K"} Votes)
                    </span>
                </div>

                <button className={styles.rateBtn}>Rate Now</button>
            </div>


            {/* ===== THEATRES ===== */}
            <div className={styles.theatreSection}>
                <div className={styles.reviewHeaderTop}>
                    <h3>Available Theatres</h3>
                    <span className={styles.reviewCount}>6.1K reviews ›</span>
                </div>
                {
                    theatres.map((theatre, i) => (
                        <div key={i} className={styles.theatreCard}>

                            <div className={styles.theatreInfo}>
                                <h3>{theatre.theater_name}</h3>

                                <span className={styles.cancel}>
                                    Allows Cancellation
                                </span>
                            </div>

                            <div className={styles.showTimes}>
                                {theatre.showtimes.map((time, index) => (
                                    <Link
                                        key={index}
                                        to={`/user/SeatBooking/${theatre.theater_id}/${theatre.movieId}/${time}/${theatre.screen_id}`}
                                        className={styles.timePill}
                                    >
                                        {time}
                                    </Link>
                                ))}
                            </div>

                        </div>
                    ))
                }
            </div>


            <div className={styles.section}>
                <div className={styles.headerRow}>
                    <h3>Top Offers</h3>
                    <span className={styles.viewAll}>View All ›</span>
                </div>

                <div className={styles.offerScroll}>

                    <div className={styles.offerCard}>
                        <div className={styles.offerRow}>
                            <div className={styles.offerIcon}>🎁</div>
                            <div>
                                <h4>YES Private Debit Card Offer</h4>
                                <p>Tap to view details</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.offerCard}>
                        <div className={styles.offerRow}>
                            <div className={styles.offerIcon}>🎟</div>
                            <div>
                                <h4>Buy 1 Get 1 Free</h4>
                                <p>Limited time offer</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.offerCard}>
                        <div className={styles.offerRow}>
                            <div className={styles.offerIcon}>🎓</div>
                            <div>
                                <h4>Student Discount</h4>
                                <p>Flat 20% off</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className={styles.reviewSection}>
                <div className={styles.reviewHeaderTop}>
                    <h3>Top Reviews</h3>
                    <span className={styles.reviewCount}>6.1K reviews ›</span>
                </div>

                <div className={styles.reviewScroll}>

                    <div className={styles.reviewCard}>
                        <div className={styles.reviewUserRow}>
                            <div className={styles.avatar}></div>
                            <div>
                                <h4>User 1</h4>
                                <p className={styles.bookedText}>Booked on TimeShow</p>
                            </div>
                            <div className={styles.ratingRight}>⭐ 10/10</div>
                        </div>
                        <p className={styles.reviewText}>
                            Amazing movie with great comedy!
                        </p>
                    </div>

                    <div className={styles.reviewCard}>
                        <div className={styles.reviewUserRow}>
                            <div className={styles.avatar}></div>
                            <div>
                                <h4>User 2</h4>
                                <p className={styles.bookedText}>Booked on TimeShow</p>
                            </div>
                            <div className={styles.ratingRight}>⭐ 9/10</div>
                        </div>
                        <p className={styles.reviewText}>
                            Action scenes were fantastic!
                        </p>
                    </div>

                    <div className={styles.reviewCard}>
                        <div className={styles.reviewUserRow}>
                            <div className={styles.avatar}></div>
                            <div>
                                <h4>User 3</h4>
                                <p className={styles.bookedText}>Booked on TimeShow</p>
                            </div>
                            <div className={styles.ratingRight}>⭐ 8/10</div>
                        </div>
                        <p className={styles.reviewText}>
                            Loved the soundtrack and visuals.
                        </p>
                    </div>

                </div>
            </div>


            <div className={styles.stickyBar}>
                <Link to="/user/SeatBooking" className={styles.bookBtn}>
                    Book Tickets
                </Link>
            </div >
        </>
    );
};

export default MovieDetails;
