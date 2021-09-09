
import React, { useState, useEffect, useRef } from 'react';

import Modal from '../../modals/components/Modal';
import ModalBody from '../../modals/components/ModalBody';
import ModalHeader from '../../modals/components/ModalHeader';
import ModalFooter from '../../modals/components/ModalFooter';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import FileDropZone from '../FileDropZone';

import axios from 'axios';

const ProductModal = (props) => {
    const [productInfo, setProductInfo] = useState({
        productName: '',
        description: '',
        status: 'Available',
        priceOption: 'Drink',
        price: {
            smallCupPrice: 0,
            mediumCupPrice: 0,
            largeCupPrice: 0,
            otherPrice: 0
        }
    });
    
    const [selectedFile, setSelectedFile] = useState([]);
    const [fileUrl, setFileUrl] = useState('');

    const handleSave = () => {

        let fd = new FormData();
        fd.append('image', selectedFile);
        

        // go over the object and append to form data
        for (let key in productInfo) {
            if (key !== 'price') {
                fd.append(key, productInfo[key]);
            } 
            else {
                for (let key2 in productInfo['price']) {
                    fd.append(key2, productInfo['price'][key2]);
                }
            }
            
        }

        console.log(Array.from(fd));

        if (!props.isEdit) {
            // create

            // console.log(productInfo);
            // console.log(selectedFile);


            const url = `${process.env.REACT_APP_SERVER_URL}/main-category/${props.mainCategoryId}/categories/${props.categoryId}/sub-categories/${props.subCategoryId}/products`;
            axios.post(url, fd, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }})
                .then(res => {
                    console.log('saved');
            

                    // clear the input field after submitting
                    // setProductName('');
            
                    // update the data shown to admin
                    // props.fetchData();
                    // props.updateRefs();
    
                    // temporary measure
                    window.location.href = window.location.href;
            
                    // close this modal
                    props.close();
                })
                .catch(err => {
                    console.log(err);
                });

        }
        else {
            // update

            const url = `${process.env.REACT_APP_SERVER_URL}/main-category/${props.mainCategoryId}/categories/${props.categoryId}/sub-categories/${props.subCategoryId}/products/${props.productId}`;
            axios.patch(url, fd, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }})
                .then(res => {
                    console.log('updated');
            

                    // clear the input field after submitting
                    // setProductName('');
            
                    // temporary measure
                    window.location.href = window.location.href;
            
                    // close this modal
                    props.close();
                })
                .catch(err => {
                    console.log(err);
                });
        }
        
    };

    useEffect(() => {
        if (props.isEdit) {
            // if in editing mode, get the data from the database first
            const url = `${process.env.REACT_APP_SERVER_URL}/main-category/${props.mainCategoryId}/categories/${props.categoryId}/sub-categories/${props.subCategoryId}/products/${props.productId}`;
            axios.get(url)
            .then(response => {
                // populate the inputs with the data from database
                
                for (let key in productInfo) {
                    setProductInfo(prev => ({
                        ...prev,
                        [key]: response.data[key]
                    }));
                } 

                console.log(response.data);
                // setProductInfo(prev => ({
                //     ...prev,
                //     [key]: response.data.price[key]
                // }));

                console.log(productInfo);

                // set the image url so that user will see the image that has been uploaded before
                setFileUrl(`${process.env.REACT_APP_SERVER_URL}/resources/${response.data.imagePath}`);
            })
            .catch(err => {
                console.log(err);
            });

        }   
    }, []);

    // const handleImageUpload = (e) => {
    //     setSelectedFile(e.target.files[0]);
    //     setFileUrl(URL.createObjectURL(e.target.files[0]));
    // }

    const handleProductInfo = (e) => {
        setProductInfo(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleProductPrice = (e) => {
        setProductInfo(prev => ({
            ...prev,
            price: {...prev['price'], [e.target.name]: e.target.value}
        }));
    }

    return (
        <Modal>
            <ModalHeader>
                <div>
                    <h3>{props.isEdit ? `Update '${props.name}'`: `Create a Product Under '${props.name}'`}</h3>
                </div>
                <div onClick={ props.close }>
                    <span className="cross-btn"><FontAwesomeIcon icon={faTimes} /></span>
                </div>

            </ModalHeader>
            <ModalBody>
                <section>
                    <label>Product Name: </label>
                    <input 
                        type="text"
                        name="productName" 
                        placeholder="eg. Iced Chocolate" 
                        value={productInfo.productName}
                        onChange={handleProductInfo}
                    />
                </section>
                <section>
                    <label>Description: </label>
                    
                    <textarea 
                        aria-multiline
                        name="description" 
                        value={productInfo.description}
                        onChange={handleProductInfo}
                    />
                </section>
                <section>
                    <label>Status: </label>
                    
                    <select
                        name="status" 
                        value={productInfo.status}
                        onChange={handleProductInfo}
                    >
                        <option value="Available">Available</option>
                        <option value="Coming Soon">Coming Soon</option>
                        <option value="Out of Stock">Out of Stock</option>
                    </select>
                </section>
                <section>
                    <label>Choose Price Option:</label>
                    <select
                        name="priceOption" 
                        value={productInfo.priceOption}
                        onChange={handleProductInfo}
                    >
                        <option value="Drink">Drink</option>
                        <option value="Other">Other</option>
                    </select>
                </section>
                {
                    productInfo.priceOption === "Other" 
                    ?
                    (
                        <section>
                            <label>Price: </label>
                            <div className="price-container">
                                <input 
                                    type="number" 
                                    min={0} 
                                    step={0.5} 
                                    name="otherPrice"
                                    value={productInfo.price.otherPrice}
                                    onChange={handleProductPrice}
                                />
                                <span> MMK</span>
                            </div> 
                        </section>
                    )
                    :
                    (
                        <section>
                            <fieldset>
                                <legend>Price </legend>
        
                                <div>
                                    <label>Small Cup: </label>
                                    <div className="price-container">
                                        <input 
                                            type="number" 
                                            min={0} 
                                            step={0.5} 
                                            name="smallCupPrice" 
                                            value={productInfo.price.smallCupPrice}
                                            onChange={handleProductPrice}
                                        />
                                        <span> MMK</span>
                                    </div> 
                                </div>
                                <div>
                                    <label>Medium Cup: </label>
                                    <div className="price-container">
                                        <input 
                                            type="number" 
                                            min={0} 
                                            step={0.5} 
                                            name="mediumCupPrice" 
                                            value={productInfo.price.mediumCupPrice}
                                            onChange={handleProductPrice}
                                        />
                                        <span> MMK</span>
                                    </div> 
                                </div>
                                <div>
                                    <label>Large Cup: </label>
                                    <div className="price-container">
                                        <input 
                                            type="number" 
                                            min={0} 
                                            step={0.5} 
                                            name="largeCupPrice" 
                                            value={productInfo.price.largeCupPrice}
                                            onChange={handleProductPrice}
                                        />
                                        <span> MMK</span>
                                    </div> 
                                </div>
                            </fieldset>
                            
                        </section>
                    )
                }
                
               
                
            
                <FileDropZone setSelectedFile={setSelectedFile} setFileUrl={setFileUrl} fileUrl={fileUrl}/>
            </ModalBody>
            <ModalFooter>
                <button className="menu-btn" onClick={handleSave}>{props.isEdit ? 'Update' : 'Create'}</button>
            </ModalFooter>
        </Modal>
    );
};

export default ProductModal;