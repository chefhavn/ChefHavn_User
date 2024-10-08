import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    Dimensions,
  } from "react-native";
  import React, { useEffect, useState, useRef } from "react";
  
  const { width } = Dimensions.get("window");
  
  export default function Slider() {
    const [sliderr, setSlider] = useState([
      require("../../assets/images/slider/slide-1.png"),
      require("../../assets/images/slider/slide-2.png"),
      require("../../assets/images/slider/slide-3.png"),
    ]);
    const [user, setUser] = useState(null);
  
    const flatListRef = useRef(null);
    let scrollValue = 0;
    let scrolled = 0;
  
    // useEffect(() => {
    //   const numberOfData = sliderr.length;
    //   const interval = setInterval(() => {
    //     scrolled++;
    //     if (scrolled < numberOfData) {
    //       scrollValue = scrollValue + width;
    //     } else {
    //       scrollValue = 0;
    //       scrolled = 0;
    //     }
    //     flatListRef.current.scrollToOffset({
    //       animated: true,
    //       offset: scrollValue,
    //     });
    //   }, 3000);
  
    //   return () => clearInterval(interval);
    // }, [sliderr]);
  
  
    return (
      <View>
        <Text style={styles.heading}>
          {user ? `Welcome,` : "Welcome, Guest"}
        </Text>
  
        <FlatList
          ref={flatListRef}
          data={sliderr}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View key={index} style={{ marginRight: 20 }}>
              <Image source={item} style={styles.sliderImage} />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    heading: {
      fontSize: 20,
      marginBottom: 10,
      fontWeight: "bold",
    },
    sliderImage: {
      width: width - 30,
      height: 200,
      borderRadius: 20,
      objectFit: "cover",
    },
  });
  