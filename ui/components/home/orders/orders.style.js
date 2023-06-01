import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    // flex: 1,

    // justifyContent: 'center',
    position: "absolute",
    bottom: 0,
    left: '40%',
    padding: SIZES.small,
    flexDirection: "row",
    alignItems: 'center',
  },
  plusBtn: {
    width: 80,
    height: 60,
    backgroundColor: COLORS.green,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center"
  },
  plusBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },

});

export default styles;
