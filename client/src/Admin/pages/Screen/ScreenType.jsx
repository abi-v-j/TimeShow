import React, { useEffect, useState } from "react";
import styles from "./ScreenType.module.css";
import axios from "axios";

const ScreenType = () => {
    const [screenTypes, setScreenTypes] = useState("");
    const [ScreenTypeDatas, setScreenTypeDatas] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState('');

    const handleDelete = id =>
        axios.delete(`http://127.0.0.1:8000/DeleteScreentype/${id}/`)
            .then(res => setScreenTypeDatas(res.data.data))
            .catch(console.error);

    const handleSave = () => {
        if (editId) {                                        // UPDATE mode
            axios.put(`http://127.0.0.1:8000/EditScreentype/${editId}/`,
                { screentype_name: editName })
                .then(res => {
                    setScreenTypeDatas(res.data.data);
                    cancelEdit();                             // reset form
                })
                .catch(console.error);
        } else {                                            // CREATE mode
            const Fdata = new FormData();
            Fdata.append("screentype_name", screenTypes);
            axios.post("http://127.0.0.1:8000/Screentype/", Fdata)
                .then((response) => {
                    console.log("Screen Type saved successfully:", response.data);
                    loadScreenTypes();

                })
                .catch((error) => {
                    console.error("Error saving screen type:", error);
                });
        }
    }

    const startEdit = (d) => {
        setEditId(d.id);
        setEditName(d.screentype_name);
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditName('');
    };

    const loadScreenTypes = () => {
        axios.get("http://127.0.0.1:8000/Screentype/")
            .then((response) => {
                console.log("Screen Types loaded successfully:", response.data);
                setScreenTypeDatas(response.data.data);
            })
            .catch((error) => {
                console.error("Error loading screen types:", error);
            });
    }

    useEffect(() => {
        loadScreenTypes();
    }, [])

    return (

        //  <div className={styles.statsGrid}>
        //                 <div className={styles.statCard}>
        //                     <h3>Total Categories</h3>
        //                     <p>{screenTypes.length}</p>
        //                 </div>
        //             </div>

        <div className={styles.container}>

            <div className={styles.h2}>
                Screen Type
            </div>

            <div className={styles.inputbox}>
                {editId ? (
                    <input type="text" name="txt_Gen" value={editName} onChange={e => setEditName(e.target.value)} />
                ) : (
                    <input type="text" name="txt_Gen" onChange={(e) => setScreenTypes(e.target.value)} />
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
                            <th>Screen Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>



                    {
                        ScreenTypeDatas.map((d, index) => (

                            <tbody key={d.id}>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{d.screentype_name}</td>
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
    );
};

export default ScreenType;
