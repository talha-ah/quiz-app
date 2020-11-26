// import React, { Component, useRef  } from 'react';
// import { Image } from 'react-native';
// import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon } from 'native-base';
// const cards = [
//   {
//     text: 'Card One',
//     name: 'One',
//     image: require('./img/swiper-1.png'),
//   },
// ];
// export default function DeckSwiperAdvancedExample () {
//   const _deckSwiper = useRef();
//     return (
//       <Container>
//         <Header />
//         <View>
//           <DeckSwiper
//             ref={_deckSwiper}
//             dataSource={cards}
//             renderEmpty={() =>
//               <View style={{ alignSelf: "center" }}>
//                 <Text>Over</Text>
//               </View>
//             }
//             renderItem={item =>
//               <Card style={{ elevation: 3 }}>
//                 <CardItem>
//                   <Left>
//                     <Thumbnail source={item.image} />
//                     <Body>
//                       <Text>{item.text}</Text>
//                       <Text note>NativeBase</Text>
//                     </Body>
//                   </Left>
//                 </CardItem>
//                 <CardItem cardBody>
//                   <Image style={{ height: 300, flex: 1 }} source={item.image} />
//                 </CardItem>
//                 <CardItem>
//                   <Icon name="heart" style={{ color: '#ED4A6A' }} />
//                   <Text>{item.name}</Text>
//                 </CardItem>
//               </Card>
//             }
//           />
//         </View>
//         <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 50, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
//           <Button iconLeft onPress={() => _deckSwiper._root.swipeLeft()}>
//             <Icon name="arrow-back" />
//             <Text>Swipe Left</Text>
//           </Button>
//           <Button iconRight onPress={() => _deckSwiper._root.swipeRight()}>
//             <Icon name="arrow-forward" />
//             <Text>Swipe Right</Text>
//           </Button>
//         </View>
//       </Container>
//     );
  
// }








import CountDown from 'react-native-countdown-component';

import {Text,View,ScrollView,StyleSheet, Alert,FlatList,TouchableOpacity} from "react-native";
import Screen from "../components/Screen";
import RadioForm from 'react-native-simple-radio-button';

import React ,{useState,useEffect}from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body
} from "native-base";


import firebase from "../config/firebaseConfig";
const TakeQuizScreen = props => {
  // var radio_props = [{label:'Operating System', value:0}, {label:'Organizing System', value:1}]

   const [question, setQuestion] = useState([])
   const [decision, setDecision] = useState(0)
   useEffect(() => {
  
     const Viewer = [];
     firebase
       .firestore()
       .collection('QuestionMcqs')
      
      .get()
       .then((docSnapshot) => {
         
         docSnapshot.forEach((doc) => {
           console.log(doc.data());
           //if(doc.quizclass == "bcs")
           Viewer.push({
             ...doc.data(),
             key: doc.id,
           });
         });
         console.log(Viewer);
         setQuestion(Viewer);
       
       });
      }, []);
  
      
  
  return (
    <ScrollView>
      <Container style={styles.container}>
        <Content style={styles.container}>
    <FlatList
    data={question}
    renderItem={({ item }) => (
      <View>
      <View
        style={{
          backgroundColor: "#465881",
          height: 40,
          width: "90%",
          borderWidth: 1,
          borderColor: "white",
          borderRadius: 15,
          padding: 10,
          marginVertical: 10
        }}
      >
      <TouchableOpacity>
      <Text>Question: {item.Question} </Text>
      

      </TouchableOpacity>
      </View>
      <View style={styles.box1}> 
      <Text> {item.Option1} </Text>
      </View>
      <View style={styles.box2}> 
      <Text> {item.Option2} </Text>
      </View>
      <View style={styles.box2}> 
      <Text> {item.Option3} </Text>
      </View>
      <View style={styles.box2}> 
      <Text> {item.Option4} </Text>
      </View>
      
      </View>

      
    
  
  )}

/>
  
      
 <CountDown
        until={60 * .5 +10}
        size={30}
        onFinish={() =>  props.navigation.navigate("StudentPortal")}
        digitStyle={{backgroundColor: '#FFF'}}
        digitTxtStyle={{color: '#1CC625'}}
        timeToShow={['M', 'S']}
        timeLabels={{m: 'MM', s: 'SS'}}
      />
     
    
    </Content>
    </Container>
  </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#465881"
  },
  box: {
    width: "100%",
    padding: 10
  },
  radio: {
    alignSelf: "center"
  },
  view:{

flex:1,
justifyContent:'space-around'
  },
  text: {
    height: 100,
    width: "100%",
    fontSize: 18,
    color: "white",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 15,
    marginTop: 10,
    paddingHorizontal: 10
  },
  text1: {
    height: 100,
    width: "50%",
    fontSize: 18,
    color: "white",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 50
  },
  screen: {
    flex: 1,
    marginBottom: 30,
    marginTop: 150
  },

  btn: {
    marginTop: 20,
    width: "70%",
    padding: "20%",
    alignSelf: "flex-end",
    borderRadius: 10
  },
  box1: {
    
    borderRadius: 10,
    width: "100%",
    
    
  },
  box2: {
    
    alignSelf: "flex-end",
    borderRadius: 10,
    width: "100%"
  },
  box3: {
    
    alignSelf: "baseline",
    borderRadius: 10,
    width: "40%"
  },
  box4: {
    marginTop: -99,
    alignSelf: "flex-end",
    borderRadius: 10,
    width: "40%"
  },

  backbtn: {
    marginTop: 50,
    width: "70%",
    padding: "20%"
  }
});

export default TakeQuizScreen;
 // <CountDown
      //   until={60 * 10 + 30}
      //   size={30}
      //   onFinish={() => alert('Finished')}
      //   digitStyle={{backgroundColor: '#FFF'}}
      //   digitTxtStyle={{color: '#1CC625'}}
      //   timeToShow={['M', 'S']}
      //   timeLabels={{m: 'MM', s: 'SS'}}
      // />
     
      
    // </Screen>

    // <Screen style={styles.container}>
     
    //   <View >
  
    //   <Text> Question:What is full form of OS ? </Text>
    //   <View style={styles.btn}>
         
    //   <RadioForm
    //       radio_props={radio_props}
    //       initial={0}
    //       formHorizontal={true}
    //       labelHorizontal={true}
    //       buttonSize={20}
    //       buttonOuterSize={30}
    //       buttonColor={'tomato'}
    //       selectedButtonColor={'tomato'}
    //       labelStyle={{ left: -5 }}

    //       onPress={(id) => {
    //         console.log(id)
    //          decision=id
    //         }}
    //     />
        
    //   </View>
    //  </View>
     
