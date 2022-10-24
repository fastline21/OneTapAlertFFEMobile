import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

import inputTextStyle from '../../styles/input-text.style';

const Step2 = ({
  nextStep,
  previousStep,
  registerStep,
  barangays,
  errorStep,
}) => {
  const initialFormInput = {
    contactNo: null,
    address: null,
    barangayID: 1,
    city: null,
    postalCode: null,
  };

  const [formInput, setFormInput] = useState(initialFormInput);

  const handleChangeInput = (name, value) => {
    setFormInput({ ...formInput, [name]: value });
  };

  const handleNext = () => {
    const { contactNo, address, barangayID, city, postalCode } = formInput;

    if (!contactNo || !address || !barangayID || !city || !postalCode) {
      errorStep('Please fill out all required fields');
      return;
    }

    registerStep(formInput);
    nextStep();
  };

  const handlePrevious = () => {
    previousStep();
  };

  return (
    <>
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
          label='Address'
          value={formInput.address}
          onChangeText={(value) => handleChangeInput('address', value)}
          mode='outlined'
          maxLength={100}
          multiline={true}
          numberOfLines={4}
        />
      </View>
      <View style={inputTextStyle.outer}>
        <Text style={{ marginHorizontal: 10 }}>Barangay</Text>
        <Picker
          selectedValue={formInput.barangayID}
          onValueChange={(itemValue, itemIndex) =>
            handleChangeInput('barangayID', itemValue)
          }
        >
          {barangays?.map((element, index) => (
            <Picker.Item key={index} label={element.name} value={element.id} />
          ))}
        </Picker>
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          label='City'
          value={formInput.city}
          onChangeText={(value) => handleChangeInput('city', value)}
          mode='outlined'
          maxLength={50}
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          label='Postal Code'
          value={formInput.postalCode}
          onChangeText={(value) => handleChangeInput('postalCode', value)}
          mode='outlined'
          maxLength={4}
          keyboardType='numeric'
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

export default Step2;
