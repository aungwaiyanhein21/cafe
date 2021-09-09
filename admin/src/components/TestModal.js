import Modal from '../modals/components/Modal';
import ModalBody from '../modals/components/ModalBody';
import ModalHeader from '../modals/components/ModalHeader';
import ModalFooter from '../modals/components/ModalFooter';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const TestModal = (props) => {


    return (
        <Modal>
            <ModalHeader>
                <div>
                    <h3>Test Modal #1</h3>
                </div>
                <div onClick={ props.close }>
                    <span className="cross-btn"><FontAwesomeIcon icon={faTimes} /></span>
                </div>

            </ModalHeader>
            <ModalBody>
                <p>Body of modal #1 Body of modal #1 Body of modal #1 Body of modal #1 Body of modal #1 Body of modal #1 Body of modal #1 Body of modal #1 Body of modal #1 Body of modal #1 Body of modal #1 Body of modal #1 Body of modal #1 Body of modal #1 Body of modal #1 Body of modal #1</p>
            </ModalBody>
            <ModalFooter>
                <button onClick={ props.close }>Close Modal</button>
            </ModalFooter>
        </Modal>
    );
};

export default TestModal;