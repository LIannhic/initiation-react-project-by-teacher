

export default function DeleteButton({setUsers}){
    function deleteUser(){
        setUsers([]);
    }

    return(
        <button onClick={deleteUser}>Delete</button>
    )
}