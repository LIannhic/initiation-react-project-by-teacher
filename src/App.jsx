import { useState, useEffect } from "react";
import "./App.css";
import Count from "./Count.jsx";
import Form from "./Form4.jsx";
import Header from "./Header.jsx";
import DeleteButton from "./DeleteButton.jsx";
import Clock from "./Clock.jsx";
import Search from "./Search.jsx";
import { UserProvider } from "./UserContext.jsx";
import UsersListContext from "./UsersListContext.jsx";

function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.phoneNumber.includes(search) ||
      user.country.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    console.log("Load");
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  return (
    <>
      <Header />
      <Clock />
      <Count count={count} setCount={setCount} />
      <Form users={users} setUsers={setUsers} />
      <Search search={search} setSearch={setSearch} />
      <UserProvider value={{ users, setUsers }}>
        <UsersListContext />
      </UserProvider>
      <DeleteButton setUsers={setUsers} />
    </>
  );
}

export default App;
