import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 5,
    left: '35%',
    padding: SIZES.small,
    flexDirection: "row",
    alignItems: 'center',
  },
  createOrderBtn: {
    width: 100,
    height: 60,
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center"
  },
  createOrderBtnImage: {
    width: "80%",
    height: "80%",
    tintColor: COLORS.white,
  },

});

export default styles;
