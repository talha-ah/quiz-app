import React, { useState } from "react";
import * as Yup from "yup";
import {
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
  View,
  Alert,
  ScrollView,
} from "react-native";

import { AppForm, AppFormField } from "../../components/forms";
import AppButton from "../../components/AppButton";
import firebase from "../../config/firebaseConfig";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter registered email")
    .email("Enter a valid email")
    .label("Email"),
});

const ForgetButtonScreen = (props) => {
  const [email, setEmail] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const reset = async () => {
    setShowLoading(true);

    await firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function (user) {
        setShowLoading(false);
        console.log("Password reset email sent successfully");

        alert("Please check your email...");
      })
      .catch((e) => {
        setShowLoading(false);
        alert(e.message);
      });
  };
  return (
    <ImageBackground blurRadius={1} style={styles.background}>
      <ScrollView>
        <View style={styles.container}>
          <AppForm
            initialValues={{ email: "" }}
            onSubmit={(values) => console.log(values)}
            // validationSchema={validationSchema}
          >
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
          </AppForm>
        </View>
        <AppButton
          title="Change Password"
          onPress={() => {
            reset();
          }}
        />
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
  background: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "#465881",
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default ForgetButtonScreen;
