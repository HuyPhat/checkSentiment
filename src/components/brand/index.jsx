import React from 'react';
import images from 'themes/images';

const Brand = ({ brand }) => {
    return (
        <div className='logo-container'>
            <img src={images[brand]} alt="logo" />
        </div>
    )
}

export default Brand;