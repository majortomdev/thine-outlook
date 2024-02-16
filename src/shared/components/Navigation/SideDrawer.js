import React from "react";
import  ReactDOM  from "react-dom";
import { CSSTransition } from "react-transition-group";

import './SideDrawer.css';

const SideDrawer = props => {
    const content = (
        <CSSTransition in={props.show} 
        timeout={200} 
        classNames="slide-in-left" 
        mountOnEnter 
        unmountOnExit
        >
            <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
        </CSSTransition>
        );

    return ReactDOM.createPortal(content, document.getElementById('drawer-hook') );//i used a portal to render 
    //this component somewhere other than the 'root' div, in the drawer-hook div at index.html
};

export default SideDrawer;