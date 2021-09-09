import React, { useState, useEffect } from 'react';
import ModalService from '../services/ModalService';

import '../../css/Modal.css';

const ModalRoot = ({ fetchData }) => {
    const [modal, setModal] = useState({});

    useEffect(() => {
        ModalService.on('open', ({ component, props }) => {
            setModal({
                component,
                props,
                close: value => {
                    setModal({});
                    document.querySelector('body').classList.toggle('no-scroll');
                }
            });
        });
    }, []);

    const ModalComponent = modal.component? modal.component : null;

    return (
        <div className={modal.component ? 'modal-root' : ''}>
            {
                ModalComponent && (
                    <ModalComponent 
                        { ...modal.props}
                        close={ modal.close }
                        // className={ ModalComponent ? 'd-block' : ''}
                        fetchData={fetchData}
                    />
                )
            }
        </div>
    );
};


export default ModalRoot;