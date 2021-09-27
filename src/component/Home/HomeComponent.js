import React, { useState } from "react";
import PropTypes, { string, object } from "prop-types";
import { ScrollView, Text, View, StyleSheet, RefreshControl } from "react-native";

import Screen from "../Screen.js";
import MoviesRow from "./MoviesRow";
import HomeHeader from "./HomeHeader";
import { normalize } from "../../helper/FontSize";
import { BACKGROUND, RED, white } from "../../helper/Color";

const HomeComponent = ({ onRefresh, navigation, data, subTitle, type }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  let onRefreshFC = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  };

  const RenderHeader = () => {
    return <HomeHeader navigation={navigation} type={type} />;
  };

  const RenderTitle = () => {
    const title = type === "tv" ? "TV Shows" : "Movies";
    return (
      <View>
        <Text style={Styles.screenTitle}>{title}</Text>
        <View style={Styles.titleBar} />
      </View>
    );
  };

  const RenderMovieRow = () => {
    return subTitle.map((title, index) => (
      <MoviesRow key={index} data={{ ...data[index] }.results} title={title} navigation={navigation} type={type} />
    ));
  };

  const RenderMoviesComponent = () => {
    return (
      <ScrollView
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshFC} />}
        showsVerticalScrollIndicator={false}
      >
        <RenderTitle />
        <RenderMovieRow />
      </ScrollView>
    );
  };

  return (
    <Screen>
      <View style={{ backgroundColor: BACKGROUND }}>
        <RenderHeader />
        <RenderMoviesComponent />
      </View>
    </Screen>
  );
};

export default HomeComponent;

HomeComponent.propTypes = {
  navigation: PropTypes.object,
  type: PropTypes.oneOf(["tv", "movie"]),
  data: PropTypes.arrayOf(object),
  onRefresh: PropTypes.func,
  subTitle: PropTypes.arrayOf(string),
};

const Styles = StyleSheet.create({
  screenTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: normalize(30),
    marginHorizontal: 16,
    color: white,
    // margin: 16,
    // marginBottom: 0,
  },

  titleBar: {
    width: 30,
    height: 5,
    backgroundColor: RED,
    marginTop: 2,
    marginBottom: 12,
    marginLeft: 16,
  },
});
