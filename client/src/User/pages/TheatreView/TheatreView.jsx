import React from "react";
import styles from "./TheatreView.module.css";
import FavoriteIcon from '@mui/icons-material/Favorite';

const TheatreView = () => {
    return (
        <div className={styles.page}>
            <h2 className={styles.heading}>Theatres</h2>

            {/* THEATRE 1 */}
            <div className={styles.card}>
                <div className={styles.left}>
                    <div className={styles.nameRow}>
                        <h3>ANN Cinema Complex 4K 3D Dolby Atmos RGB LASER</h3>
                        <FavoriteIcon className={styles.heart} />
                    </div>
                    <p className={styles.info}>
                        📍 10.0 km (Kothamangalam) | Cancellation available
                    </p>
                </div>

                <div className={styles.shows}>
                    <button className={styles.timeBtn}>06:00 PM</button>
                    <button className={styles.timeBtn}>09:00 PM</button>
                </div>
            </div>

            {/* THEATRE 2 */}
            <div className={styles.card}>
                <div className={styles.left}>
                    <div className={styles.nameRow}>
                        <h3>G Cinemas: Kothamangalam 4K 3D Dolby Atmos</h3>
                        <FavoriteIcon className={styles.heart} />
                    </div>
                    <p className={styles.info}>
                        📍 10.4 km (Kothamangalam) | Cancellation available
                    </p>
                </div>

                <div className={styles.shows}>
                    <button className={styles.timeBtn}>05:00 PM</button>
                    <button className={styles.timeBtn}>08:00 PM</button>
                    <button className={styles.timeBtn}>10:00 PM</button>
                </div>
            </div>

            {/* THEATRE 3 */}
            <div className={styles.card}>
                <div className={styles.left}>
                    <div className={styles.nameRow}>
                        <h3>J MAX 2K 3D Dolby 7.1 : Pattimattom</h3>
                        <FavoriteIcon className={styles.heart} />
                    </div>
                    <p className={styles.info}>
                        📍 15.7 km (Kochi) | Cancellation available
                    </p>
                </div>

                <div className={styles.shows}>
                    <button className={styles.timeBtn}>06:30 PM</button>
                    <button className={styles.timeBtn}>09:45 PM</button>
                </div>
            </div>

            {/* THEATRE 4 */}
            <div className={styles.card}>
                <div className={styles.left}>
                    <div className={styles.nameRow}>
                        <h3>Silver Hills Naxa Cinemas 4K Dolby Atmos</h3>
                        <FavoriteIcon className={styles.heart} />
                    </div>
                    <p className={styles.info}>
                        📍 16.4 km (Thodupuzha) | Cancellation available
                    </p>
                </div>

                <div className={styles.shows}>
                    <button className={styles.timeBtn}>07:00 PM</button>
                    <button className={styles.timeBtn}>09:45 PM</button>
                </div>
            </div>

            {/* THEATRE 5 */}
            <div className={styles.card}>
                <div className={styles.left}>
                    <div className={styles.nameRow}>
                        <h3>Aashirvad Cineplex : Thodupuzha</h3>
                        <FavoriteIcon className={styles.heart} />
                    </div>
                    <p className={styles.info}>
                        📍 16.4 km (Thodupuzha) | Cancellation available
                    </p>
                </div>

                <div className={styles.shows}>
                    <button className={styles.timeBtn}>06:30 PM</button>
                    <button className={styles.timeBtn}>09:15 PM</button>
                </div>
            </div>
        </div>
    );
};

export default TheatreView;
