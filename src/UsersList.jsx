import User from './User.jsx'

export default function UsersList({users, setUsers}){
    return (
        <div>
          <h2>User List ({users.length})</h2>
          {users.length === 0 && <p>No users found</p>}
          <ul>
          {users.map((item, index) => (
            <li key={index}>
                <User 
                id={index} 
                user={item.name} 
                setUsers={setUsers} 
                users={users}
                phoneNumber={item.phoneNumber}
                country={item.country}
                />
            </li>
          ))}
          </ul>
        </div>
    )
}