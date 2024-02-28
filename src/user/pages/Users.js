import React, { useState, useEffect } from "react";
import UsersList from "../components/UsersList";

const Users = () => {
     const [users, updateUsers] = useState([]);
     const getUsers = () => {
        return users;
    }
     useEffect(() => {
         fetch('http://localhost:8080/users',{
            method: "GET",
            mode: "cors"
        })
        .then(res => res.json())
        .then(res => updateUsers(res._embedded.users))
        .catch((error) => {
            console.error(error);
        });

        }, []);  

     return <UsersList items={getUsers()}/>;
    }

export default Users;























// const url = 'https://localhost:8080/users';