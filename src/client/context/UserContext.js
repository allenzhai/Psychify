/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const UserContext = React.createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({});

  const login = (newUser) => {
    setUser(newUser);
  };

  const logout = () => {
    setUser({});
  };

  return (
    <UserContext.Provider value={
      {
        ...user,
        login,
        logout
      }
    }
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
