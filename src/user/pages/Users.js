import React from "react";

import myPic from '../images/IMG_20210921_214347.jpg';
import UsersList from "../components/UsersList";

const Users = () => {

    const USERS = [
        {id:'U1', name:'Gregor Grumble', 
    image: myPic,
    reviews: 5}
];

    return <UsersList items={USERS}/>;
}

export default Users;