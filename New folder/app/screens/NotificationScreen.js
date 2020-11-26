import React, { useState ,useEffect} from "react";
import { FlatList, StyleSheet,Alert,Text, View } from "react-native";
import firebase from "../config/firebaseConfig";

import Screen from "../components/Screen";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";



function NotificationScreen(props) {
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
  
    const msger = [];
    firebase
      .firestore()
      .collection('Timers')
      .get()
      .then((docSnapshot) => {
        
        docSnapshot.forEach((doc) => {
          console.log(doc.data());
          msger.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        console.log(msger);
        setMessages(msger);
      
      });
     }, []);
  

  const handleDelete = (message) => {
    // Delete the message from messages
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  return (
    <Screen style = {styles.background}>
      <View >
        
      <FlatList style = {styles.background}
        data={messages}
     //  keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          
          <ListItem style = {styles.background}
            title='Notification'
           subTitle={item.msg}
                      image={item.image}
            onPress={() => console.log("Message selected", item)}
        
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
           
          />
        )}
        
  //       ItemSeparatorComponent={ListItemSeparator}
  //       refreshing={refreshing}
  //       onRefresh={() => {
  //         setMessages([ {
  //   id: 1,
  //   title: "Notification 1",
  //   description: "Dr. Hasan uploaded the quiz",
    
  // },
  // ]);
  //      }
  //    }
      />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor:'#465881'

  },
});

export default NotificationScreen;