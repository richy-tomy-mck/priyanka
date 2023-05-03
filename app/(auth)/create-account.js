import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useRef, useState, useEffect } from "react";
import { AuthStore, appSignUp } from "../../store.js";
import { Stack, useRouter } from "expo-router";
import styles from '../../styles/create-account'

export default function CreateAccount() {
  const router = useRouter();
  const emailRef = useRef("");
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");

  const [ signupDisabled, SetSignupDisabled ] = useState(true)
  const [ password, SetPassword ] = useState("")

  useEffect(() => {
    if (password.length >= 6) {
      SetSignupDisabled(false)
    }
    else if(password.length < 6)
    {
      SetSignupDisabled(true)
    }
  }, [password]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingBottom: '70%' }}>
      <Stack.Screen
        options={{ title: "Create Account", headerLeft: () => <></> }}
      />
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="email"
          nativeID="email"
          onChangeText={(text) => {
            emailRef.current = text;
          }}
          style={styles.textInput}
        />
      </View>
      <View>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          placeholder="firstName"
          nativeID="firstName"
          onChangeText={(text) => {
            firstNameRef.current = text;
          }}
          style={styles.textInput}
        />
      </View>
      <View>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          placeholder="lastName"
          nativeID="lastName"
          onChangeText={(text) => {
            lastNameRef.current = text;
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
            SetPassword(text);
          }}
          style={styles.textInput}
        />
      </View>

      <TouchableOpacity
      disabled={signupDisabled}
      style={styles.SignupButton(signupDisabled)}
        onPress={async () => {
            const resp = await appSignUp(
              emailRef.current,
              password,
              firstNameRef.current + " " + lastNameRef.current
            );
            if (resp?.user) {
              router.replace("/home");
            } else {
              console.log(resp.error);
              Alert.alert("Sign Up Error", resp.error?.message);
            }
          }}
      >
        <Text style={styles.ButtonText}>Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={styles.CancelButton}
      onPress={() => {
        AuthStore.update((s) => {
          s.isLoggedIn = false;
        });
        router.back();
      }}
      >
        <Text style={styles.ButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}
