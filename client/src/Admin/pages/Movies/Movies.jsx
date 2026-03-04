import React, { useEffect, useState } from "react";
import styles from "./Movies.module.css";
import axios from "axios";

const Movies = () => {

    const [moviesData, setMoviessDatas] = useState([]);
    const [moviesTitle, setMoviesTitle] = useState("");
    const [moviesDuration, setMoviesDuration] = useState("");
    const [moviesLanguage, setMoviesLanguage] = useState("");
    const [moviesDescription, setMoviesDescription] = useState("");
    const [moviesPoster, setMoviesPoster] = useState("");
    const [moviesBanner, setMoviesBanner] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = id =>
        axios.delete(`http://127.0.0.1:8000/DeleteMovie/${id}/`)
            .then(res => loadMovies())
            .catch(console.error);

    const handleSave = () => {
        const Fdata = new FormData();
        Fdata.append("movie_title", moviesTitle);
        Fdata.append("movie_duration", moviesDuration);
        Fdata.append("movie_language", moviesLanguage);
        Fdata.append("movie_description", moviesDescription);
        Fdata.append("movie_poster", moviesPoster);
        Fdata.append("movie_banner", moviesBanner);
        axios.post("http://127.0.0.1:8000/Movie/", Fdata)
            .then(response => {
                console.log("Movie added:", response.data);
                setIsModalOpen(false);
                loadMovies();
            })
            .catch(error => {
                console.error("Error adding movie:", error);
            });

    };
    const loadMovies = () => {
        axios.get("http://127.0.0.1:8000/Movie/")
            .then(response => {
                console.log(response.data.data);

                setMoviessDatas(response.data.data);
            })
            .catch(error => {
                console.error("Error loading movies:", error);
            });
    }
    useEffect(() => {
        loadMovies();
    }, []);
    return (
        <div className={styles.page}>

            {/* HEADER */}
            <div className={styles.header}>
                <h1>Movie Management</h1>

                <button
                    className={styles.addButton}
                    onClick={() => setIsModalOpen(true)}
                >
                    + Add Movie
                </button>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <h3>Total Movies</h3>
                    <p>{moviesData.length}</p>
                </div>
            </div>
            {/* TABLE */}
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Movie</th>
                            <th>Banner</th>
                            <th>Title</th>
                            {/* <th>Description</th> */}
                            <th>Duration</th>
                            <th>Language</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {moviesData.length === 0 ? (
                            <tr>
                                <td colSpan="3" style={{ textAlign: "center", padding: "2rem", opacity: 0.5 }}>
                                    No movies added yet
                                </td>
                            </tr>
                        ) : (
                            moviesData.map((d, index) => (
                                <tr key={d.id}>

                                    <td className={styles.movieCell}>
                                        <img src={`http://127.0.0.1:8000/${d.movie_poster}`} />
                                    </td>
                                    <td className={styles.banner}>
                                        <img src={`http://127.0.0.1:8000/${d.movie_banner}`} />
                                    </td>
                                    <td>{d.movie_title}</td>
                                    {/* <td>{d.movie_description}</td> */}
                                    <td>{d.movie_duration}</td>
                                    <td>{d.movie_language}</td>
                                    <td><button onClick={() => handleDelete(d.id)} className={styles.actionBtn}>Delete</button></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {
                isModalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContainer}>

                            {/* Modal Header */}
                            <div className={styles.modalHeader}>
                                <h2>Add Movie</h2>
                                <button
                                    className={styles.closeBtn}
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className={styles.modalBody}>
                                <form>

                                    <div className={styles.formGroup}>
                                        <label>Title</label>
                                        <input
                                            value={moviesTitle}
                                            onChange={(e) => setMoviesTitle(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Description</label>
                                        <textarea
                                            rows="3"
                                            value={moviesDescription}
                                            onChange={(e) => setMoviesDescription(e.target.value)}

                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Duration</label>
                                        <input
                                            value={moviesDuration}
                                            onChange={(e) => setMoviesDuration(e.target.value)}
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Language</label>
                                        <input
                                            placeholder="e.g. English, Hindi"
                                            value={moviesLanguage}
                                            onChange={(e) => setMoviesLanguage(e.target.value)}
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Poster URL</label>
                                        <input
                                            type="file"
                                            onChange={(e) => setMoviesPoster(e.target.files[0])}

                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Banner URL</label>
                                        <input
                                            type="file"
                                            onChange={(e) => setMoviesBanner(e.target.files[0])}
                                        />
                                    </div>

                                    {/* Footer Buttons */}
                                    <div className={styles.modalFooter}>
                                        <button
                                            type="button"
                                            className={styles.cancelBtn}
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            className={styles.saveBtn}
                                            onClick={handleSave}
                                        >
                                            Save Movie
                                        </button>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>
                )
            }

        </div >
    );
};

export default Movies;
