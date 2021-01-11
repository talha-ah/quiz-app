import React, { useState } from "react";

import * as Yup from "yup";
import {
  ImageBackground,
  ActivityIndicator,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import Screen from "../../components/Screen";
import { AppForm, AppFormField } from "../../components/forms";

import firebase from "../../config/firebaseConfig";
import AppButton from "../../components/AppButton";
import { View } from "native-base";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  cpassword: Yup.string().required().min(4).label("Password"),
  regno: Yup.string().required().min(5).max(20).label("Registeration Number"),
  phonenumber: Yup.string().required().min(11).label("Phone Number"),
  classcode: Yup.string().required().min(2).max(10).label("Class Code"),
});

const RegisterScreen = (props) => {
  const firestore_ref = firebase.firestore();

  const [showLoading, setShowLoading] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [regno, setRegno] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [classcode, setClasscode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleSignUp = async () => {
    try {
      if (
        username === "" ||
        email === "" ||
        password === "" ||
        cpassword === "" ||
        regno === "" ||
        phonenumber === ""
      ) {
        alert("Write details ");
      } else if (password !== cpassword) {
        alert("Passwords didn't match");
      } else {
        setShowLoading(true);
        const res = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        const userdata = firestore_ref
          .collection("StudentUser")
          .doc(res.user.uid);
        await userdata.set({
          username: username,
          email: email,
          password: password,
          cpassword: cpassword,
          regno: regno,
          phonenumber: phonenumber,
          classes: [],
          courses: [],
          results: [],
          notifications: [],
        });
        setShowLoading(false);
        alert("Successfully created user!!");
        props.navigation.goBack();
      }
    } catch (er) {
      setShowLoading(false);
      alert(er.message);
    }
  };
  return (
    <ImageBackground blurRadius={1} style={styles.background}>
      <ScrollView>
        <Screen style={styles.container}>
          <AppForm
            initialValues={{
              username: "",
              email: "",
              password: "",
              cpassword: "",
              regno: "",
              phonenumber: "",
            }}
            onSubmit={(values) => console.log(values)}
            // validationSchema={validationSchema}
          >
            <AppFormField
              autoCorrect={false}
              icon="account"
              name="name"
              placeholder="UserName"
              onChangeText={(text) => setUserName(text)}
              value={username}
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder="Email"
              textContentType="emailAddress"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password"
              placeholder="Password"
              textContentType="password"
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={!showPassword}
              rightIcon={showPassword ? "eye-off" : "eye"}
              rightOnPress={() => setShowPassword((st) => !st)}
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="cpassword"
              placeholder="Confirm Password"
              textContentType="password"
              onChangeText={(text) => setCPassword(text)}
              value={cpassword}
              secureTextEntry={!showPassword2}
              rightIcon={showPassword2 ? "eye-off" : "eye"}
              rightOnPress={() => setShowPassword2((st) => !st)}
            />
            <AppFormField
              autoCorrect={false}
              icon="keyboard"
              name="registrationnumber"
              placeholder="Registration Number"
              onChangeText={(text) => setRegno(text)}
              value={regno}
            />
            <AppFormField
              autoCorrect={false}
              icon="phone"
              name="PhoneNumber"
              keyboardType="numeric"
              placeholder="Phone Number"
              onChangeText={(text) => setPhoneNumber(text)}
              value={phonenumber}
            />

            <AppButton title="Register" onPress={handleSignUp} />

            <View style={{ top: 20 }}>
              <Text
                style={styles.loginText}
                onPress={() =>
                  props.navigation.navigate("Login", {
                    flag: 0,
                  })
                }
              >
                Already Registered? Click here to login
              </Text>
            </View>
          </AppForm>
        </Screen>
        {showLoading && (
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 10,
  },
  loginText: {
    textAlignVertical: "center",
    textAlign: "center",
    color: "white",
  },
  background: {
    backgroundColor: "#465881",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "stretch",
  },
});

export default RegisterScreen;
