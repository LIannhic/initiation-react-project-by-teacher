import { useState, useEffect } from 'react'
import './App.css'
import UsersList from './UsersList.jsx'
import Count from './Count.jsx'
import Form from './Form.jsx'
import Header from './Header.jsx'
import DeleteButton from './DeleteButton.jsx'
import Clock from './Clock.jsx'
import Search from './Search.jsx'
import CountryList from './CountryList.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.phoneNumber.includes(search)
  );

  useEffect(() => {
    console.log('Load');
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, [])

  return (
    <>
      <Header />
      <Clock />
      <CountryList />
      <Count count={count} setCount={setCount} />
      <Form users={users} setUsers={setUsers}/>
      <Search search={search} setSearch={setSearch}/>
      <UsersList users={filteredUsers} setUsers={setUsers} />
      <DeleteButton setUsers={setUsers} />
    </>
  )
}

export default App
