import { faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const FormMessage = ({ hasError, message }) => {
    return (
        <div className={`form-message-container ${hasError ? 'error': 'success'}`}>
            <div>
                { hasError ? 
                    <FontAwesomeIcon icon={faExclamation} size="lg"/>
                    :
                    <FontAwesomeIcon icon={faCheck} size="lg"/>
                }
                
            </div>
            <div>
                {/* <p>This is an error message</p> */}
                {/* <p>This is a success message</p> */}

                <p>{message}</p>
            </div>
           
            
        </div>
    );
};

export default FormMessage;