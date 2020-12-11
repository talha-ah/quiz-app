import { Container, Content, Text, Input } from "native-base";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import firebase from "../../config/firebaseConfig";
function QuizSelect(props) {
  const firestore_ref = firebase.firestore().collection("Class");

  const [classed, setClassed] = useState([]);
  const [isClassesLoaded, setIsClassesLoaded] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [quizTitle, setQuizTitle] = useState("");

  useEffect(() => {
    const addClasser = [];
    firebase
      .firestore()
      .collection("Class")
      .orderBy("batchs", "desc")
      .get()
      .then((docSnapshot) => {
        docSnapshot.forEach((doc) => {
          console.log(doc.data());
          addClasser.push({
            ...doc.data(),
            key: doc.id,
          });
        });

        setClassed(addClasser);
        console.log(classed);
        setIsClassesLoaded(true);
      });
  }, []);
  const onNext = () => {
    console.log("Next has preseed");
    if (selectedClass === "" || quizTitle === "") {
      console.log("Enter Valid details");
      Alert.alert("Enter Valid details");
    } else {
      const datas = firebase.firestore();
      const batch = datas.batch();
      const array = [
        {
          quizTitle: quizTitle,
          selectedClass: selectedClass,
        },
      ];
      array.forEach((item) => {
        const collectionRef = datas.collection("Quizes").doc();
        batch.set(collectionRef, item);
        //setClassAsync(item)
      });
      const result = batch.commit();
      props.navigation.navigate("SetTimerScreen");
    }
  };

  return (
    <Container style={styles.container}>
      <Content>
        <Input
          placeholder="Quiz Title"
          placeholderTextColor="white"
          onChangeText={(text) => setQuizTitle(text)}
          value={quizTitle}
          style={{
            height: 50,
            width: "100%",
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "white",
            color: "white",
          }}
        ></Input>
        <View style={{ height: 10 }}></View>
        <Text style={{ marginBottom: 30, fontWeight: "bold", color: "red" }}>
          Selected Class: {selectedClass}
        </Text>
        <FlatList
          data={classed}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#465881",
                height: 90,
                width: "100%",
                borderWidth: 1,
                borderColor: "white",
                borderRadius: 15,
                padding: 10,
                marginVertical: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => setSelectedClass(item.programme)}
              >
                <Text style={{ color: "white" }}>Batch: {item.batchs} </Text>

                <Text style={{ color: "white" }}>
                  Programme: {item.programme}{" "}
                </Text>

                <Text style={{ color: "white" }}>Section: {item.section} </Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <View
          style={{
            top: 20,
            width: "70%",
            height: 40,
            alignSelf: "center",
            backgroundColor: "#fc5c65",
            borderRadius: 10,
          }}
        >
          <Text style={styles.loginText} onPress={onNext}>
            Next
          </Text>
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#465881",
    padding: 10,
    alignItems: "center",
  },
  align: {
    alignSelf: "flex-end",
    marginBottom: -9,
  },
  screen: {
    flex: 1,
    marginBottom: 30,
    marginTop: 150,
  },
  loginText: {
    textAlignVertical: "center",
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },

  btn: {
    backgroundColor: "#fc5c65",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
    marginVertical: 50,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
export default QuizSelect;

// import React, { Component } from "react";
// import { Container,Button, Header, Content, Icon, Picker, Form,StyleSheet,Input,Item } from "native-base";
// import { TextInput } from "react-native-gesture-handler";

// export default class PickerPlaceholderExample extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selected: undefined
//     };
//   }
//   onValueChange(value) {
//     this.setState({
//       selected: value
//     });
//   }
//   render() {
//     return (
//         <Container  style={{backgroundColor:'#465881'}}>

//         <Content  style={{backgroundColor:'#465881'}}>

//           <Form>
//           {/* <Item>

//             <Input
//   placeholderTextColor="#bfc6ea"
//   placeholder="Quiz Title"

//             />

//           </Item> */}

//             <Picker
//               mode="dropdown"
//               iosIcon={<Icon name="arrow-down" />}
//               placeholder="Select your Course"
//               placeholderStyle={{ color: "#bfc6ea" }}
//               placeholderIconColor="#007aff"
//               style={{ marginTop:20,  height: 50,
//                 width :"50%",
//               borderWidth: 1,
//               borderColor: "black" }}
//               selectedValue={this.state.selected}
//               onValueChange={this.onValueChange.bind(this)}
//             >
//               <Picker.Item label="IMT" value="key0" />
//               <Picker.Item label="OS" value="key1" />
//               <Picker.Item label="PakStd" value="key2" />

//             </Picker>
//             {/* <Button style= {{ marginTop: 20,
//       width: '70%',
//       padding: "20%",
//       alignSelf: "flex-end",

//       borderRadius: 10}}
//         title="Create Quiz"
//         onPress={() => navigation.navigate('AddQuestionScreen')}
//       /> */}
//           </Form>
//         </Content>
//       </Container>
//     );
//   }
// }
