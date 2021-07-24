import React, { useEffect, useState} from 'react';

import { useLocation, useParams } from 'react-router-dom';

// import '../../css/Menu.css';
import axios from 'axios';

import SubCategory from './SubCategory';
import BreadCrumbs from './BreadCrumbs';

// Eg. of category -> Hot coffees, cold drinks ...
const Category = ({crumbs}) => {
    const [categoryData, setCategoryData] = useState([]);
    // const [breadcrumbData, setBreadCrumbData] = useState([]);

    const location = useLocation();
    let { mainCategoryId, categoryId } = useParams();


    useEffect(() => {
       
        if (location.state === undefined) {
            // get the data using the id
            
            axios.get(`${process.env.REACT_APP_SERVER_URL + `/main-category/${mainCategoryId}/categories/${categoryId}`}`)
            .then(result => {
                // console.log(result.data);
                setCategoryData(result.data);

            })
            .catch(err => {
                console.log(err);
            });
        
        }
        else {
            // already have the data from previous page so save it.
            setCategoryData(location.state.category);
        }
        
        // console.log(location);

    }, []);

    return (
        <div className="menupage-container">
            <div className="menu-container">
                
                <div>
                    <BreadCrumbs crumbs={crumbs}/>
                    <h1>{categoryData.categoryName}</h1>
                </div>

                {
                    categoryData.subCategories && 
                    categoryData.subCategories.map(subCategory => <SubCategory key={subCategory._id} subCategoryData={subCategory} additionalData={{mainCategoryId, categoryId}} crumbs={crumbs}/>)
                }      
                
            </div>
        </div>
    );
};

export default Category;