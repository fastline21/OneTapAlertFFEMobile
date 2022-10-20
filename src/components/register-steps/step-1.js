import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";

import inputTextStyle from "../../styles/input-text.style";

const Step1 = ({ nextStep, cancelStep, registerStep }) => {
  const initialFormInput = {
    firstName: null,
    middleInitial: null,
    lastName: null,
    username: null,
    emailAddress: null,
    password: null,
    password2: null,
  };

  const [formInput, setFormInput] = useState(initialFormInput);

  const handleChangeInput = (name, value) => {
    setFormInput({ ...formInput, [name]: value });
  };

  const handleNext = () => {
    registerStep(formInput);
    nextStep();
  };

  const handleCancel = () => {
    cancelStep();
  };

  return (
    <>
      <View style={inputTextStyle.outer}>
        <TextInput
          label="First Name"
          value={formInput.firstName}
          onChangeText={(value) => handleChangeInput("firstName", value)}
          mode="outlined"
          maxLength={50}
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          label="Middle Initial"
          value={formInput.middleInitial}
          onChangeText={(value) => handleChangeInput("middleInitial", value)}
          mode="outlined"
          maxLength={1}
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          label="Last Name"
          value={formInput.lastName}
          onChangeText={(value) => handleChangeInput("lastName", value)}
          mode="outlined"
          maxLength={50}
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          label="Username"
          value={formInput.username}
          onChangeText={(value) => handleChangeInput("username", value)}
          mode="outlined"
          maxLength={12}
          autoCapitalize="none"
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          label="Email Address"
          value={formInput.emailAddress}
          onChangeText={(value) => handleChangeInput("emailAddress", value)}
          mode="outlined"
          maxLength={100}
          autoCapitalize="none"
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          label="Password"
          value={formInput.password}
          onChangeText={(value) => handleChangeInput("password", value)}
          mode="outlined"
          maxLength={12}
          secureTextEntry={true}
          autoCapitalize="none"
        />
      </View>
      <View style={inputTextStyle.outer}>
        <TextInput
          label="Confirm Password"
          value={formInput.password2}
          onChangeText={(value) => handleChangeInput("password2", value)}
          mode="outlined"
          maxLength={12}
          secureTextEntry={true}
          autoCapitalize="none"
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
          <Button onPress={handleCancel} mode="contained">
            Cancel
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

export default Step1;
