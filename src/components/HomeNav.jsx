import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logos.svg";

const Navbar = () => {
    return (

        <nav className="sticky top-0  justify-between bg-gray-500 w-full py-4 z-10" >

            <Link to="/">
                <img src={logo} alt="Hayani Hotel" />
            </Link>

        </nav>
    );
};

export default Navbar;

