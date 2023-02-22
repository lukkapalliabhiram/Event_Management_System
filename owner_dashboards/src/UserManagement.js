import React, { useState } from 'react';

function UserCard({ name, email, registrationDate }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Email: {email}</p>
      <p>Registration Date: {registrationDate}</p>
    </div>
  );
}

function UserList({ users }) {
  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </div>
  );
}

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  const handleNewUser = (user) => setUsers([...users, user]);

  return (
    <div>
      <UserList users={users} />
    </div>
  );
}
