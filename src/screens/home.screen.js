import { View, Text } from "react-native";
import { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { REACT_APP_SERVER_URL } from "@env";

import Main from "../containers/main.screen";

import { getAllUsers } from "../stores/actions/users.action";

const HomeScreen = ({ getAllUsers }) => {
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Main>
      <View>
        <Text>Home Screen</Text>
      </View>
      <View>
        <Text>{REACT_APP_SERVER_URL}</Text>
      </View>
    </Main>
  );
};

HomeScreen.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
};

export default connect(null, {
  getAllUsers,
})(HomeScreen);
