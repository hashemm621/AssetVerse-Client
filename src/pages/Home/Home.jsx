import React from 'react';
import Banner from './Banner/Banner';
import HomeFeatures from './Features/HomeFeatures';
import HomeAbout from './HomeAbout/HomeAbout';
import HomeTestimonial from './HomeTestimonial/HomeTestimonial';

const Home = () => {
    return (
        <div>
            <Banner/>
            <HomeFeatures/>
            <HomeAbout/>
            <HomeTestimonial/>
        </div>
    );
};

export default Home;