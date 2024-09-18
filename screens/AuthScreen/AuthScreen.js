import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  LayoutAnimation,
  UIManager,
  Platform,
  Image,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Linking,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Colors from '../../utils/Colors';
import { UserContext } from '../../context/UserContext';
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin';

const { height: screenHeight } = Dimensions.get('window');

const GoogleLogin = async () => {
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  return userInfo;
};

const AuthScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [loadingGuest, setLoadingGuest] = useState(false);
  const [loginWithEmail, setLoginWithEmail] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { loginUser } = useContext(UserContext); // UserContext where user info is stored
  const [error, setError] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '860231324596-4ps00mvkffvbmujg5529tk3vh8ui0sch.apps.googleusercontent.com',
      offlineAccess: true,
      scopes: ['profile', 'email'],
    });
  }, []);

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: '860231324596-4ps00mvkffvbmujg5529tk3vh8ui0sch.apps.googleusercontent.com',
  //     androidClientId: '860231324596-p0ttra5hk0ppfn7jc0ekd28udj93ej3u.apps.googleusercontent.com',
  //     iosClientId: '860231324596-skv0o0lab05o3l783t9o1phs48sbunti.apps.googleusercontent.com',
  //     scopes: ['profile', 'email'],
  //   });
  // }, []);

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo)
      
      // Store the signed-in user in UserContext
      loginUser({
        name: userInfo.user.name,
        email: userInfo.user.email,
        id: userInfo.user.id,
        photo: userInfo.user.photo,
        role: 'Customer',
        token: userInfo.idToken,
      });

      Toast.show({
        type: 'success',
        text1: 'Logged in successfully!',
      });

      // Navigate to home screen or any other screen
      navigation.navigate('HomeTab');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setError('Sign in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setError('Sign in is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setError('Google Play services not available');
      } else {
        setError('Something went wrong');
      }
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'Something went wrong. Please try again.',
      });
    }
  };

  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const handleSubmit = () => {
    if (loginWithEmail) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailPattern.test(email)) {
        Toast.show({
          type: 'error',
          text1: 'Invalid Email',
          text2: 'Please enter a valid email address.',
        });
        return;
      }
    } else {
      if (!phoneNumber || phoneNumber.length !== 10) {
        Toast.show({
          type: 'error',
          text1: 'Invalid Phone Number',
          text2: 'Please enter a valid 10-digit phone number.',
        });
        return;
      }
    }
    navigation.navigate('OTP', { email, phoneNumber, loginWithEmail });
  };

  const handleGuestLogin = () => {
    setLoadingGuest(true);
    const dummyGuestData = {
      token: '',
      name: 'Guest User',
      email: 'guestuser@example.com',
      id: 'guestuser',
      role: 'Customer',
    };
    loginUser(dummyGuestData); // Store guest user in context
    setLoadingGuest(false);
    setTimeout(() => {
      navigation.navigate('HomeTab');
    }, 1000);
  };

  const toggleLoginMethod = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setToggling(true);
    setTimeout(() => {
      setLoginWithEmail(!loginWithEmail);
      setToggling(false);
    }, 500);
  };

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          {toggling ? (
            <ActivityIndicator size="large" color="#503A73" />
          ) : (
            <>
              <View style={styles.topSection}>
                <Pressable
                  style={styles.guestButton}
                  onPress={handleGuestLogin}
                  disabled={loadingGuest}>
                  {loadingGuest ? (
                    <ActivityIndicator color="#503A73" />
                  ) : (
                    <Text style={styles.linkTextGuest}>Skip</Text>
                  )}
                </Pressable>
                <View style={styles.logoImageContainer}>
                  <Image
                    source={require('../../assets/images/Chef-Logo-2.png')}
                    style={styles.logoImageContainerImg}
                    resizeMode="contain"
                  />
                </View>
              </View>
              <View style={styles.bottomSection}>
                <Text style={styles.title}>Content Heading #2</Text>

                {!loginWithEmail ? (
                  <View style={styles.phoneContainer}>
                    <View style={styles.flagContainer}>
                      <Image
                        source={{
                          uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png',
                        }}
                        style={styles.flag}
                      />
                      <Text style={styles.countryCode}>+91</Text>
                    </View>
                    <TextInput
                      style={styles.phoneNumberInput}
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChangeText={text => {
                        const cleaned = text.replace(/[^0-9]/g, '');
                        setPhoneNumber(cleaned);
                      }}
                      keyboardType="phone-pad"
                      maxLength={10}
                    />
                  </View>
                ) : (
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                  />
                )}

                <Pressable
                  style={styles.button}
                  onPress={handleSubmit}
                  disabled={loading}>
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Login/Register</Text>
                  )}
                </Pressable>

                <View style={styles.separatorContainer}>
                  <View style={styles.separator} />
                  <Text style={styles.separatorText}>Or continue with</Text>
                  <View style={styles.separator} />
                </View>

                <View style={styles.socialButtonsContainer}>
                  <Pressable
                    style={[styles.socialButton, styles.googleButton]}
                    onPress={toggleLoginMethod}>
                    {loginWithEmail ? (
                      <Image
                        source={require('../../assets/images/call.png')}
                        style={styles.googleIcon}
                      />
                    ) : (
                      <Image
                        source={require('../../assets/images/mail-50x50.png')}
                        style={styles.googleIcon}
                      />
                    )}
                  </Pressable>
                  <Pressable
                    style={[styles.socialButton, styles.googleButton]}
                    onPress={handleGoogleLogin}
                    >
                    <Image
                      source={require('../../assets/images/Google-50x50.png')}
                      style={styles.googleIcon}
                    />
                  </Pressable>
                  <Pressable
                    style={[styles.socialButton, styles.appleButton]}
                    >
                    <Image
                      source={require('../../assets/images/Apple-logo.png')}
                      style={styles.googleIcon}
                    />
                  </Pressable>
                </View>

                <Text style={styles.termsText}>
                  By logging in you agree to our{' '}
                  <Text
                    style={styles.link}
                    onPress={() =>
                      Linking.openURL(
                        'https://chefhavn.com/terms-and-conditions',
                      )
                    }>
                    terms
                  </Text>{' '}
                  and{' '}
                  <Text
                    style={styles.link}
                    onPress={() =>
                      Linking.openURL('https://chefhavn.com/privacy-policy')
                    }>
                    privacy policy
                  </Text>
                  .
                </Text>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  topSection: {
    width: '100%',
    height: screenHeight * 0.4,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  guestButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    fontWeight: 'bold',
    zIndex: 1,
  },
  linkTextGuest: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
    paddingTop: 3,
    paddingBottom: 3,
    paddingHorizontal: 12,
    borderRadius: 17,
    fontFamily: 'Montserrat-Regular',
  },
  logoImageContainer: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
    backgroundColor: '#503a73',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImageContainerImg: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
  bottomSection: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  title: {
    fontSize: 16,
    color: '#111',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
    color: Colors.BLACK,
    fontFamily: 'Montserrat-Regular',
  },
  phoneNumberInput: {
    height: 50,
    color: Colors.BLACK,
    fontSize: 16,
    // letterSpacing: 1,
    flex: 1,
    fontFamily: 'Montserrat-SemiBold',
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 13,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    // fontWeight: "bold",
    padding: 6,
    fontFamily: 'Montserrat-SemiBold',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#111',
    fontFamily: 'Montserrat-Regular',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  emailPhoneButton: {
    backgroundColor: '#6a4d99',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#6a4d99',
    borderRadius: 50,
  },
  appleButton: {
    backgroundColor: '#000',
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    height: 50,
    paddingHorizontal: 10,
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 5,
  },
  countryCode: {
    fontSize: 16,
    color: Colors.BLACK,
    // letterSpacing: 1,
    fontFamily: 'Montserrat-SemiBold',
  },
  termsText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#111',
    fontFamily: 'Montserrat-Regular',
  },
  link: {
    color: '#503A73',
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat-Regular',
  },
});

export default AuthScreen;
