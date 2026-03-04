import React, { useState } from 'react'

const ListBookings = () => {
    const [ListBookings, setListBookings] = useState("bokking");
    return (
        <div>ListBookings{ListBookings}</div>


    )
}

export default ListBookings