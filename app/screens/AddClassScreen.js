import React ,{useState,useEffect}from "react";
import {  Alert, Text,Image, StyleSheet, TouchableOpacity ,View,ImageBackground,FlatList,ScrollView } from "react-native";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton"
import firebase from "../config/firebaseConfig";
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
import { Table } from 'react-native-table-component';

function AddClassScreen(props) {

  const firestore_ref=firebase.firestore().collection('Class')

  const [classed, setClassed] = useState([])

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
        console.log(addClasser);
        setClassed(addClasser);
        //console.log(addClasser);
      });
     }, []);
   
     
  const updater=(key)=>{props.navigation.navigate('ClassUpdateScreen',{key:key});
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
     <View>
    
      <FlatList
     
      data={classed}
      renderItem={({ item }) => (
        <ScrollView>
      
        <View style={{backgroundColor:'#465881',height: 90  }}>
           <Table borderStyle={{borderWidth: 1, borderColor: '#c8e1ff'}}>
           <TouchableOpacity>
          <Text onPress={() => props.navigation.navigate('InviteScreen')}>Batch: {item.batchs}  </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text onPress={() => props.navigation.navigate('InviteScreen')}>Programme: {item.programme}  </Text>
            </TouchableOpacity>
          <TouchableOpacity>
             <Text onPress={() => props.navigation.navigate('InviteScreen')}>Section: {item.section}  </Text>
             </TouchableOpacity>

          <TouchableOpacity onPress={() => updater(item.key)}>
          <Text style={styles.align }>Update </Text>
          </TouchableOpacity>

         <TouchableOpacity onPress={() => openTwoButtonAlert(item.key)}>
         <Text style={styles.align }>Delete </Text>

        </TouchableOpacity>
        </Table>
        </View>
        </ScrollView>
      
      )}

    />

{/*     
<View style={{backgroundColor:'#465881',  alignItems: 'center'}} >
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
            </Left>*/}
    <AppButton style={styles.btn} 
          title="Add Class"
          onPress={() =>
          
            props.navigation.navigate("ClassEditScreen")
          //   getCourses

            }/>
        </View>
        
        </ScrollView>
    
  );
  
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#465881',
  },
  align:{
    alignSelf:'flex-end',
    
   },
  screen: {
    flex: 1,
    marginBottom: 30,
    marginTop: 150
  },
  loginText:{
    
    textAlignVertical: "center",
    textAlign: "center",
    color:'blue',
    fontSize: 18
     
    
  },
  bttn:{
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#00BCD4',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },

  btn: {
    marginTop: 20,
    width: '70%',
    padding: "20%",
    alignSelf: "flex-end",
    borderRadius: 10

  },
 
});
export default AddClassScreen;