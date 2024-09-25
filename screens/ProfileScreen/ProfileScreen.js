import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../utils/Colors';
import {UserContext} from '../../context/UserContext';
import BottomSpacer from '../../components/BottomSpacer';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const {user, logoutUser} = useContext(UserContext);
  const [name, setName] = useState('Guest');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleLogout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Logout cancelled'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            logoutUser();
            navigation.navigate('Auth');
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleOpenPlayStore = () => {
    const url =
      'https://play.google.com/store/apps/details?id=com.example.earnybycooking';
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image
            source={require('../../assets/images/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Profile</Text>
      </View>

      <>
        {user && user?.token && (
          <>
            <View style={styles.profileContainer}>
              <View style={styles.profileHeader}>
                <Image
                  source={require('../../assets/836.png')}
                  style={styles.profileImage}
                />
              </View>
              <View style={styles.userText}>
                <Text style={styles.userName}>{name ? name : 'Guest'}</Text>

                <Text style={styles.userEmail}>{email}</Text>
                <TouchableOpacity
                  style={styles.editProfileButton}
                  onPress={() => navigation.navigate('EditProfile')}>
                  <Text style={styles.editProfileText}>Edit profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
        <View style={styles.menuListContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Settings')}>
            <View style={styles.menuContent}>
              <Image
                source={require('../../assets/images/settings.png')}
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>Settings</Text>
            </View>
            <Image
              source={require('../../assets/images/forward.png')}
              style={styles.forwardIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('About')}>
            <View style={styles.menuContent}>
              <Image
                source={require('../../assets/images/about.png')}
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>About</Text>
            </View>
            <Image
              source={require('../../assets/images/forward.png')}
              style={styles.forwardIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Terms')}>
            <View style={styles.menuContent}>
              <Image
                source={require('../../assets/images/privacy_policy.png')}
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>Terms and Conditions</Text>
            </View>
            <Image
              source={require('../../assets/images/forward.png')}
              style={styles.forwardIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Privacy')}>
            <View style={styles.menuContent}>
              <Image
                source={require('../../assets/images/policy.png')}
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>Privacy Policy</Text>
            </View>
            <Image
              source={require('../../assets/images/forward.png')}
              style={styles.forwardIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Help')}>
            <View style={styles.menuContent}>
              <Image
                source={require('../../assets/images/help.png')}
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>Help</Text>
            </View>
            <Image
              source={require('../../assets/images/forward.png')}
              style={styles.forwardIcon}
            />
          </TouchableOpacity>

          {/* onPress={() => navigation.navigate('ReportSafetyIssue')} */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuContent}>
              <Image
                source={require('../../assets/images/report.png')}
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>Report a Safety Issue</Text>
            </View>
            <Image
              source={require('../../assets/images/forward.png')}
              style={styles.forwardIcon}
            />
          </TouchableOpacity>

          {/* onPress={handleOpenPlayStore} */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuContent}>
              <Image
                source={require('../../assets/images/earning.png')}
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>Earn by Cooking</Text>
            </View>
            <Image
              source={require('../../assets/images/forward.png')}
              style={styles.forwardIcon}
            />
          </TouchableOpacity>

          {user && user?.token ? (
            <>
              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <View style={styles.menuContent}>
                  <Image
                    source={require('../../assets/icons/logout.png')}
                    style={styles.menuIcon}
                  />
                  <Text style={styles.logoutText}>Logout</Text>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('Auth')}>
                <View style={styles.menuContent}>
                  {/* <Image
                    source={require('../../assets/icons/logout.png')}
                    style={styles.menuIcon}
                  /> */}
                  <Text style={styles.logoutText}>Login / Register</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
          <BottomSpacer marginBottom={100} />
        </View>
      </>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.WHITE,
    fontFamily: 'Montserrat-Regular',
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.BLACK,
    marginLeft: 10,
    fontFamily: 'Montserrat-Regular',
  },
  profileContainer: {
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: 'row',
    gap: 20,
  },
  profileHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userText: {
    flex: 1,
    justifyContent: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  userName: {
    fontSize: 24,
    color: Colors.BLACK,
    marginVertical: 2,
    fontFamily: 'Montserrat-Bold',
  },
  userEmail: {
    fontSize: 16,
    color: Colors.BLACK,
    marginBottom: 20,
    fontFamily: 'Montserrat-Regular',
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    padding: 5,
    alignSelf: 'flex-start', // Makes the width inline with the content
    borderRadius: 4, // Optional: for rounded corners
  },

  editProfileText: {
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: 'Montserrat-Regular',
  },
  menuListContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: Colors.BLACK,
    fontFamily: 'Montserrat-Regular',
  },
  logoutText: {
    fontSize: 16,
    color: Colors.RED,
    fontFamily: 'Montserrat-Regular',
  },
  forwardIcon: {
    width: 20,
    height: 20,
  },
  logOutButton: {
    backgroundColor: Colors.PRIMARY,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  logOutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Montserrat-Regular',
  },
});
