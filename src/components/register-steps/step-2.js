import { View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useState, useRef } from "react";
import { Picker } from "@react-native-picker/picker";

import inputTextStyle from "../../styles/input-text.style";

const Step2 = ({ nextStep, previousStep, registerStep, barangays }) => {
  const initialFormInput = {
    contactNo: null,
    address: null,
    barangayID: 0,
    city: null,
    postalCode: null,
  };

  const [formInput, setFormInput] = useState(initialFormInput);

  const contactNoRef = useRef();
  const addressRef = useRef();
  const barangayIDRef = useRef();
  const cityRef = useRef();
  const postalCodeRef = useRef();

  const handleChangeInput = (name, value) => {
    setFormInput({ ...formInput, [name]: value });
  };

  const handleNext = () => {
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
          label="Contact No. (+63)"
          value={formInput.contactNo}
          onChangeText={(value) => handleChangeInput("contactNo", value)}
          mode="outlined"
          maxLength={10}
          returnKeyType="next"
          ref={contactNoRef}
          onSubmitEditing={() => addressRef.current.focus()}
          keyboardType="numeric"
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          label="Address"
          value={formInput.address}
          onChangeText={(value) => handleChangeInput("address", value)}
          mode="outlined"
          maxLength={100}
          ref={addressRef}
          multiline={true}
          numberOfLines={4}
        />
      </View>
      <View style={inputTextStyle.outer}>
        <Text style={{ marginHorizontal: 10 }}>Barangay</Text>
        <Picker
          selectedValue={formInput.barangayID}
          onValueChange={(itemValue, itemIndex) =>
            handleChangeInput("barangayID", itemValue)
          }
          ref={barangayIDRef}
        >
          <Picker.Item key={0} label="Default" value={0} />
          {barangays?.map((element, index) => (
            <Picker.Item key={index} label={element.name} value={element.id} />
          ))}
        </Picker>
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          label="City"
          value={formInput.city}
          onChangeText={(value) => handleChangeInput("city", value)}
          mode="outlined"
          maxLength={50}
          returnKeyType="next"
          ref={cityRef}
          onSubmitEditing={() => postalCodeRef.current.focus()}
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          label="Postal Code"
          value={formInput.postalCode}
          onChangeText={(value) => handleChangeInput("postalCode", value)}
          mode="outlined"
          maxLength={4}
          ref={postalCodeRef}
          keyboardType="numeric"
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          marginVertical: 20,
        }}
      >
        <View style={{ marginHorizontal: 10 }}>
          <Button onPress={handlePrevious} mode="contained">
            Previous
          </Button>
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <Button onPress={handleNext} mode="contained">
            Next
          </Button>
        </View>
      </View>
    </>
  );
};

export default Step2;
