import React from 'react'
import GuestRoutes from '../../Routes/GuestRoutes'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import TheaterReg from '../pages/TheaterReg/TheaterReg'
import Registration from '../pages/Registration/Registration'
import Styles from './GuestLayout.module.css'
import HeroBanner from '../../User/components/Banner/Banner'
const GuestLayout = () => {
    return (
        <>
            <div><Navbar /></div>

            <div className={Styles.container}><GuestRoutes /></div>
            < div > <Footer /></div>
        </>
    )
}

export default GuestLayout