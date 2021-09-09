import React from 'react';

const Modal = (props) => {
    return (
        <div className="modal-container">
            { props.children }
            {/* <div>
                <div>
                    
                </div>
            </div> */}
        </div>
    );
};

export default Modal;