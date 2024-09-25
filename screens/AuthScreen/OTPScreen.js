import React, {useState, useRef, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Colors from '../../utils/Colors';
import {sendOtp, login} from '../../services/api';
import {UserContext} from '../../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTPScreen = ({route, navigation}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(true); // Initial loading state
  const [resendTimer, setResendTimer] = useState(30); // Set initial timer to 30 seconds
  const [resendDisabled, setResendDisabled] = useState(true); // Initially disabled
  const inputRefs = useRef([]);
  const [selectedInput, setSelectedInput] = useState(null);
  const {loginUser} = useContext(UserContext);
  const {email, phoneNumber, loginWithEmail} = route.params;
  const [sentOtp, setSentOtp] = useState(null);

  // Fetch OTP on mount
  useEffect(() => {
    const fetchOtp = async () => {
      try {
        const response = await sendOtp(email, phoneNumber, loginWithEmail);
        setSentOtp(response.otp);
        setLoading(false);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to send OTP. Please try again.',
        });
        setLoading(false);
      }
    };
    fetchOtp();
  }, [email, phoneNumber, loginWithEmail]);

  // Resend timer countdown
  useEffect(() => {
    if (resendDisabled && resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer); // Clear interval on unmount
    }
    if (resendTimer === 0) {
      setResendDisabled(false); // Enable resend button when timer hits 0
    }
  }, [resendDisabled, resendTimer]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value.length === 1 && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle OTP verification
  const handleOtpVerification = async () => {
    const enteredOtp = otp.join('');
    setLoading(true);
    try {
      const response = await login(email, phoneNumber, loginWithEmail);
      if (response.success) {
        const userData = {
          token: response.token,
          name: response.user.name,
          id: response.user.id,
          email: response.user.email || email,
          phone: response.user.phone,
          role: response.user.role,
        };

        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        await loginUser(userData);

        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'You have been logged in successfully!',
        });

        navigation.navigate('HomeTab');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: response.message || 'Invalid OTP',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Something went wrong, please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendCode = async () => {
    try {
      const response = await sendOtp(email, phoneNumber, loginWithEmail);
      setSentOtp(response.otp);
      Toast.show({
        type: 'success',
        text1: 'Code Sent',
        text2: `A new code has been sent to your ${
          loginWithEmail ? 'Email' : 'Phone Number'
        }`,
      });

      // Reset the timer and disable the resend button for 30 seconds
      setResendDisabled(true);
      setResendTimer(30);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to resend OTP. Please try again.',
      });
    }
  };

  // Custom loading screen with styled backdrop
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingBackdrop}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Please wait...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image
            source={require('../../assets/images/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>OTP Screen</Text>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Enter Confirmation Code</Text>
        <Text style={styles.subTitle}>
          A 4-digit code was sent to your{' '}
          {loginWithEmail ? 'Email' : 'Phone Number'}
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={[
                styles.otpInput,
                selectedInput === index && styles.selectedOtpInput,
              ]}
              value={digit}
              onChangeText={value => handleOtpChange(value, index)}
              keyboardType="numeric"
              maxLength={1}
              ref={ref => (inputRefs.current[index] = ref)}
              onFocus={() => setSelectedInput(index)}
              onBlur={() => setSelectedInput(null)}
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleResendCode} disabled={resendDisabled}>
          <Text
            style={[
              styles.resendText,
              resendDisabled && styles.disabledResendText,
            ]}>
            {resendDisabled ? `Resend Code (${resendTimer}s)` : 'Resend Code'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleOtpVerification}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 2,
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  screenTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 10,
    color: Colors.BLACK,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
    fontFamily: 'Montserrat-Bold',
  },
  subTitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 30,
    fontFamily: 'Montserrat-Regular',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 30,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 22,
    margin: 5,
    backgroundColor: '#fff',
    color: Colors.BLACK,
    fontFamily: 'Montserrat-SemiBold',
  },
  selectedOtpInput: {
    borderColor: '#503A73',
    borderWidth: 2,
  },
  resendText: {
    color: '#503A73',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat-Regular',
  },
  disabledResendText: {
    color: '#999',
  },
  button: {
    backgroundColor: '#503A73',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingBackdrop: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 10,
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
});

export default OTPScreen;
