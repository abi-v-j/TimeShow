import React, { useEffect, useState } from "react";
import styles from "./EditProfile.module.css";
import axios from 'axios';
import { Link } from "react-router";
const EditProfile = () => {
    const theaterId = sessionStorage.getItem('tid');
    const [editProfileDatas, setEditProfileDatas] = useState('');
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editContact, setEditContact] = useState('');
    const [editCity, setEditCity] = useState('');

    const handleSave = () => {

        axios.put(`http://127.0.0.1:8000/edittheaterprofile/${theaterId}/`,
            {
                theater_name: editName,
                theater_email: editEmail,
                theater_contact: editContact,
                city_id: editCity
            })
            .then(res => {
                setEditProfileDatas(res.data.data);
                cancelEdit();
            })
            .catch(console.error);

    }
    const startEdit = (d) => {
        setEditId(d.id);
        setEditName(d.theater_name);
        setEditEmail(d.theater_email);
        setEditContact(d.theater_contact);
    };
    const cancelEdit = () => {
        setEditId(null);
        setEditName('');
        setEditEmail('');
        setEditContact('');
    };

    const loadEditProfile = () => {
        axios.get(`http://127.0.0.1:8000/theaterprofile/${theaterId}/`)
            .then((res) => {
                console.log("MyProfile loaded successfully:", res.data);
                setEditEmail(res.data.theater_email)
                setEditName(res.data.theater_name)
                setEditContact(res.data.theater_contact)
                setEditCity(res.data.city_id)
            })
            .catch((error) => {
                console.error("Error loading editProfile:", error);
            });
    }
    useEffect(() => {
        loadEditProfile();
    }, [])
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h2>Edit Profile</h2>

                <form className={styles.form}>
                    <div className={styles.field}>
                        <label>Name</label>

                        < input type="text" placeholder="Enter name" value={editName} onChange={(e) => setEditName(e.target.value)} />

                    </div>

                    <div className={styles.field}>
                        <label>Email</label>
                        <input type="email" placeholder="Enter email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                    </div>


                    <div className={styles.field}>
                        <label>Contact</label>
                        <input type="text" placeholder="Enter contact number" value={editContact} onChange={(e) => setEditContact(e.target.value)} />
                    </div>



                    <div className={styles.actions}>
                        <Link to="/theatre/MyProfile" className={styles.Btn}>
                            Cancel
                        </Link>
                        <button onClick={handleSave} className={styles.Btn}>
                            Save Changes
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
}

export default EditProfile;
