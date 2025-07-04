import { useContext } from 'react';
import { UserContext } from './UserContext';

export default function UsersName(){

    const user = useContext(UserContext);
    console.log("Current user:", user);

    return (
        <p>{user.name}</p>
    );

}