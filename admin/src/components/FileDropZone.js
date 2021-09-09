import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

import '../css/FileDropZone.css';

const FileDropZone = (props) => {
    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));

            // setting one file
           props.setSelectedFile(acceptedFiles[0]);
           props.setFileUrl(URL.createObjectURL(acceptedFiles[0]));
        },
        multiple: false 
    });
    
    // const thumbs = files.map(file => (
    //     <div key={file.name}>
    //         <div >
    //             <img
    //                 src={file.preview}
    //                 width={70}
    //             />
    //         </div>
    //     </div>
    // ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));

    }, [files]);

    return (
        <div className="file-container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>Drag and drop an image here, or click to select image</p>
            </div>
            <div className='preview-container'>
                <p>Preview: </p>
                <img src={props.fileUrl} width={70}/>
            </div>
        </div>
    );
};

export default FileDropZone;