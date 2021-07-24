import React, { useState, useEffect } from 'react';
import '../../css/Menu.css';

import MainCategory from './MainCategory';
import axios from 'axios';


// Menu consists of main categories such as drinks, food...
const Menu = () => {
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL + "/main-category"}`)
        .then(result => {
            // console.log(result.data);
            setMenuData(result.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

   
    return (
        <div className="menupage-container">
            <div className="menu-container">
                <div>
                    <h1>Menu</h1>
                </div>
                
                {
                    menuData && menuData.map(mainCategory => <MainCategory key={mainCategory._id} mainCategoryData={mainCategory}/>)
                }      
                
                {/* <MainCategory />
                <MainCategory /> */}
               
            </div>
            
        </div>
    );
};

export default Menu;