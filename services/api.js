// services/api.js
import axiosInstance from './axiosInstance';

// API method for logging in
export const login = async (email, phoneNumber, loginWithEmail) => {
  const payload = loginWithEmail
    ? {email, role: 'Customer'}
    : {phone: phoneNumber, role: 'Customer'};
  try {
    const response = await axiosInstance.post('/api/auth/auth', payload);
    return response;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// API method for sending OTP
export const sendOtp = async (email, phoneNumber, loginWithEmail) => {
  const payload = {
    email: loginWithEmail ? email : null,
    phone: !loginWithEmail ? phoneNumber : null,
  };
  try {
    const response = await axiosInstance.post('/api/send-otp', payload);
    return response;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

// Example API method for fetching user profile
export const fetchUserProfile = async userId => {
  try {
    const response = await axiosInstance.get(
      `/api/customers/profile-completion/${userId}`,
    );
    return response;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Example API method for updating user profile
export const updateUserProfile = async (userId, userData) => {
  try {
    const response = await axiosInstance.put(
      `/api/customers/${userId}`,
      userData,
    );
    return response;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Add Address
export const addAddress = async (
  userId,
  name,
  address,
  flatNo,
  areaLocality,
  nearbyLandmark,
  addressType,
  otherNameValue,
  latitude,
  longitude,
) => {
  try {
    const response = await axiosInstance.post('/api/address/add-address', {
      user_id: userId,
      name: name,
      address: address,
      flat: flatNo,
      area: areaLocality,
      landmark: nearbyLandmark,
      type: addressType,
      otherName: otherNameValue,
      latitude,
      longitude,
    });
    return response;
  } catch (error) {
    console.error('Error during adding address:', error);
    throw error;
  }
};

// API method for fetching all addresses
export const fetchAllAddresses = async userId => {
  try {
    const response = await axiosInstance.get(
      `/api/address/get-all-addresses/${userId}`,
    );
    return response;
  } catch (error) {
    console.error('Error during fetching addresses:', error);
    throw error;
  }
};

// API method for updating an address
export const updateAddress = async (addressId, updatedAddress) => {
  try {
    const response = await axiosInstance.put(
      `/api/address/update-address/${addressId}`,
      updatedAddress,
    );

    return response;
  } catch (error) {
    console.error('Error updating address:', error);
    throw error;
  }
};

// API method for deleting an address
export const deleteAddress = async addressId => {
  try {
    const response = await axiosInstance.delete(
      `/api/address/delete-address/${addressId}`,
    );
    return response;
  } catch (error) {
    console.error('Error deleting address:', error);
    throw error;
  }
};

// API method for setting primary address
export const setPrimaryAddress = async (userId, addressId) => {
  try {
    const response = await axiosInstance.post(
      '/api/address/set-active-address',
      {
        user_id: userId,
        address_id: addressId,
      },
    );
    return response;
  } catch (error) {
    console.error('Error setting primary address:', error);
    throw error;
  }
};

// API method for creating a booking
export const createBooking = async (
  customerId,
  eventType,
  cookType,
  bookingDuration,
  noOfPeople,
  noOfDishes,
  cuisineType,
  price,
  selectedDate,
  selectedTime,
  location,
  addressId
) => {
  const payload = {
    customer_id: customerId,
    event_type: eventType,
    cook_type: cookType,
    booking_duration: bookingDuration,
    no_of_people: noOfPeople,
    no_of_dishes: noOfDishes,
    cuisine_type: cuisineType,
    price: price,
    date: selectedDate,
    time: selectedTime,
    location,
    addressId
  };

  try {
    const response = await axiosInstance.post(
      '/api/booking/create-booking',
      payload,
    );
    return response.data; // Return only the data from the response
  } catch (error) {
    console.error('Error during booking creation:', error);
    throw error; // Rethrow to be caught in the caller function
  }
};

export const getBookingsByUserId = async customerId => {
  try {
    const response = await axiosInstance.get(
      `/api/booking/bookings/${customerId}`,
    );
    return response;
    // console.log(response)
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export const getBookingById = async (orderId) => {
  try {
    const response = await axiosInstance.get(`/api/booking/booking/${orderId}`);
    console.log(response.data)
    return response;
  } catch (error) {
    console.error('Error fetching booking:', error);
    throw error;
  }
};

export const getRecentBookingByUserId = async customerId => {
  console.log(customerId)
  try {
    const response = await axiosInstance.get(
      `/api/booking/recent/${customerId}`
    );
    return response;
  } catch (error) {
    console.error('Error fetching recent booking:', error);
    throw error;
  }
};

