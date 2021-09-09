
import React, { useState, useEffect } from 'react';

import Modal from '../../modals/components/Modal';
import ModalBody from '../../modals/components/ModalBody';
import ModalHeader from '../../modals/components/ModalHeader';
import ModalFooter from '../../modals/components/ModalFooter';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';

const MainCategoryModal = (props) => {
    const[mainCategoryName, setMainCategoryName] = useState('');

    const handleSave = () => {
        if (!props.isEdit) {
            // create a new main category
            axios.post(`${process.env.REACT_APP_SERVER_URL}/main-category`, {
                mainCategoryName: mainCategoryName,
                categories: []
            })
            .then(data => {
                console.log('saved');
            
                // clear the input field
                setMainCategoryName('');
        
                // update the data shown to admin
                props.fetchData();
        
                // close this modal
                props.close();
            })
            .catch(err => {
                console.log(err);
            }) 
        }
        else {
            // update
            axios.patch(`${process.env.REACT_APP_SERVER_URL}/main-category/${props.mainCategoryId}`, {
                mainCategoryName: mainCategoryName
            })
            .then(res => {
                console.log('updated');
            
                // clear the input field
                setMainCategoryName('');
        
                // update the data shown to admin
                props.fetchData();
        
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
            const url = `${process.env.REACT_APP_SERVER_URL}/main-category/${props.mainCategoryId}`;
            axios.get(url)
            .then(response => {
                // populate the inputs with the data from database
                setMainCategoryName(response.data.mainCategoryName);
            })
            .catch(err => {
                console.log(err);
            })

        }
    }, []);


    return (
        <Modal>
            <ModalHeader>
                <div>
                    <h3>{props.isEdit ? `Update '${props.name}'`: 'Create Main Category'}</h3>
                </div>
                <div onClick={ props.close }>
                    <span className="cross-btn"><FontAwesomeIcon icon={faTimes} /></span>
                </div>

            </ModalHeader>
            <ModalBody>
                <label>Main Category Name: </label>
                <input 
                    type="text" 
                    placeholder="eg. Merchandise" 
                    value={mainCategoryName}
                    onChange={(e) => setMainCategoryName(e.target.value)}
                />
            </ModalBody>
            <ModalFooter>
                <button className="menu-btn" onClick={handleSave}>{props.isEdit ? 'Update' : 'Create'}</button>
            </ModalFooter>
        </Modal>
    );
};

export default MainCategoryModal;