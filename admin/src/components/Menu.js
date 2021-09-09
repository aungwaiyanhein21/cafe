import React, { useState, useRef, useEffect, createRef } from 'react';

import '../css/Menu.css';
import MainCategory from './menu_tree/MainCategory';
import Category from './menu_tree/Category';
import SubCategory from './menu_tree/SubCategory';
import Product from './menu_tree/Product';

import axios from 'axios';

import ModalRoot from '../modals/components/ModalRoot';
import ModalService from '../modals/services/ModalService';
import MainCategoryModal from './menu_modals/MainCategoryModal';


const Menu = () => {

    // opening a modal
    const addModal = () => {
        ModalService.open(MainCategoryModal, {isEdit: false});
    };

    const [menuData, setMenuData] = useState(null);
    const myRefs = useRef({});
    
    const updateRefs = () => {
        if (menuData) {
            console.log('updating refs');
            // assigning refs to all categories
            menuData.map(mainCategory => {
                myRefs.current[mainCategory._id] = myRefs.current[mainCategory._id] ?? createRef();
                return mainCategory.categories.map(category => {
                    myRefs.current[category._id] = myRefs.current[category._id] ?? createRef();
        
                    return category.subCategories.map(subCategory => {
                        myRefs.current[subCategory._id] =  myRefs.current[subCategory._id] ?? createRef();;
        
                        return subCategory.products.map(product => {
                            return myRefs.current[product._id] =  myRefs.current[product._id] ?? createRef();
                        });
                    });
        
                });
            });
        }
    };
    
   
    

    const fetchData = () => {
        axios.get(`${process.env.REACT_APP_SERVER_URL + "/main-category"}`)
        .then(result => {
            console.log(result.data);
            console.log(myRefs);

            setMenuData(result.data);
        })
        .catch(err => {
            console.log(err);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    updateRefs();

    
    // handle click for nested tree
    const handleClick = (refName) => {
        console.log(refName.current.children[0].children);

        const ulChildren = refName.current.children[0].children;
        for (let i=1; i < ulChildren.length; i++) {
            refName.current.children[0].children[i].classList.toggle("active");
        }
        refName.current.children[0].children[0].children[0].classList.toggle('caret-down');
    };

    return (
        <>
            <ModalRoot fetchData={fetchData}/>

            <div className="menu-container">
            
                <h1>Menu</h1>
                
                <div>
                    <div>
                        <button className="menu-btn" onClick={addModal}>Create A Category</button>
                        {
                            menuData && menuData.map((mainCategory, indx) => (
                                <MainCategory 
                                    key={mainCategory._id} 
                                    obj={{
                                        name: mainCategory.mainCategoryName, 
                                        id: mainCategory._id, 
                                        className: mainCategory.categories.length > 0 ? "caret" : "",
                                        ulClassName: "tree-container",
                                        ref: myRefs.current[mainCategory._id], 
                                        onClick: () => handleClick(myRefs.current[mainCategory._id]),
                                        updateRefs: updateRefs 
                                    }} 
                                >
                                    {
                                        mainCategory.categories && 
                                        mainCategory.categories.map(category => (
                                            <Category 
                                                key={category._id} 
                                                obj={{
                                                    name: category.categoryName, 
                                                    mainCategoryId: mainCategory._id,
                                                    id: category._id, 
                                                    className: category.subCategories.length > 0 ? "caret" : "", 
                                                    ulClassName: "nested",
                                                    ref: myRefs.current[category._id], 
                                                    onClick: () => handleClick(myRefs.current[category._id]) 
                                                }}
                                            >
                                                {
                                                    category.subCategories &&
                                                    category.subCategories.map(subCategory => (
                                                        <SubCategory 
                                                            key={subCategory._id} 
                                                            obj={{
                                                                name: subCategory.subCategoryName, 
                                                                mainCategoryId: mainCategory._id,
                                                                categoryId: category._id,
                                                                id: subCategory._id, 
                                                                className: subCategory.products.length > 0 ? "caret" : "", 
                                                                ulClassName: "nested",
                                                                ref: myRefs.current[subCategory._id], 
                                                                onClick: () => handleClick(myRefs.current[subCategory._id]) 
                                                            }}
                                                        >
                                                            {
                                                                subCategory.products &&
                                                                subCategory.products.map(product => (
                                                                    <Product 
                                                                        key={product._id} 
                                                                        obj={{
                                                                            name: product.productName,
                                                                            mainCategoryId: mainCategory._id,
                                                                            categoryId: category._id, 
                                                                            subCategoryId: subCategory._id,
                                                                            id: product._id,
                                                                            className: "",
                                                                            ulClassName: "nested",
                                                                            ref: myRefs.current[product._id],
                                                                            onClick: () => {}
                                                                        }}
                                                                    >
                                    
                                                                    </Product>
                                                                ))
                                                            }
                                                            
                                                        </SubCategory>
                                                    ))
                                                }
                                            
                                            </Category>
                                        ))
                                        
                                    }
                                    
                                </MainCategory>
                            ))
                        }
                    </div>
                </div>
            
                
            </div>
        </>
        
    );
};

export default Menu;


{/* <ul className="tree-container" ref={refsObj[`mainCategory`]} >
    <li>
        
        
        <Category refObj={refsObj[`category`]}>
            <li>
                <span className="caret" onClick={() => handleClick(refsObj[`category`])}>
                    Hot Coffees
                </span>
            
                <SubCategory refObj={refsObj[`subCategory`]} >
                    <li>
                        <span className="caret" onClick={() => handleClick(refsObj[`subCategory`])}>
                            Cappuccinos
                        </span>
                    
                        <Product refObj={refsObj[`product`]} >
                            <li>
                                Americano Cappuccinos
                            </li>
                        </Product>
                    </li>
                </SubCategory>
            </li>
        </Category>

    </li>
    
</ul> */}