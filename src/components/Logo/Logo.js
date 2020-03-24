import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';

const Logo = () => {
    return (
        <div className='ma4  mt0'>
            <Tilt className="Tilt shadow-1" options={{ max: 25 }} style={{ height: 80, width: 80 }} >
                <div className="Tilt-inner">
                    <img src={brain} alt="logo" />
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;