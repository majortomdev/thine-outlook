import React, { useContext } from "react";
import { NavLink } from 'react-router-dom';
//navlink shows links in diff color for active link etc...

import { AuthContext } from "../../context/auth-context";
import './NavLinks.css';

const NavLinks = props => {
    const auth = useContext(AuthContext);

    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact>ALL USERS</NavLink>
        </li>
        {auth.isLoggedIn && (
        <li>
            <NavLink to="/user1/reviews">MY REVIEWS</NavLink>
        </li>
        )}
        {auth.isLoggedIn && (
        <li>
            <NavLink to="/reviews/new">ADD REV22EW</NavLink>
        </li>
        )}
        {auth.isLoggedIn && (
        <li>
            <button onClick={auth.logout}>Log22 out</button>
        </li>
        )}
        {!auth.isLoggedIn && (
        <li>
            <NavLink to="/auth">LOG IN/SIGN UP</NavLink>
        </li>
        )}
    </ul>
};

export default NavLinks;
