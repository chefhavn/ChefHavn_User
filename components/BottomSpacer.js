import React from 'react';
import { View, StyleSheet } from 'react-native';

const BottomSpacer = ({ marginBottom }) => {
  return <View style={[styles.spacer, { marginBottom }]} />;
};

const styles = StyleSheet.create({
  spacer: {
    flex: 0, // Ensures the view takes up only the specified margin space
  },
});

export default BottomSpacer;
