import React, { useEffect, useState } from 'react'
import styles from './District.module.css'
import axios from 'axios';
const District = () => {
    const [district, setDistrict] = useState("");
    const [districtDatas, setDistrictDatas] = useState([]);

    const handleDelete = id =>
        axios.delete(`http://127.0.0.1:8000/DeleteDistrict/${id}/`)
            .then(res => setDistrictDatas(res.data.data))
            .catch(console.error);


    const handleSave = () => {
        const Fdata = new FormData();
        Fdata.append("district_name", district);
        axios.post("http://127.0.0.1:8000/District/", Fdata)
            .then((response) => {
                console.log("District saved successfully:", response.data);
                loadDistricts();

            })
            .catch((error) => {
                console.error("Error saving district:", error);
            });
    }

    const loadDistricts = () => {
        axios.get("http://127.0.0.1:8000/District/")
            .then((response) => {
                console.log("Districts loaded successfully:", response.data);
                setDistrictDatas(response.data.data);
            })
            .catch((error) => {
                console.error("Error loading districts:", error);
            });
    }


    useEffect(() => {
        loadDistricts();
    }, [])
    return (

        <div className={styles.container}>
            <div className={styles.h2}>
                District
            </div>

            <div className={styles.inputbox}>

                <input type="text" name="txt_District" onChange={(e) => setDistrict(e.target.value)} />
            </div>

            <div className={styles.button}>
                <input type="submit" name="btnlogin" value="Save" onClick={handleSave}
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
                        districtDatas.map((d, index) => (
                            <tbody key={d.id}>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{d.district_name}</td>
                                    <td>
                                        <button className={styles.actionBtn}>Edit</button>
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

export default District;