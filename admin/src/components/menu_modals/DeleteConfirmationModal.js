
import React, { useState } from 'react';

import Modal from '../../modals/components/Modal';
import ModalBody from '../../modals/components/ModalBody';
import ModalHeader from '../../modals/components/ModalHeader';
import ModalFooter from '../../modals/components/ModalFooter';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';

const DeleteConfirmationModal = (props) => {
    
    const handleDelete = () => {
        let url = "";

        if ('mainCategoryId' in props && 'categoryId' in props && 'subCategoryId' in props && 'productId' in props) {
            // that means it's deleting the product
            url = `${process.env.REACT_APP_SERVER_URL}/main-category/${props.mainCategoryId}/categories/${props.categoryId}/sub-categories/${props.subCategoryId}/products/${props.productId}`;
        }
        else if ('mainCategoryId' in props && 'categoryId' in props && 'subCategoryId' in props) {
            // this means it's deleting the subCategory

            url = `${process.env.REACT_APP_SERVER_URL}/main-category/${props.mainCategoryId}/categories/${props.categoryId}/sub-categories/${props.subCategoryId}`;
        }
        else if ('mainCategoryId' in props && 'categoryId' in props) {
            // this means it's deleting the category
            url = `${process.env.REACT_APP_SERVER_URL}/main-category/${props.mainCategoryId}/categories/${props.categoryId}`;
        }
        else if ('mainCategoryId' in props) {
            // this means it's deleting the main category
            url = `${process.env.REACT_APP_SERVER_URL}/main-category/${props.mainCategoryId}`;
        }

        axios.delete(url)
        .then(data => {
            console.log('deleted');
        
            // temporary measure
            window.location.href = window.location.href;
    
            // close this modal
            props.close();
        })
        .catch(err => {
            console.log('error');
        })  
    };


    return (
        <Modal>
            <ModalHeader>
                <div>
                    <h3>Delete Confirmation</h3>
                </div>
                <div onClick={ props.close }>
                    <span className="cross-btn"><FontAwesomeIcon icon={faTimes} /></span>
                </div>

            </ModalHeader>
            <ModalBody>
                <p> Are you sure you want to delete "{props.name}" </p>
            </ModalBody>
            <ModalFooter>
                <button className="menu-btn" onClick={handleDelete}>Delete</button>
            </ModalFooter>
        </Modal>
    );
};

export default DeleteConfirmationModal;