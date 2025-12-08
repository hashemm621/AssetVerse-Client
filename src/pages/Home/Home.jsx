import React from 'react';
import Banner from './Banner/Banner';
import HomeFeatures from './Features/HomeFeatures';
import HomeAbout from './HomeAbout/HomeAbout';

const Home = () => {
    return (
        <div>
            <Banner/>
            <HomeFeatures/>
            <HomeAbout/>
        </div>
    );
};

export default Home;