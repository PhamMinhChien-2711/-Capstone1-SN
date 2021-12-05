import React, { useState, useEffect } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Button } from 'reactstrap';
import './style.scss';

function ScrollToTop() {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        if (window.pageYOffset > 100) {
            setVisible(true)
        }
        else { setVisible(false) }

    };
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);

    }, []);
    return (
        <div className='scroll'>
            {visible && <Button onClick={handleClick}>
                <ArrowUpwardIcon />
            </Button>}
        </div>
    );
}

export default ScrollToTop;