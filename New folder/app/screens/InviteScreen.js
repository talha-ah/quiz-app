import React, { useState,useEffect,Component } from 'react';

import { ScrollView,StyleSheet,TouchableOpacity, View, Alert,FlatList,Text} from 'react-native';

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  
} from "native-base";

import AppButton from "../components/AppButton";
import firebase from "../config/firebaseConfig";
import { color } from 'react-native-reanimated';

function InviteScreen(props) {
  state = {
    tableHead: [ 'Student Id', 'Name', 'Email'],
    
  }


const firestore_ref=firebase.firestore().collection('InviteStudents')

  const [student, setStudent] = useState([])
  useEffect(() => {
    //load hospitals into hospitalsList
    const addStudent = [];
    firebase
      .firestore()
      .collection("InviteStudents")
    
      .get()
      .then((docSnapshot) => {
        
        docSnapshot.forEach((doc) => {
          console.log(doc.data());
          addStudent.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        console.log(addStudent);
        setStudent(addStudent);
      
      });
      
  }, []);
  const updater=(key)=>{props.navigation.navigate('StudentUpdateScreen',{key:key});
}
const deleteClasser=(key)=> {
  console.log('classkey_'+key)
  const db = firestore_ref.doc(key)
    db.delete().then((res) => {
        console.log('Item removed from database')
             }).catch((err)=>{Alert.alert(err)})
             
},

openTwoButtonAlert=(key)=>{  
  Alert.alert(
    'Delete Class',
    'Are you sure to delete it?',
    [
      {text: 'Yes', onPress: () => {deleteClasser(key)}},
      {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
    ],
    { 
      cancelable: true 
    }
  );
}
  
    return (
        
      <ScrollView>
      <Container style={styles.container}>
        <Content style={styles.container}>
      
      <FlatList
      data={student}
      renderItem={({ item }) => (
        <ScrollView>
        <View
          style={{
            backgroundColor: "#465881",
            height: 90,
            width: "100%",
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 15,
            padding: 10,
            marginVertical: 10
          }}
        >
 
 <TouchableOpacity>
                    <Text
                      style={{ color: "white" }}
                      
                    >
                      Student Name: {item.StudentName}{" "}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text
                      style={{ color: "white" }}
                      
                    >
                      Registration Number:  {item.RegNumber}{" "}
                    </Text>
                  </TouchableOpacity>
           
                  <TouchableOpacity>
                    <Text
                      style={{ color: "white" }}
                      
                    >
                      Email:  {item.Email}{" "}
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      bottom: 30
                    }}
                  >
 
 <TouchableOpacity
                      style={{}}
                      onPress={() => updater(item.key)}
                    >
                      <Text style={styles.align}>Update </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => openTwoButtonAlert(item.key)}
                    >
                      <Button
                        danger
                        transparent
                        style={{}}
                        onPress={() => openTwoButtonAlert(item.key)}
                      >
                        <Icon active name="trash" />
                      </Button>
                    </TouchableOpacity>
                  </View>
                
                </View>
              </ScrollView>
      
      )}
 
    />
      <Button style={styles.btn}>
            <Text
              style={styles.text}
              onPress={() => props.navigation.navigate("AddStudentScreen")}
            >
              Add Students
            </Text>
          </Button>
         <AppButton style={styles.btn}
          title="InviteStudents"
          onPress={() =>
          
            Alert.alert("Invitation Sent")
          

            }


        />
        

      
        </Content>
      </Container>
    </ScrollView>
            
   
     );
  
    }


    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#465881",
        padding: 10
      },
      align: {
        // alignSelf: "flex-end",
        // marginBottom: -9
        color: "red"
      },
      screen: {
        flex: 1,
        marginBottom: 30,
        marginTop: 150
      },
      loginText: {
        textAlignVertical: "center",
        textAlign: "center",
        color: "blue",
        fontSize: 18
      },
    
      btn: {
        backgroundColor: "#fc5c65",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: "100%",
        marginVertical: 20
      },
      text: {
        color: "#fff",
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "bold"
      }
    });
    
export default InviteScreen;