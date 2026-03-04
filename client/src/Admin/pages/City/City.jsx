import React, { useEffect, useState } from 'react'
import styles from './City.module.css'
import axios from 'axios';
const City = () => {
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [districtDatas, setDistrictDatas] = useState([]);
    const [cityDatas, setCityDatas] = useState([]);
    const handleSave = () => {
        const Fdata = new FormData();
        Fdata.append("city_name", city);
        Fdata.append("district_id", district);
        axios.post("http://127.0.0.1:8000/City/", Fdata)
            .then((response) => {
                console.log("City saved successfully:", response.data);
                loadCity();

            })
            .catch((error) => {
                console.error("Error saving city:", error);
            });
    }
    const loadDistrict = () => {
        axios.get("http://127.0.0.1:8000/District/")
            .then((response) => {
                console.log("Districts loaded successfully:", response.data);
                setDistrictDatas(response.data.data);
            })
            .catch((error) => {
                console.error("Error loading districts:", error);
            });
    }
    const loadCity = () => {
        axios.get("http://127.0.0.1:8000/City/")
            .then((response) => {
                console.log("Cities loaded successfully:", response.data);
                setCityDatas(response.data.data);
            })
            .catch((error) => {
                console.error("Error loading cities:", error);
            });
    }



    useEffect(() => {
        loadCity();
        loadDistrict();
    }, [])
    return (

        <div className={styles.container}>
            <div className={styles.h2}>
                City
            </div>
            <div className={styles.inputbox}>
                <label>district</label>
                <select className={styles.select} onChange={(e) => setDistrict(e.target.value)}>
                    <option>Select </option>
                    {
                        districtDatas.map((data, index) => (
                            <option value={data.id}>{data.district_name}</option>
                        ))
                    }
                </select>
            </div>

            <div className={styles.inputbox}>
                <label>City</label>
                <input type="text" name="txt_City" onChange={(e) => setCity(e.target.value)} />
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
                            <th>City</th>
                            {/* <th>District</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>


                    <tbody>

                        {
                            cityDatas.map((data, index) => (

                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{data.city_name}</td>
                                    <td>
                                        <button className={styles.actionBtn}>Edit</button>
                                        <button className={styles.actionBtn}>Delete</button>
                                    </td>
                                </tr>


                            ))
                        }


                    </tbody>
                </table>
            </div>
        </div >

    )
}

export default City;