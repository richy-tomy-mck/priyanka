import { Text, View, TextInput, SafeAreaView, Alert, TouchableOpacity } from "react-native";
import { AuthStore, appSignIn } from "../../store.js";
import { Stack, useRouter } from "expo-router";
import { useRef } from "react";
import styles from '../../styles/login'
import { COLORS } from '../../constants'

export default function LogIn() {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingBottom:'30%' }}>
    <Stack.Screen options={{ title: "login", headerLeft: () => <></>}} />
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="email"
          autoCapitalize="none"
          nativeID="email"
          onChangeText={(text) => {
            emailRef.current = text;
          }}
          style={styles.textInput}
        />
      </View>
      <View>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          nativeID="password"
          onChangeText={(text) => {
            passwordRef.current = text;
          }}
          style={styles.textInput}
        />
      </View>
      <TouchableOpacity
      style={styles.SigninButton}
        onPress={async () => {
          const resp = await appSignIn(emailRef.current, passwordRef.current);
          if (resp?.user) {
            router.replace("/home");
          } else {
            console.log(resp.error)
            Alert.alert("Login Error", resp.error?.message)
          }
        }}
      >
        <Text style={styles.ButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={styles.SigninButton}
        onPress={() => {
          AuthStore.update((s) => {
            s.isLoggedIn = true;
          });
          router.push("/create-account");
        }}
      >
        <Text style={styles.ButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

