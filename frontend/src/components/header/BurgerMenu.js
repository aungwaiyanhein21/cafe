import React, { useState } from 'react';
import '../../css/App.css';
import Nav from './Nav';


const BurgerMenu = () => {
    const [open, setOpen] = useState(null);

    const burgerClickHandler = () => {
        setOpen(!open);
    };

    return (
        <>
            <div className={`burger-container ${open ? "open": "close"}`} onClick={burgerClickHandler}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <Nav open={open} setOpen={setOpen} />
        </>
    );
}

export default BurgerMenu;


