import React, { useEffect, useState } from 'react'
import styles from './SeatType.module.css'
import axios from 'axios';
const SeatType = () => {
    const [seattype, setSeatType] = useState("");
    const [seattypeDatas, setSeatTypeDatas] = useState([]);
    const [editId, setEditId] = useState(null);   // ← NEW
    const [editName, setEditName] = useState('');   // ← NEW

    const handleDelete = id =>
        axios.delete(`http://127.0.0.1:8000/DeleteSeatType/${id}/`)
            .then(res => setSeatTypeDatas(res.data.data))
            .catch(console.error);



    const handleSave = () => {
        if (editId) {                                        // UPDATE mode
            axios.put(`http://127.0.0.1:8000/EditSeatType/${editId}/`,
                { seattype_name: editName })
                .then(res => {
                    setSeatTypeDatas(res.data.data);
                    cancelEdit();                             // reset form
                })
                .catch(console.error);
        } else {                                            // CREATE mode
            const Fdata = new FormData();
            Fdata.append("seattype_name", seattype);
            axios.post("http://127.0.0.1:8000/SeatType/", Fdata)
                .then((response) => {
                    console.log("SeatType saved successfully:", response.data);
                    loadSeatTypes();

                })
                .catch((error) => {
                    console.error("Error saving seat type:", error);
                });
        }
    }

    const startEdit = (d) => {
        setEditId(d.id);
        setEditName(d.seattype_name);
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditName('');
    };

    const loadSeatTypes = () => {
        axios.get("http://127.0.0.1:8000/SeatType/")
            .then((response) => {
                console.log("SeatTypes loaded successfully:", response.data);
                setSeatTypeDatas(response.data.data);
            })
            .catch((error) => {
                console.error("Error loading seat types:", error);
            });
    }


    useEffect(() => {
        loadSeatTypes();
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
                SeatTypes
            </div>

            <div className={styles.inputbox}>
                {editId ? (
                    <input type="text" name="txt_Gen" value={editName} onChange={e => setEditName(e.target.value)} />
                ) : (
                    <input type="text" name="txt_Gen" onChange={(e) => setSeatType(e.target.value)} />
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
                            <th>Seat Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>




                    {
                        seattypeDatas.map((d, index) => (

                            <tbody key={d.id}>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{d.seattype_name}</td>
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

export default SeatType;