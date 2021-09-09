
import React, { useState, useEffect } from 'react';

import Modal from '../../modals/components/Modal';
import ModalBody from '../../modals/components/ModalBody';
import ModalHeader from '../../modals/components/ModalHeader';
import ModalFooter from '../../modals/components/ModalFooter';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';

const SubCategoryModal = (props) => {
    console.log(props);
    const[subCategoryName, setSubCategoryName] = useState('');

    const handleSave = () => {
        if (!props.isEdit) {
            // create
            const url = `${process.env.REACT_APP_SERVER_URL}/main-category/${props.mainCategoryId}/categories/${props.categoryId}/sub-categories`;
            axios.post(url, {
                subCategoryName: subCategoryName,
                products: [],
            })
            .then(data => {
                console.log('saved');
            
    
                // clear the input field after submitting
                setSubCategoryName('');
        
                // update the data shown to admin
                // props.fetchData();
                // props.updateRefs();
    
                // temporary measure
                window.location.href = window.location.href;
        
                // close this modal
                props.close();
            })
            .catch(err => {
                console.log('error');
            })  
        }
        else {
            // update
            const url = `${process.env.REACT_APP_SERVER_URL}/main-category/${props.mainCategoryId}/categories/${props.categoryId}/sub-categories/${props.subCategoryId}`;
            axios.patch(url, {
                subCategoryName: subCategoryName
            })
            .then(response => {
                console.log('updated');
            
                // clear the input field
                setSubCategoryName('');
        
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
            const url = `${process.env.REACT_APP_SERVER_URL}/main-category/${props.mainCategoryId}/categories/${props.categoryId}/sub-categories/${props.subCategoryId}`;
            axios.get(url)
            .then(response => {
                // populate the inputs with the data from database
                setSubCategoryName(response.data.subCategoryName);
            })
            .catch(err => {
                console.log(err);
            });

        }   
    }, []);

    return (
        <Modal>
            <ModalHeader>
                <div>
                    <h3>{props.isEdit ? `Update '${props.name}'`: `Create a Category under '${props.name}'`}</h3>
                </div>
                <div onClick={ props.close }>
                    <span className="cross-btn"><FontAwesomeIcon icon={faTimes} /></span>
                </div>

            </ModalHeader>
            <ModalBody>
                <label>Category Name: </label>
                <input 
                    type="text" 
                    placeholder="eg. Espresso Shots" 
                    value={subCategoryName}
                    onChange={(e) => setSubCategoryName(e.target.value)}
                />
            </ModalBody>
            <ModalFooter>
                <button className="menu-btn" onClick={handleSave}>{props.isEdit ? 'Update' : 'Create'}</button>
            </ModalFooter>
        </Modal>
    );
};

export default SubCategoryModal;