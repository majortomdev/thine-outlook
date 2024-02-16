import React from "react";
import { NavLink } from 'react-router-dom';
//navlink shows links in diff color for active link etc...
import './NavLinks.css';

const NavLinks = props => {
    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact>ALL USERS</NavLink>
        </li>
        <li>
            <NavLink to="/user1/reviews">MY REVIEWS</NavLink>
        </li>
        <li>
            <NavLink to="/reviews/new">ADD REViiIEW</NavLink>
        </li>
        <li>
            <NavLink to="/auth">LOG IN/SIGN UP</NavLink>
        </li>
    </ul>
};

export default NavLinks;
