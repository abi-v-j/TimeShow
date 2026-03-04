import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AddSeater.module.css";

const AddSeater = () => {

    const [screens, setScreens] = useState([]);
    const [seatTypes, setSeatTypes] = useState([]);

    const [selectedScreen, setSelectedScreen] = useState("");
    const [selectedSeatType, setSelectedSeatType] = useState("");

    const [rows, setRows] = useState("");
    const [columns, setColumns] = useState("");
    const [aisles, setAisles] = useState("");
    const [price, setPrice] = useState("");
    const [layoutList, setLayoutList] = useState([]);

    const totalSeats =
        rows && columns ? parseInt(rows) * parseInt(columns) : 0;

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/Screen/")
            .then(res => setScreens(res.data.data));
    }, []);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/SeatType/")
            .then(res => setSeatTypes(res.data.data));
    }, []);

    const loadLayouts = () => {
        axios.get("http://127.0.0.1:8000/ScreenSeat/")
            .then(res => setLayoutList(res.data.data));
    };

    useEffect(() => {
        loadLayouts();
    }, []);

    const handleSubmit = () => {

        if (!selectedScreen || !selectedSeatType || !rows || !columns || !price) {
            alert("Fill all fields");
            return;
        }

        const formData = new FormData();
        formData.append("screen_id", selectedScreen);
        formData.append("seattype_id", selectedSeatType);
        formData.append("rows", rows);
        formData.append("columns", columns);
        formData.append("aisles", aisles);
        formData.append("screenseat_total", totalSeats);
        formData.append("screenseat_amountper", price);

        axios.post("http://127.0.0.1:8000/ScreenSeat/", formData)
            .then(res => {
                alert(res.data.msg);
                loadLayouts();
            })
            .catch(err => console.error(err));
    };
    const handleDelete = id => {
        axios.get(`http://127.0.0.1:8000/DeleteScreenSeat/${id}/`)
            .then(() => loadLayouts());
    };
    return (
        <div className={styles.container}>
            <h2>Add Seat Layout</h2>

            <select
                value={selectedScreen}
                onChange={(e) => setSelectedScreen(e.target.value)}
            >
                <option value="">Select Screen</option>
                {screens.map(s => (
                    <option key={s.id} value={s.id}>
                        {s.Screen_name}
                    </option>
                ))}
            </select>

            <select
                value={selectedSeatType}
                onChange={(e) => setSelectedSeatType(e.target.value)}
            >
                <option value="">Select Seat Type</option>
                {seatTypes.map(t => (
                    <option key={t.id} value={t.id}>
                        {t.seattype_name}
                    </option>
                ))}
            </select>

            <input
                type="number"
                placeholder="Rows"
                value={rows}
                onChange={(e) => setRows(e.target.value)}
            />

            <input
                type="number"
                placeholder="Columns"
                value={columns}
                onChange={(e) => setColumns(e.target.value)}
            />

            <input
                type="text"
                placeholder="Aisles (ex: 4,8)"
                value={aisles}
                onChange={(e) => setAisles(e.target.value)}
            />

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />

            <p><strong>Total Seats:</strong> {totalSeats}</p>

            <button onClick={handleSubmit}>
                Save Layout
            </button>

            {/* 🔥 LIVE PREVIEW */}
            {/* 🔥 CINEMA PREVIEW */}
            {rows && columns && (
                <div className={styles.previewWrapper}>

                    <h3 className={styles.previewTitle}>
                        Layout Preview
                    </h3>

                    {/* 🎬 SCREEN */}
                    <div className={styles.screenBar}></div>

                    {/* SEATS */}
                    {Array.from({ length: parseInt(rows) }).map((_, rowIndex) => {

                        const rowLabel = String.fromCharCode(65 + rowIndex);

                        const aisleArray = aisles
                            ? aisles.split(",").map(a => parseInt(a.trim()))
                            : [];

                        return (
                            <div key={rowIndex} className={styles.previewRow}>

                                <div className={styles.rowLabel}>
                                    {rowLabel}
                                </div>

                                {Array.from({ length: parseInt(columns) }).map((_, colIndex) => {

                                    const seatNumber = colIndex + 1;

                                    return (
                                        <React.Fragment key={colIndex}>

                                            <div className={styles.previewSeat}></div>

                                            {aisleArray.includes(seatNumber) && (
                                                <div className={styles.aisleGap}></div>
                                            )}

                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            )}

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>Screen</th>
                            <th>Seat Type</th>
                            <th>Rows</th>
                            <th>Columns</th>
                            <th>Total</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {layoutList.map((layout, index) => (
                            <tr key={layout.id}>
                                <td>{index + 1}</td>
                                <td>{layout.screen_id__Screen_name}</td>
                                <td>{layout.seattype_id__seattype_name}</td>
                                <td>{layout.rows}</td>
                                <td>{layout.columns}</td>
                                <td>{layout.screenseat_total}</td>
                                <td>₹{layout.screenseat_amountper}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(layout.id)}
                                        className={styles.deleteBtn}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



        </div >


    );
}

export default AddSeater;