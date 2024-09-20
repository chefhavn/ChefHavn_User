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

const OTPScreen = ({route, navigation}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(true); // Initially true while loading OTP
  const [resendTimer, setResendTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const inputRefs = useRef([]);
  const [selectedInput, setSelectedInput] = useState(null);
  const {loginUser} = useContext(UserContext);
  const {email, phoneNumber, loginWithEmail} = route.params;
  const [sentOtp, setSentOtp] = useState(null);

  useEffect(() => {
    // Call sendOtp API when the component mounts
    const fetchOtp = async () => {
      try {
        const response = await sendOtp(email, phoneNumber, loginWithEmail);
        setSentOtp(response.otp); // Save the OTP for comparison
        setLoading(false); // OTP is now loaded
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to send OTP. Please try again.',
        });
        setLoading(false); // OTP request failed, stop loading
      }
    };

    fetchOtp();
  }, [email, phoneNumber, loginWithEmail]);

  useEffect(() => {
    if (resendDisabled && resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    if (resendTimer === 0 && resendDisabled) {
      setResendDisabled(false);
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

  const handleOtpVerification = async () => {
    const enteredOtp = otp.join('');
    setLoading(true);
    try {
      if (loginWithEmail) {
        if (enteredOtp === sentOtp) {
          // Assume login logic here
          // Simulate successful login
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

            await loginUser(userData);

            Toast.show({
              type: 'success',
              text1: 'Login Successful',
              text2: 'You have been logged in successfully!',
              visibilityTime: 1000,
              position: 'top',
              topOffset: 50,
              textStyle: {color: '#503A73'},
            });

            navigation.navigate('HomeTab');
          } else {
            Toast.show({
              type: 'error',
              text1: 'OTP Verification Failed',
              text2: response.message || 'Invalid OTP',
            });
          }
        } else {
          Toast.show({
            type: 'error',
            text1: 'OTP Verification Failed',
            text2: 'Invalid OTP',
          });
        }
      } else {
        // For phone number-based OTP
        if (enteredOtp === '1234') {
          // Assume login logic here
          // Simulate successful login
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

            await loginUser(userData);

            Toast.show({
              type: 'success',
              text1: 'Login Successful',
              text2: 'You have been logged in successfully!',
              visibilityTime: 1000,
              position: 'top',
              topOffset: 50,
              textStyle: {color: '#503A73'},
            });

            navigation.navigate('HomeTab');
          } else {
            Toast.show({
              type: 'error',
              text1: 'Login Failed',
              text2: response.message || 'Something went wrong',
            });
          }
        } else {
          Toast.show({
            type: 'error',
            text1: 'OTP Verification Failed',
            text2: 'Invalid OTP',
          });
        }
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

  const handleResendCode = async () => {
    try {
      const response = await sendOtp(email, phoneNumber, loginWithEmail);
      setSentOtp(response.otp); // Save the new OTP for comparison
      Toast.show({
        type: 'success',
        text1: 'Code Sent',
        text2: `A new code has been sent to your ${
          loginWithEmail ? 'Email' : 'Phone Number'
        }`,
      });
      setResendDisabled(true);
      setResendTimer(60);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to resend OTP. Please try again.',
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#503A73" />
        <Text style={styles.loadingText}>Loading OTP...</Text>
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
            Resend Code {resendDisabled ? `(${resendTimer}s)` : ''}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleOtpVerification}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
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
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
});

export default OTPScreen;
