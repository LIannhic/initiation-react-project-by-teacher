import React, { useState } from 'react';

function Form({users, setUsers}) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUsers = [...users, { name, phoneNumber }];
    setUsers(updatedUsers);
    setName("");
    setPhoneNumber("");
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  function handleName(e){
    const name = e.target.value;
    setName(name);
  }

  function handlePhoneNumber(e){
    const phoneNumber = e.target.value;
    setPhoneNumber(phoneNumber);
  }

  return (
      <form onSubmit={handleSubmit}>
        <label>Name : <br/></label>
        <input
          type="text"
          placeholder="Enter your name"
          required
          value={name}
          onChange={(e) => handleName(e)}
        />
        <br/>
        <label>
          Phone Number: <br/>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => handlePhoneNumber(e)}
            placeholder="Enter your phone number"
            required
          />
        </label>
        <br/>
        <button type="submit">Submit</button>
      </form>
  );
}

export default Form;