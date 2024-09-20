import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Colors from '../../utils/Colors';
import {UserContext} from '../../context/UserContext';
import {updateUserProfile} from '../../services/api';

const EditProfile = ({navigation}) => {
  const {user, updateUser} = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Prefill the form fields with user data when available
  useEffect(() => {
    if (user) {
      const {name, email, phone} = user;
      setName(name || '');
      setEmail(email || '');
      setPhone(phone || '');
      setInitialValues({name, email, phone});
    }
  }, [user]);

  const handleSaveChanges = async () => {
    console.log(user)
    try {
      if (user && user.id) {
        const userData = {name, email, phone};
        const response = await updateUserProfile(user.id, userData);

        if (response) {
          // Update the context with the new user data
          await updateUser({name, email, phone});
          Alert.alert('Success', 'Profile updated successfully.');
        }
      } else {
        Alert.alert('Error', 'User ID not found.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'An error occurred while updating the profile.');
    }
  };

  // Check if there are changes compared to initial values
  const isSaveButtonEnabled =
    name !== initialValues.name ||
    email !== initialValues.email ||
    phone !== initialValues.phone;

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
        <Text style={styles.screenTitle}>Edit Profile</Text>
      </View>
      <View style={styles.content}>
        <Image
          source={require('../../assets/836.png')}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.changePhotoButton}>
          <Text style={styles.changePhotoText}>Change photo</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          placeholderTextColor={Colors.BLACK}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          placeholderTextColor={Colors.BLACK}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          value={phone}
          placeholderTextColor={Colors.BLACK}
          onChangeText={setPhone}
        />
        <TouchableOpacity
          style={[
            styles.saveButton,
            {backgroundColor: isSaveButtonEnabled ? Colors.PRIMARY : '#ccc'},
          ]}
          onPress={handleSaveChanges}
          disabled={!isSaveButtonEnabled}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.WHITE,
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  screenTitle: {
    flex: 1,
    fontSize: 20,
    textAlign: 'left',
    color: Colors.BLACK,
    fontFamily: 'Montserrat-SemiBold',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changePhotoButton: {
    marginBottom: 20,
  },
  changePhotoText: {
    color: Colors.PRIMARY,
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    marginBottom: 15,
    fontFamily: 'Montserrat-Regular',
    color: Colors.BLACK,
  },
  saveButton: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  saveButtonText: {
    fontSize: 18,
    color: Colors.WHITE,
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default EditProfile;
