import React from 'react';
import { Link } from 'react-router-dom';


const MainCategory = ({ mainCategoryData }) => {
    
    const addDefault = (ev) => {
        ev.target.src = `${process.env.REACT_APP_SERVER_URL}/resources/default/default.jpg`;
    };
    
    return (
        <section>
            <h2 className="main-category-title">{mainCategoryData.mainCategoryName}</h2>
            <hr className="hr"/>
            <div className="category">
                {
                    mainCategoryData.categories && mainCategoryData.categories.map(category => (
                            <div key={category._id}>
                                <Link
                                    to={{
                                            pathname: `/menu/${mainCategoryData._id}/${category._id}`,
                                            search: `?parent=Menu${encodeURIComponent('/')}${category.categoryName}`,
                                            state: { category }
                                        }}
                                >
                                    <div className="image-container">
                                        <img 
                                            src={`${process.env.REACT_APP_SERVER_URL}/resources/${category.imagePath}`} 
                                            alt={`${category.categoryName}`} 
                                            title={`${category.categoryName}`} 
                                            onError={addDefault}
                                        />
                                    </div>
                                    
                                    <p>{category.categoryName}</p>
                                </Link>
                            </div>
                       
                       
                    ))
                }
            </div>
        </section>
    );
};


export default MainCategory;