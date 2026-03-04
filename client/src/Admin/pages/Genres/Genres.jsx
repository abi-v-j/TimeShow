import React, { useEffect, useState } from 'react'
import styles from './Genres.module.css'
import axios from 'axios';
const Genres = () => {
    const [genres, setGenres] = useState("");
    const [genresDatas, setGenresDatas] = useState([]);
    const [editId, setEditId] = useState(null);   // ← NEW
    const [editName, setEditName] = useState('');   // ← NEW

    const handleDelete = id =>
        axios.delete(`http://127.0.0.1:8000/DeleteGenre/${id}/`)
            .then(res => setGenresDatas(res.data.data))
            .catch(console.error);



    const handleSave = () => {
        if (editId) {                                        // UPDATE mode
            axios.put(`http://127.0.0.1:8000/EditGenre/${editId}/`,
                { genre_name: editName })
                .then(res => {
                    setGenresDatas(res.data.data);
                    cancelEdit();                             // reset form
                })
                .catch(console.error);
        } else {                                            // CREATE mode
            const Fdata = new FormData();
            Fdata.append("genre_name", genres);
            axios.post("http://127.0.0.1:8000/Genre/", Fdata)
                .then((response) => {
                    console.log("Genre saved successfully:", response.data);
                    loadGenres();

                })
                .catch((error) => {
                    console.error("Error saving genre:", error);
                });
        }
    }

    const startEdit = (d) => {
        setEditId(d.id);
        setEditName(d.genre_name);
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditName('');
    };

    const loadGenres = () => {
        axios.get("http://127.0.0.1:8000/Genre/")
            .then((response) => {
                console.log("Genres loaded successfully:", response.data);
                setGenresDatas(response.data.data);
            })
            .catch((error) => {
                console.error("Error loading genres:", error);
            });
    }


    useEffect(() => {
        loadGenres();
    }, [])
    return (

        //  <div className={styles.statsGrid}>
        //                 <div className={styles.statCard}>
        //                     <h3>Total Categories</h3>
        //                     <p>{genres.length}</p>
        //                 </div>
        //             </div>

        <div className={styles.container}>

            <div className={styles.h2}>
                Genres
            </div>

            <div className={styles.inputbox}>
                {editId ? (
                    <input type="text" name="txt_Gen" value={editName} onChange={e => setEditName(e.target.value)} />
                ) : (
                    <input type="text" name="txt_Gen" onChange={(e) => setGenres(e.target.value)} />
                )}
            </div>
            <div className={styles.button}>
                <input type="submit" name="btnlogin" value={editId ? "Update" : "Save"} onClick={handleSave}
                    className={styles.btn} />

            </div>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Genre</th>
                            <th>Action</th>
                        </tr>
                    </thead>




                    {
                        genresDatas.map((d, index) => (

                            <tbody key={d.id}>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{d.genre_name}</td>
                                    <td>
                                        <button onClick={() => startEdit(d)} className={styles.actionBtn}>Edit</button>
                                        <button onClick={() => handleDelete(d.id)} className={styles.actionBtn}>Delete</button>
                                    </td>
                                </tr>

                            </tbody>
                        ))}
                </table>
            </div>
        </div >

    )
}

export default Genres;