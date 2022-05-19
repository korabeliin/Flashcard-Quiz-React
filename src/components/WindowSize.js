import React, {useEffect, useState} from 'react';

const WindowSize = () => {

    const [windowSize, setWindowSize] = useState(window.innerWidth);

    const handleResize = () => setWindowSize(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className='screen_size'>
            Your current screen width: {windowSize}px
        </div>
    );
};

export default WindowSize;