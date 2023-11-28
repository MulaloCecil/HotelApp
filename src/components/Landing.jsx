import React from "react";
import { Link } from "react-router-dom";
import Hero from "./Hero";
import Banner from "./Banner";
import Services from "./Services";
import HomeNav from './HomeNav';

export default function Home() {
    return (

        <React.Fragment>
            <HomeNav />
            <Hero>
                <Banner title="Hayani Hotel" subtitle="Please Login to Book your stay at your favorite hotel" >

                </Banner>

            </Hero>
            <Link to="/login" className="flex items-center justify-center w-full bg-teal-500 text-white p-3 rounded-md font-medium hover:bg-teal-600 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-teal-300">
                GET STARTED
            </Link>
            <Services />
        </React.Fragment>
    );
}
