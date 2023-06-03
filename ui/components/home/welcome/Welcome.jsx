import { useState } from "react";
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

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

const jobTypes = [ "Orders", "Receivables" ]

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [ activeJobType, setActiveJobType ]  = useState('Orders')
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello {AuthStore.getRawState().user?.displayName},</Text>
        <Text style={styles.welcomeMessage}>Welcome to priyanka store</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="What are you looking for ?"
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image source={icons.search} resizeMode="contain" style={styles.searchBtnImage}/>
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
        data={jobTypes}
        renderItem={({item})=>(
          <TouchableOpacity
          style={styles.tab(activeJobType, item)}
          onPress={()=>{
            setActiveJobType(item)
            router.push(`/orders/${item}`)
          }}>
            <Text style={styles.tabText(activeJobType, item)}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
        contentContainerStyle={{ columnGap: SIZES.small}}
        horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
