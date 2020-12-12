import React, { useState } from "react";
import {
  Button,
  Text,
  Alert,
  TextInput,
  Image,
  StyleSheet,
  View,
  ImageBackground,
} from "react-native";
import Screen from "../../../components/Screen";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import firebase from "../../../config/firebaseConfig";

const SetTimerScreen = (props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isSTimePickerVisible, setSTimePickerVisibility] = useState(false);
  const [isETimePickerVisible, setETimePickerVisibility] = useState(false);

  const [date, setDate] = useState("");
  const [stime, setSTime] = useState("");
  const [etime, setETime] = useState("");
  const [msg, setMsg] = useState("The quiz has been uploaded");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const showSTimePicker = () => {
    setSTimePickerVisibility(true);
  };
  const hideSTimePicker = () => {
    setSTimePickerVisibility(false);
  };
  const showETimePicker = () => {
    setETimePickerVisibility(true);
  };
  const hideETimePicker = () => {
    setETimePickerVisibility(false);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const setter = () => {
    console.log("set pressed");
    setMsg("The quiz has been uploaded");
    console.log(msg);

    if (date === "" || stime === "" || etime === "") {
      //  setShowLoading(true);
      console.log("Enter Valid details");
      Alert.alert("Enter Valid details");
    } else {
      setMsg("The quiz has been uploaded");
      console.log(msg);
      const datas = firebase.firestore();
      const batch = datas.batch();
      const arr = [{ date: date, stime: stime, etime: etime, msg: msg }];

      arr.forEach((item) => {
        const collectionRef = datas.collection("Timers").doc();
        batch.set(collectionRef, item);
      });

      const result = batch.commit();

      Alert.alert("successfully time has been set!!");

      // props.navigation.navigate("ClassSelection");
    }
  };
  const handleDConfirm = (date) => {
    setDate(date);
    console.log("date is ", date);
    hideDatePicker();
    hideETimePicker();
    hideSTimePicker();
  };

  const handleETConfirm = (time) => {
    setETime(time);
    console.log("end time is ", time);
    hideDatePicker();
    hideETimePicker();
    hideSTimePicker();
  };

  const handleSTConfirm = (time) => {
    setSTime(time);
    console.log("stime is ", time);

    hideDatePicker();
    hideETimePicker();
    hideSTimePicker();
  };

  return (
    <Screen style={styles.container}>
      <View>
        <Button title=" Date Picker" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDConfirm}
          onCancel={hideDatePicker}
        />
        <Button title=" Start Time" onPress={showSTimePicker} />
        <DateTimePickerModal
          isVisible={isSTimePickerVisible}
          mode="time"
          onConfirm={handleSTConfirm}
          onCancel={hideSTimePicker}
        />
        <Button title="End Time" onPress={showETimePicker} />
        <DateTimePickerModal
          isVisible={isETimePickerVisible}
          mode="time"
          onConfirm={handleETConfirm}
          onCancel={hideETimePicker}
        />

        <Button title="Set" onPress={setter}></Button>
      </View>
    </Screen>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#465881",
  },
  box: {
    width: "100%",
    padding: 10,
  },
  text: {
    height: 60,
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
  },
  screen: {
    flex: 1,
    marginBottom: 30,
    marginTop: 150,
  },
  logo: {
    width: 450,
    height: 250,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    width: "70%",
    padding: "20%",
    alignSelf: "flex-end",
    borderRadius: 10,
  },
  backbtn: {
    marginTop: 50,
    width: "70%",
    padding: "20%",
  },
});
export default SetTimerScreen;
