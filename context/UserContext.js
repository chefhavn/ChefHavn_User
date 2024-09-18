import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    setUser(null);
  };

  // Function to update the user's information
  const updateUser = (updatedUserData) => {
    setUser((prevUser) => ({
      ...prevUser, // Preserve other user details
      ...updatedUserData, // Merge updated information (name, email, phone, etc.)
    }));
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
