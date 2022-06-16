import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { View } from 'react-native';

import Main from './components/Main'







export class App extends Component {
  constructor(props){
    super(props);
  }
  render(){
  return (
      <View style={{flex:1}}>
      
        <Main />
        
      <StatusBar
       
            style="light"
            animated={true}
            backgroundColor="#000000"
            translucent={true}
             />
     
    </View>
   
  );
}
}

export default App
