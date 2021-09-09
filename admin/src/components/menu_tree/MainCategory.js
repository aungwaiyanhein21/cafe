import React from 'react';

import ContainerComponent from './ContainerComponent';


import ModalService from '../../modals/services/ModalService';
import MainCategoryModal from '../menu_modals/MainCategoryModal';
import CategoryModal from '../menu_modals/CategoryModal';
import DeleteConfirmationModal from '../menu_modals/DeleteConfirmationModal';

const MainCategory = (props) => {
    // modals
    
    const addModal = () => {
        ModalService.open(CategoryModal, {
            id: props.obj.id, 
            name: props.obj.name, 
            updateRefs: props.obj.updateRefs, 
            isEdit: false
        });
    };

    const editModal = () => {
        ModalService.open(MainCategoryModal, {mainCategoryId: props.obj.id, name: props.obj.name, isEdit: true});
    };

    const deleteConfirmationModal = () => {
        ModalService.open(DeleteConfirmationModal, {mainCategoryId: props.obj.id, name: props.obj.name });
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

export default MainCategory;
