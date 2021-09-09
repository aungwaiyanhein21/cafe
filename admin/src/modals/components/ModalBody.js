import React from 'react';

const ModelBody = (props) => {
    return (
        <div className="modal-body">
            { props.children }
        </div>
    );
};

export default ModelBody;