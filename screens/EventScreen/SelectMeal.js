import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';

const SelectMeal = ({
  selectedMeal,
  setSelectedMeal,
  breakFastTime,
  setBreakFastTime,
  lunchTime,
  setLunchTime,
  dinnerTime,
  setDinnerTime,
}) => {
  const handleLunchTime = time => {
    setLunchTime(time); // Update selected time
  };

  const handleDinnerTime = time => {
    setDinnerTime(time);
  };

  const handleBreakFastTime = time => {
    setBreakFastTime(time);
  };

  return (
    <>
      <View style={styles.mealButtonContainer}>
        {/* Breakfast Button */}
        <TouchableOpacity
          style={[
            styles.breakfastButton,
            selectedMeal === 'breakfast' && styles.activeMealButton,
          ]}
          onPress={() => setSelectedMeal('breakfast')}>
          <Text
            style={[
              styles.mealText,
              selectedMeal === 'breakfast' && styles.activeMealText,
            ]}>
            Breakfast
          </Text>
        </TouchableOpacity>

        {/* Lunch Button */}
        <TouchableOpacity
          style={[
            styles.lunchButton,
            selectedMeal === 'lunch' && styles.activeMealButton,
          ]}
          onPress={() => setSelectedMeal('lunch')}>
          <Text
            style={[
              styles.mealText,
              selectedMeal === 'lunch' && styles.activeMealText,
            ]}>
            Lunch
          </Text>
        </TouchableOpacity>

        {/* Dinner Button */}
        <TouchableOpacity
          style={[
            styles.dinnerButton,
            selectedMeal === 'dinner' && styles.activeMealButton,
          ]}
          onPress={() => setSelectedMeal('dinner')}>
          <Text
            style={[
              styles.mealText,
              selectedMeal === 'dinner' && styles.activeMealText,
            ]}>
            Dinner
          </Text>
        </TouchableOpacity>
      </View>

      {/* Render based on selected tab */}
      {selectedMeal === 'lunch' && (
        <View style={styles.lunchSection}>
          {/* <Text style={styles.lunchHeading}>Lunch</Text>
          <Text style={styles.lunchTime}>12:00 PM to 04:00 PM</Text> */}

          <View style={styles.timeSlotsContainer}>
            {['12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'].map(
              (time, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.timeSlot,
                    lunchTime === time && styles.timeSlotActive,
                  ]}
                  onPress={() => handleLunchTime(time)}>
                  <Text
                    style={[
                      styles.timeText,
                      lunchTime === time && styles.timeTextActive,
                    ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </View>
        </View>
      )}

      {selectedMeal === 'dinner' && (
        <View style={styles.dinnerSection}>
          {/* <Text style={styles.dinnerHeading}>Dinner</Text>
          <Text style={styles.dinnerTime}>05:00 PM to 12:00 AM</Text> */}

          <View style={styles.timeSlotsContainer}>
            {[
              '05:00 PM',
              '06:00 PM',
              '07:00 PM',
              '08:00 PM',
              '09:00 PM',
              '10:00 PM',
              '11:00 PM',
              '12:00 AM',
            ].map((time, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeSlot,
                  dinnerTime === time && styles.timeSlotActive,
                ]}
                onPress={() => handleDinnerTime(time)}>
                <Text
                  style={[
                    styles.timeText,
                    dinnerTime === time && styles.timeTextActive,
                  ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {selectedMeal === 'breakfast' && (
        <View style={styles.breakFastSection}>
          {/* <Text style={styles.breakFastHeading}>Dinner</Text>
          <Text style={styles.breakFastTime}>05:00 PM to 12:00 AM</Text> */}

          <View style={styles.timeSlotsContainer}>
            {['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM'].map(
              (time, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.timeSlot,
                    breakFastTime === time && styles.timeSlotActive,
                  ]}
                  onPress={() => handleBreakFastTime(time)}>
                  <Text
                    style={[
                      styles.timeText,
                      breakFastTime === time && styles.timeTextActive,
                    ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default SelectMeal;

const styles = StyleSheet.create({
  mealButtonContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 2,
    marginTop: 10,
    // marginBottom: 20,
  },
  breakfastButton: {
    borderRadius: 24,
    width: 100,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
    backgroundColor: '#ffffff', // Default background
  },
  lunchButton: {
    borderRadius: 24,
    width: 100,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
    backgroundColor: '#ffffff', // Default background
  },
  dinnerButton: {
    borderRadius: 24,
    width: 100,
    paddingVertical: 4,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff', // Default background
  },
  mealText: {
    color: Colors.GRAY,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  activeMealButton: {
    borderWidth: 1,
    borderColor: '#503a73',
    backgroundColor: '#d9c8e3', // Active background color
  },
  activeMealText: {
    color: '#503a73', // Active text color
  },

  //  LUNCH SECTION
  lunchSection: {
    marginBottom: 20,
    border: '1px solid #d3d3d3',
    padding: 5,
    borderRadius: 8,
  },
  //   lunchHeading: {
  //     fontSize: 18,
  //     fontWeight: "bold",
  //   },
  //   lunchTime: {
  //     fontSize: 12,
  //     color: "gray",
  //     marginBottom: 10,
  //   },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 20,
  },
  timeSlot: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    padding: 8,
    marginBottom: 2, // Space between rows
    width: '32%', // Adjust width to fit 3 items per row with some space between
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10, // Optional: rounded corners
  },
  timeSlotActive: {
    borderWidth: 2,
    borderColor: '#503a73',
    backgroundColor: '#d9c8e3',
  },
  timeText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Montserrat-Bold',
  },
  timeTextActive: {
    color: '#503a73',
  },

  //   DINNER SECTION
  dinnerSection: {
    marginBottom: 20,
    border: '1px solid #d3d3d3',
    padding: 12,
    borderRadius: 8,
  },

  breakFastSection: {
    marginBottom: 20,
    border: '1px solid #d3d3d3',
    padding: 12,
    borderRadius: 8,
  },
});
