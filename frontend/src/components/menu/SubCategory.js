import React from 'react';

import { Link } from 'react-router-dom';

// Eg.  Sub Category -> Americanos
const SubCategory = ({ subCategoryData, additionalData, crumbs }) => {
    let searchStr = "";

    for (let indx=0; indx < crumbs.length; indx++) {
        searchStr += crumbs[indx].name + "/";
    }

    const addDefault = (ev) => {
        ev.target.src = `${process.env.REACT_APP_SERVER_URL}/resources/default/default.jpg`;
    };

    return(
        <section>
            <h2 className="main-category-title">{subCategoryData.subCategoryName}</h2>
            <hr className="hr"/>

            <div className="category">
                {
                    subCategoryData.products && subCategoryData.products.map(product => (
                        <div key={product._id}>
                            <Link
                                to={{
                                        pathname: `/menu/${additionalData.mainCategoryId}/${additionalData.categoryId}/${subCategoryData._id}/${product._id}`,
                                        search: `?parent=${encodeURIComponent(searchStr)}${encodeURIComponent(product.productName)}`,
                                        state: { product }
                                    }}
                            >
                                <div className="image-container">
                                    <img 
                                            src={`${process.env.REACT_APP_SERVER_URL}/resources/${product.imagePath}`}
                                            alt={`${product.productName}`} 
                                            title={`${product.productName}`} 
                                            onError={addDefault}
                                        />
                                </div>
                                
                                <p>{product.productName}</p>
                            </Link>
                        </div>
                    ))
                }
                
                
            </div>
        </section>
    );  
};

export default SubCategory;