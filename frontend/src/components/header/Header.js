import React from 'react';
import { Link } from 'react-router-dom';

import BurgerMenu from './BurgerMenu';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons";



const Header = () => {
    return (
        <header>
            <Link to="/"><h1>Cafe Logo</h1></Link>
            
            <BurgerMenu />

        </header>
    );
};

export default Header;
