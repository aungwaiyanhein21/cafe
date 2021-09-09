import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

const ContainerComponent = (props) => {
    
    return (
        <ul className={props.obj.ulClassName} ref={props.obj.ref}>
            <li>
                <div className="edit-container">
                    <div className={ props.obj.className } onClick={props.obj.onClick}>
                        {props.obj.name}
                    </div>
                    <div className="action-container">
                        {props.obj.showCreateBtn ? <FontAwesomeIcon icon={faPlus} title="create subcategory under this category" onClick={props.obj.addModal}/> : ''}
                        {/* <FontAwesomeIcon icon={faPlus} /> */}
                        <FontAwesomeIcon icon={faEdit} title="Edit this category" onClick={props.obj.editModal}/>
                        <FontAwesomeIcon icon={faTrash} title="Delete this category" onClick={props.obj.deleteConfirmationModal}/>
                    </div>
                    
                </div>
                { props.obj.children }
            </li>
       
        </ul>
    );
};

export default ContainerComponent;