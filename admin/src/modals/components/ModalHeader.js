import React from 'react';

const ModalHeader = (props) => {
    return (
        <div className="modal-header">
            { props.children }
        </div>
    );
};

export default ModalHeader;