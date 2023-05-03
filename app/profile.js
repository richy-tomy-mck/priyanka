import { Redirect, Stack, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { AuthStore, appSignOut } from "../store";
import styles from '../styles/profile'

const Settings = () => {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ headerShown: true, title: "Profile" }} />
      <Text style={styles.userName}>
        {AuthStore.getRawState().user?.email}
      </Text>
      <Text style={styles.userName}>
        {AuthStore.getRawState().user?.displayName}
      </Text>
    <TouchableOpacity
          style={styles.SignOutButton}
          onPress={async () => {
            const resp = await appSignOut();
            if (!resp?.error) {
              router.replace("/(auth)/login");
            } else {
              console.log(resp.error);
              Alert.alert("Logout Error", resp.error?.message);
            }
          }}>
            <Text style={styles.SignOutButtonText}>
            Sign Out
            </Text>
          </TouchableOpacity>
    </View>
  );
};
export default Settings;