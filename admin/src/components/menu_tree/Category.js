import React from 'react';

import ContainerComponent from './ContainerComponent';


import ModalService from '../../modals/services/ModalService';
import CategoryModal from '../menu_modals/CategoryModal';
import SubCategoryModal from '../menu_modals/SubCategoryModal';
import DeleteConfirmationModal from '../menu_modals/DeleteConfirmationModal';

const Category = (props) => {

    const addModal = () => {
        ModalService.open(SubCategoryModal, {
            mainCategoryId: props.obj.mainCategoryId, 
            categoryId: props.obj.id, 
            name: props.obj.name, 
            updateRefs: props.obj.updateRefs,
            isEdit: false
        });
    };

    const editModal = () => {
        ModalService.open(CategoryModal, {
            mainCategoryId: props.obj.mainCategoryId, 
            categoryId: props.obj.id,
            name: props.obj.name, 
            isEdit: true
        });
    };
   
    const deleteConfirmationModal = () => {
        ModalService.open(DeleteConfirmationModal, {mainCategoryId: props.obj.mainCategoryId, categoryId: props.obj.id, name: props.obj.name });
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

export default Category;
