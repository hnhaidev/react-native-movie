import React from "react";
import PropTypes from "prop-types";
import { View, TouchableWithoutFeedback } from "react-native";
// import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/Feather";
import { white } from "../../helper/Color";

// import MenuIcon from "../../assets/icons/open-menu.png";

const HomeHeader = ({ navigation, type }) => {
  const MenuButton = () => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.toggleDrawer()}>
        {/* <FastImage source={MenuIcon} style={{ width: 20, height: 20 }} /> */}
        <Icon name="menu" size={24} color={white} />
      </TouchableWithoutFeedback>
    );
  };

  const SearchButton = () => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Search", { type: type })}>
        <Icon name={"search"} size={20} color={white} />
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={{ margin: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <MenuButton />
      <SearchButton />
    </View>
  );
};

export default HomeHeader;

HomeHeader.propTypes = {
  navigation: PropTypes.object,
  type: PropTypes.oneOf(["tv", "movie"]),
};
