import React, { useState } from "react";
import {
  ScrollView,
  Text,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import AppButton from "../../components/AppButton";
import firebase from "../../config/firebaseConfig";
import { AppForm, AppFormField } from "../../components/forms";

function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      setShowLoading(true);
      const flag = props.route.params.flag;
      const navigate = props.navigation.navigate;
      const firestore_ref = firebase.firestore();

      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const doc = await firestore_ref
        .collection(flag === 0 ? "TeacherUser" : "StudentUser")
        .doc(response.user.uid)
        .get();

      await AsyncStorage.setItem(
        "userData",
        JSON.stringify({ ...doc.data(), key: doc.id, flag: flag })
      );

      if (doc.exists) {
        navigate(flag === 0 ? "teacher" : "student");
      } else {
        setShowLoading(false);
        alert(`Not registered as a ${flag === 0 ? "teacher" : "student"}`);
      }
    } catch (error) {
      alert(error);
      setShowLoading(false);
    }
  };
  return (
    <ImageBackground blurRadius={1} style={styles.background}>
      <ScrollView>
        <View style={styles.container}>
          <AppForm initialValues={{ email: "", password: "", classes: "" }}>
            <AppFormField
              icon="email"
              name="email"
              autoCorrect={false}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <AppFormField
              icon="lock"
              name="password"
              value={password}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Password"
              textContentType={"password"}
              secureTextEntry={!showPassword}
              onChangeText={(text) => setPassword(text)}
              rightIcon={showPassword ? "eye-off" : "eye"}
              rightOnPress={() => setShowPassword((st) => !st)}
            />
            <AppButton
              title={showLoading ? "Loading..." : "Login"}
              onPress={handleLogin}
              disabled={showLoading}
            />
          </AppForm>
          <AppButton
            title="Forgot Password?"
            onPress={() => props.navigation.navigate("ForgetButtonScreen")}
          />
          <Text
            style={styles.loginText}
            onPress={() =>
              props.navigation.navigate(
                props.route.params.flag == 0 ? "TeacherReg" : "Register",
                {
                  flag: props.route.params.flag,
                }
              )
            }
          >
            Don't have account? Click here.
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#465881",
  },
  loginText: {
    color: "gray",
    textAlign: "center",
    textAlignVertical: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "flex-end",
  },
});

export default LoginScreen;
