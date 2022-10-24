import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useState } from 'react';

import inputTextStyle from '../../styles/input-text.style';

const Step3 = ({ nextStep, previousStep, registerStep, errorStep }) => {
  const initialFormInput = {
    firstName: null,
    lastName: null,
    contactNo: null,
    emailAddress: null,
  };

  const [formInput, setFormInput] = useState(initialFormInput);

  const handleChangeInput = (name, value) => {
    setFormInput({ ...formInput, [name]: value });
  };

  const handleNext = () => {
    const { firstName, lastName, contactNo, emailAddress } = formInput;

    if (!firstName || !lastName || !contactNo || !emailAddress) {
      errorStep('Please fill out all required fields');
      return;
    }

    registerStep({
      contactPerson: {
        first_name: formInput.firstName,
        last_name: formInput.lastName,
        contact_no: formInput.contactNo,
        email_address: formInput.emailAddress,
      },
    });
    nextStep();
  };

  const handlePrevious = () => {
    previousStep();
  };

  return (
    <>
      <View style={inputTextStyle.outer}>
        <TextInput
          label='First Name'
          value={formInput.firstName}
          onChangeText={(value) => handleChangeInput('firstName', value)}
          mode='outlined'
          maxLength={50}
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          label='Last Name'
          value={formInput.lastName}
          onChangeText={(value) => handleChangeInput('lastName', value)}
          mode='outlined'
          maxLength={50}
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          label='Contact No. (+63)'
          value={formInput.contactNo}
          onChangeText={(value) => handleChangeInput('contactNo', value)}
          mode='outlined'
          maxLength={10}
          keyboardType='numeric'
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          label='Email Address'
          value={formInput.emailAddress}
          onChangeText={(value) => handleChangeInput('emailAddress', value)}
          mode='outlined'
          maxLength={100}
          autoCapitalize='none'
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginVertical: 20,
        }}
      >
        <View style={{ marginHorizontal: 10 }}>
          <Button onPress={handlePrevious} mode='contained'>
            Previous
          </Button>
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <Button onPress={handleNext} mode='contained'>
            Next
          </Button>
        </View>
      </View>
    </>
  );
};

export default Step3;
