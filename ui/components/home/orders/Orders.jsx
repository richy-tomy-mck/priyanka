// import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { AuthStore } from "../../../store"

import styles from "./orders.style";
import { icons, SIZES } from "../../../constants";



const Orders = ({ handleClick }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.createOrderBtn} onPress={handleClick}>
        <Image source={icons.plus} resizeMode="contain" style={styles.createOrderBtnImage} />
      </TouchableOpacity>
    </View>
  );
};

export default Orders;
