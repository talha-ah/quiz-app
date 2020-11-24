import React, { useState,useEffect,Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { StyleSheet,TouchableOpacity, View, Alert,FlatList,Text} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import Screen from "../components/Screen";
import navigation from "@react-navigation/native";
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
        
      
      <View>
      <FlatList
      data={student}
      renderItem={({ item }) => (
        <View style={{backgroundColor:'#465881',height: 90  }}>
            <Table borderStyle={{borderWidth: 1, borderColor: '#c8e1ff'}}>
           
 
           
           
           <Text >Student Name: {item.StudentName} </Text>
           <Text >Registration Number: {item.RegNumber} </Text> 
          <Text >Email.: {item.Email} </Text>
 
          <TouchableOpacity onPress={() => updater(item.key)}>
          <Text style={styles.align }>Update </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openTwoButtonAlert(item.key)}>
         <Button
              danger
              transparent
              style={{  marginLeft: 350,marginBottom:30 }}
              onPress={() => openTwoButtonAlert(item.key)}
              >
              <Icon active name="trash" />
       </Button>
        </TouchableOpacity>
          
          
         </Table>
         
         
        </View>
      
      )}
 
    />
      <AppButton style={styles.btn}
          title="Add Students"
          onPress={() =>
          
            props.navigation.navigate("AddStudentScreen")
          

            }


        />
         <AppButton style={styles.btn}
          title="InviteStudents"
          onPress={() =>
          
            Alert.alert("Invitation Sent")
          

            }


        />
        

       
            
   </View>
     );
  
    }


const styles = StyleSheet.create({
  container: {
      padding: 10,
      backgroundColor: '#465881',
    },
    align:{
      alignSelf:'flex-end',
      marginBottom:-9
    },
    screen: {
      flex: 1,
      marginBottom: 30,
      marginTop: 150
    },
head: { 
     height: 30, 
      backgroundColor: '#f1f8ff' 
      
   },
wrapper: {
     flexDirection: 'row' 
  },
title: { 
    flex: 1,
     backgroundColor: '#f6f8fa'
   },
row: { 
     height: 28 
     
   },
text: {
     textAlign: 'center'
   },
  
   

});
export default InviteScreen;