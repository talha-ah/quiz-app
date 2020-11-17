import React, { Component } from 'react';
import { View,StyleSheet,Button,Alert ,ImageBackground} from 'react-native';
import CheckboxFormX from 'react-native-checkbox-form';
import Screen from "../components/Screen";

const mockData = [
    {
        label: 'Sp17-Bcs-A',
        RNchecked: true
    },
    {
        label: 'Sp17-Bcs-B',
        RNchecked: false
    },
    {
      label: 'Sp17-Bse-A',
      RNchecked: false
    },
    {
      label: 'Sp17-Bse-B',
      RNchecked: false
   }

];

export default class ClassSelection extends Component {
    _onSelect = ( item ) => {
      console.log(item);
    };

  render() {
    return (
       
      <Screen style={styles.container}>
      <View style={styles.screen}>
        </View>

          <View style={{ marginVertical: 10, backgroundColor: "#465881"}} >
              <CheckboxFormX
                  style={{ width: 400 - 10 }}
                  dataSource={mockData}
                  itemShowKey="label"
                  itemCheckedKey="RNchecked"
                  iconSize={37}
                  formHorizontal={false}
                  formVertical={true}
                  labelHorizontal={false}
                  onChecked={(item) => this._onSelect(item)}
              />
              </View>
              <View>
              <Button style= {styles.btn}
        title="Create Quiz "
         onPress={() => this.props.navigation.navigate("AssignQuizScreen")}
           
      />
      </View>
     
         
    
     </Screen>
     
     
    );
  }
}
const styles = StyleSheet.create({

  container: {
    padding: 10,
    backgroundColor: '#465881',
  },
    
    //flex:1
  
  btn :{
    
    width: '20%',
    padding:"10%",
    alignSelf: 'center',
    borderRadius:10,

},
 
});