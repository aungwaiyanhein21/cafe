import React from 'react';

import ContainerComponent from './ContainerComponent';


import ModalService from '../../modals/services/ModalService';
import SubCategoryModal from '../menu_modals/SubCategoryModal';
import ProductModal from '../menu_modals/ProductModal';
import DeleteConfirmationModal from '../menu_modals/DeleteConfirmationModal';

const SubCategory = (props) => {

    const addModal = () => {
        ModalService.open(ProductModal, {
            mainCategoryId: props.obj.mainCategoryId, 
            categoryId: props.obj.categoryId, 
            subCategoryId: props.obj.id,
            name: props.obj.name, 
            updateRefs: props.obj.updateRefs,
            isEdit: false
        });
    };

    const editModal = () => {
        ModalService.open(SubCategoryModal, {
            mainCategoryId: props.obj.mainCategoryId, 
            categoryId: props.obj.categoryId, 
            subCategoryId: props.obj.id, 
            name: props.obj.name, 
            isEdit: true
        });
    };

    const deleteConfirmationModal = () => {
        ModalService.open(DeleteConfirmationModal, {
            mainCategoryId: props.obj.mainCategoryId, 
            categoryId: props.obj.categoryId, 
            subCategoryId: props.obj.id,
            name: props.obj.name 
        });
    };
    return (
        <ContainerComponent 
            obj={{
                name: props.obj.name,
                id: props.obj.id,
                className: props.obj.className,
                ulClassName: props.obj.ulClassName,
                ref: props.obj.ref,
                onClick: props.obj.onClick,
                
                showCreateBtn: true,
                children: props.children,
                addModal: addModal,
                editModal: editModal,
                deleteConfirmationModal: deleteConfirmationModal
            }}
        />
        
    );
};

export default SubCategory;

