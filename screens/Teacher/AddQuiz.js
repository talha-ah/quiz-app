import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  View,
  Alert,
  Platform,
} from "react-native";
import moment from "moment";
import AppButton from "../../components/AppButton";
import firebase from "../../config/firebaseConfig";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-community/async-storage";

import {
  AppForm as Form,
  AppFormField as FormField,
} from "../../components/forms";

function AddQuiz(props) {
  const firestore_ref = firebase.firestore().collection("Quiz");

  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const [quizDate, setQuizDate] = useState("");
  const [quizTime, setQuizTime] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  function getTime(seconds) {
    var curdate = new Date(null);
    curdate.setTime(seconds * 1000);
    return curdate.toLocaleString();
  }

  useEffect(() => {
    const params = props.route.params;
    if (params) {
      setTitle(params.quizItem.quizTitle);
      setTime(params.quizItem.quizTime);
      setQuizDate(new Date(getTime(params.quizItem.quizDate.seconds)));
      setQuizTime(new Date(getTime(params.quizItem.quizDateTime.seconds)));
    }
  }, []);

  const addQuiz = async () => {
    let userData = await AsyncStorage.getItem("userData");
    let userOBJ = JSON.parse(userData);
    const dateTime = moment(quizDate)
      .hour(moment(quizTime).hour())
      .minute(moment(quizTime).minute());
    if (title === "" || time === "" || quizTime === "" || quizDate === "") {
      Alert.alert("Error", "Enter Valid details");
    } else {
      setLoading(true);
      const params = props.route.params;
      if (params) {
        firestore_ref
          .doc(params.quizItem.key)
          .update({
            quizTitle: title,
            quizTime: time,
            quizDate: new Date(dateTime),
            quizDateTime: new Date(dateTime),
          })
          .then((resData) => {
            firebase
              .firestore()
              .collection("StudentUser")
              .where("courses", "array-contains", params.quizItem.course)
              .get()
              .then(async (docSnapshot) => {
                if (docSnapshot.size > 0) {
                  docSnapshot.forEach(async (userItem) => {
                    await firebase
                      .firestore()
                      .collection("StudentUser")
                      .doc(userItem.id)
                      .update({
                        notifications: firebase.firestore.FieldValue.arrayUnion(
                          {
                            message: "Quiz was updated!",
                            quizz: params.quizItem,
                            date: new Date(),
                            status: "pending",
                          }
                        ),
                      });
                  });
                  props.navigation.goBack();
                } else {
                  props.navigation.goBack();
                }
              });
          })
          .catch((err) => {
            setLoading(false);
            alert("There was an error");
          });
      } else {
        firestore_ref
          .add({
            teacherId: userOBJ.key,
            quizTitle: title,
            quizTime: time,
            quizDate: new Date(dateTime),
            quizDateTime: new Date(dateTime),
            marks: 0,
            questions: 0,
            users: [],
          })
          .then((resData) => {
            props.navigation.goBack();
          })
          .catch((err) => {
            setLoading(false);
            alert("There was an error");
          });
      }
    }
  };
  //

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || quizDate;
    setShow(Platform.OS === "ios");
    setQuizDate(currentDate);
  };
  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || quizTime;
    setShow2(Platform.OS === "ios");
    setQuizTime(currentDate);
  };

  return (
    <ImageBackground blurRadius={1} style={styles.background}>
      <ScrollView>
        <View style={styles.container}>
          <Form
            initialValues={{
              title: "",
              time: "",
            }}
            onSubmit={(values) => console.log(values)}
          >
            <FormField
              name="quizTitle"
              placeholder="Quiz Title"
              onChangeText={(text) => setTitle(text)}
              value={title}
            />
            <FormField
              name="time"
              keyboardType="numeric"
              placeholder="Quiz Time Allowed (in minutes)"
              onChangeText={(text) => setTime(text)}
              value={time}
            />
            <AppButton
              title={
                quizDate !== ""
                  ? moment(quizDate).format("YYYY-MM-DD")
                  : "Set Quiz Date"
              }
              onPress={() => setShow(true)}
            />
            <AppButton
              title={
                quizTime !== ""
                  ? moment(quizTime).format("HH:mm")
                  : "Set Quiz Time"
              }
              onPress={() => setShow2(true)}
            />
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={quizDate === "" ? new Date() : quizDate}
                mode={"date"}
                is24Hour={true}
                display="default"
                minimumDate={new Date()}
                onChange={onChangeDate}
              />
            )}
            {show2 && (
              <DateTimePicker
                testID="dateTimePicker2"
                value={quizTime === "" ? new Date() : quizTime}
                mode={"time"}
                is24Hour={true}
                display="default"
                onChange={onChangeTime}
              />
            )}
            <AppButton
              title={
                loading ? "Loading..." : props.route.params ? "Update" : "Add"
              }
              onPress={addQuiz}
              disabled={loading}
            />
          </Form>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#465881",
  },
});

export default AddQuiz;
