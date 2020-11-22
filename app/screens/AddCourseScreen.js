import React, { useState,useEffect,Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { StyleSheet,Text,ScrollView, View,Alert,FlatList, TouchableOpacity, RefreshControl,} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import Screen from "../components/Screen";
import navigation from "@react-navigation/native";
import AppButton from "../components/AppButton";
import Constants from 'expo-constants';
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

import firebase from "../config/firebaseConfig";



const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

function AddCourseScreen(props) {
  state = {
    tableHead: [ 'Course Title', 'Credit Hrs', 'Course Code'],
    
  }
 


const firestore_ref=firebase.firestore().collection('Courses')

  const [courses, setCourses] = useState([])
  useEffect(() => {
    
    const addCourse = [];
    firebase
      .firestore()
      .collection("Courses")
    
      .get()
      .then((docSnapshot) => {
        
        docSnapshot.forEach((doc) => {
          console.log(doc.data());
          addCourse.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        console.log(addCourse);
      //  console.warn(addCourse);
        setCourses(addCourse);
      
      });
      
  }, []);
  const updater=(key)=>{props.navigation.navigate('CourseUpdateScreen',{key:key});
     }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  
  deleteCourser=(key)=> {
    console.log('coursekey_'+key)
    const db = firestore_ref.doc(key)
      db.delete().then((res) => {
          console.log('Item removed from database')
               }).catch((err)=>{Alert.alert(err)})
               
  },

  
  
  

  openTwoButtonAlert=(key)=>{  
    Alert.alert(
      'Delete Course',
      'Are you sure to delete it?',
      [
        {text: 'Yes', onPress: () => {deleteCourser(key)}},
        {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }
  
  

  return (
    
    

    <Container  style={styles.container }>
    
    <Content  style={styles.container }>
     <FlatList
     data={courses}
     renderItem={({ item }) => (
       
       <View style={{backgroundColor:'#465881',height: 90  }}>
           {/* <Table borderStyle={{borderWidth: 3, borderColor: '#c8e1ff'}}> */}
         

          <Text style= {styles.txt}>Course Title: {item.coursetitle} </Text> 
          <Text >Course Code: {item.coursecode} </Text>
       
         <Text >Credit Hrs.: {item.creditHrs} </Text>
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
         
        {/* </Table> */}
        
        
       </View>


       
     
     )}

   />
   
    

            
   <Button  style= {styles.btn}>
            <Text style={styles.text} onPress={() => props.navigation.navigate('CourseEditScreen')} >Add Course</Text>
          </Button>
      
       
      </Content>
</Container>
     );
  
    }
  
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#465881',
      },
  head: { 
       height: 20, 
        backgroundColor: '#f1f8ff' 
        
     },
     align:{
      alignSelf:'flex-end',
      marginBottom:-9
      
     },
  wrapper: {
       flexDirection: 'row' 
    },
  title: { 
      flex: 1,
       backgroundColor: '#f6f8fa'
     },
  row: { 
       height: 20 
       
     },
  text: {
       textAlign: 'center'
     },
     screen: {
        flex: 1,        
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
        color: '#fff',
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "bold",
      },
     
       screen: {
        flex: 1,
      
        marginTop: -150
      },

});
export default AddCourseScreen;