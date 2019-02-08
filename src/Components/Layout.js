import React from 'react';
import Aux from '../hoc/Auxil';
import classes from './Layout.css'
import Navigation from './Navigation/Navigation';

const layout= (props) => (
    <Aux>
        {/*<Navigation/>*/}
        <main className={classes.Content}>
            {props.children}
         </main>
    </Aux>
);

export default layout;