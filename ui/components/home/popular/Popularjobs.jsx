import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { useRouter } from "expo-router";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from '../../../hook/useFetch'

const Popularjobs = () => {
  const router = useRouter();


const [ selectedOrder, setSelectedOrder ] = useState()

const handleCardPress = (item) => {
  router.push(`/order-details/${item.orderId}`)
  setSelectedOrder(item.orderId)
}


// const { data, isLoading, error } = useFetch('search', { query : 'React developer', num_pages: 1})

const isLoading = false
const error = false
const data =[]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Orders</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn} onPress={()=> router.push(`/orders/orderlist`)}>Show all</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.cardsContainer}>
          {isLoading ? (<ActivityIndicator size="large" colors={COLORS.primary}/>): error ? (
            <Text>Something went wrong</Text>
          ): (<FlatList
          data = {data}
          renderItem={({item}) => (
            <PopularJobCard
            item={item}
            handleCardPress={handleCardPress}
            />
          )}
          keyExtractor={item => item?.job_id}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          horizontal
          />)}
        </View>
      
    </View>
  );
};

export default Popularjobs;
