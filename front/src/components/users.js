import React from 'react';

function Users(props) {
  return (
    <div>
      {props.users.map((user) => {
        return(
          <div ket={user.id}>
            <h3>{user.name}</h3>
            <h3>{user.surname}</h3>
            <h3>{user.email}</h3>
            <h3>{user.password}</h3>
            <h3>{user.number_phone}</h3>
          </div>
        );
      })}
    </div>
  )
}

export default Users
