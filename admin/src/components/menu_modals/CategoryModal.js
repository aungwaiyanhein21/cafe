
import React, { useState, useEffect } from 'react';

import Modal from '../../modals/components/Modal';
import ModalBody from '../../modals/components/ModalBody';
import ModalHeader from '../../modals/components/ModalHeader';
import ModalFooter from '../../modals/components/ModalFooter';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import FileDropZone from '../FileDropZone';

import axios from 'axios';

const CategoryModal = (props) => {
    const [categoryName, setCategoryName] = useState('');
    const [selectedFile, setSelectedFile] = useState([]);
    const [fileUrl, setFileUrl] = useState('');
    
    const handleSave = () => {
        const fd = new FormData();
        fd.append('image', selectedFile);
        fd.append('categoryName', categoryName);
        console.log(Array.from(fd));

        if (!props.isEdit) {
            // create

            const url = `${process.env.REACT_APP_SERVER_URL}/main-category/${props.id}/categories`;
            axios.post(url, fd, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }})
                .then(res => {
                    console.log(res);
                    
                    // clear the input field after submitting
                    setCategoryName('');
            
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

            const url = `${process.env.REACT_APP_SERVER_URL}/main-category/${props.mainCategoryId}/categories/${props.categoryId}`;
            axios.patch(url, fd, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }})
                .then(res => {
                    console.log('updated');
            
                    // clear the input field
                    setCategoryName('');
            
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
            const url = `${process.env.REACT_APP_SERVER_URL}/main-category/${props.mainCategoryId}/categories/${props.categoryId}`;
            axios.get(url)
            .then(response => {
                // populate the inputs with the data from database
                setCategoryName(response.data.categoryName);

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
                    placeholder="eg. Hot Drinks" 
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                
                <FileDropZone setSelectedFile={setSelectedFile} setFileUrl={setFileUrl} fileUrl={fileUrl}/>
            </ModalBody>
            <ModalFooter>
                <button className="menu-btn" onClick={handleSave}>{props.isEdit ? 'Update': 'Create'}</button>
            </ModalFooter>
        </Modal>
    );
};

export default CategoryModal;
