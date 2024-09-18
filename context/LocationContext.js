// LocationContext.js
import React, { createContext, useState } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [locationDetails, setLocationDetails] = useState(null);

  const storeLocationDetails = (details) => {
    setLocationDetails(details);
  };

  return (
    <LocationContext.Provider value={{ locationDetails, storeLocationDetails }}>
      {children}
    </LocationContext.Provider>
  );
};
