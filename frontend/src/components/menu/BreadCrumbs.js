import React from 'react';
import '../../css/App.css';

import { Link } from 'react-router-dom';

const BreadCrumbs = ( { crumbs } ) => {
    // Don't render a single breadcrumb.
    if (crumbs.length <= 1) {
        return null;
    }

    // console.log(crumbs);
    return (
        <ul className="breadcrumbs">
            {
                crumbs && crumbs.map(({name, path},indx) => {
                    return (
                        <li key={indx} className="breadcrumbs-item">
                            {  
                                // if it is the last element in the breadcrumbs, we add another class and do not include link
                                indx === crumbs.length - 1 ? 
                                (
                                    <span className="breadcrumbs-link active"> {name}</span>
                                )
                                :
                                (   
                                    <Link to={path} className="breadcrumbs-link">
                                        {name}
                                    </Link>
                                )
                            }

                        </li>
                    )
                   
                })
            }
            
            
        </ul>
    );
};

export default BreadCrumbs;
