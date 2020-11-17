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

  
  
  /*updateCourser = (key,Courses, {coursecode,coursetitle,creditHrs}) => {
    const db = firestore_ref.doc(key)
    db.ref(`/${Courses}/${key}`)
  .update(data)
  .then(() => console.log('Data updated.'));
  }*/


  // updateCourser('z78asdasldjl', 'Class', {coursecode:'ABC', credithour:})
    // updater=(key)=>{props.navigation.navigate('CourseUpdateScreen',key);
 // }

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
    
       
    <ScrollView
    contentContainerStyle={styles.scrollView}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
  >
     <FlatList
     data={courses}
     renderItem={({ item }) => (
       <ScrollView>
       <View style={{backgroundColor:'#465881',height: 90  }}>
           <Table borderStyle={{borderWidth: 1, borderColor: '#c8e1ff'}}>
         

          <Text style= {styles.txt}>Course Title: {item.coursetitle} </Text> 
          <Text >Course Code: {item.coursecode} </Text>
       
         <Text >Credit Hrs.: {item.creditHrs} </Text>
         <TouchableOpacity onPress={() => updater(item.key)}>
          <Text style={styles.align }>Update </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openTwoButtonAlert(item.key)}>
         <Text style={styles.align}>Delete </Text>
         </TouchableOpacity>

         
        </Table>
        
        
       </View>

       </ScrollView>
     
     )}

   />
    
{/* <View style={{backgroundColor:'#465881',  alignItems: 'center'}} >
<Left>
<Button
              danger
              transparent
              style={{ marginBottom: 20, marginLeft: 10 }}
              onPress={
                      openTwoButtonAlert
                              } 

            >
                   <Icon active name="trash" />
            </Button>
            </Left> */}
            
  <AppButton style={styles.btn}
          title="Add Course"
          onPress={() =>
          
            props.navigation.navigate("CourseEditScreen")
          //   getCourses

            }

        />
      
       
   </ScrollView>
     );
  
    }
  



 




 
    // return (
    //     <Screen style={styles.container}>
    //          <View style={styles.screen}>
     
      
    // </View>
     
     
    //   <View style={styles.container}>
    //     <Table borderStyle={{borderWidth: 1}}>
    //       <Row data={state.tableHead} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text}/>
    //       <TableWrapper style={styles.wrapper}>
    //         <Col data={state.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
           
    //        <Rows data={state.tableData} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/>
    //       </TableWrapper>
    //     </Table>
    //     <Button style={styles.btn}
    //       title="Add Course"
    //       onPress={() =>
          
    //         props.navigation.navigate("CourseEditScreen")
    //       //   getCourses

    //         }

    //     />
      
     
        
        

      
      

  
    // )
  

 
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
        marginTop: 20,
        width: '70%',
        padding: "20%",
        alignSelf: "flex-end",
        borderRadius: 10
    
      },
       screen: {
        flex: 1,
      
        marginTop: -150
      },

});
export default AddCourseScreen;