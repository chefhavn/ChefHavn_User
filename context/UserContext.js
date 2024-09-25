import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginUser = async (userData) => {
    setUser(userData);
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  };

  const logoutUser = async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem('userData'); // Remove user data on logout
    } catch (error) {
      console.error('Failed to remove user data:', error);
    }
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
