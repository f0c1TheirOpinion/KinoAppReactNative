import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Linking,
} from 'react-native';



import {
  DrawerItemList
  
} from '@react-navigation/drawer';
import GlobalStyles from '../GlobalStyles';


const CustomMenu = (props, {navigation}) => {


  return (
    <SafeAreaView style={[GlobalStyles.droidSafeArea, {backgroundColor:'#080224', }]}>
        <View style={{ flexDirection: 'row', marginLeft: '5%',  paddingTop: '5%',}}>
                <Text style={styles.headerText}>КИНО</Text>
                <Text style={{color:'#e91e63', fontSize: 28, fontWeight: 'bold' }}>КАЙФ</Text>
                </View>
        <DrawerItemList {...props} 
        labelStyle={{fontSize: 18,
        }}
        />
        <View style={{width:'100%', bottom:20, position:'absolute', justifyContent:'center', alignItems:'center'}}>
        <Text style={{color:'#fff', fontSize:17,}}>Контакты:</Text>
          <Text style={{color:'#fff', textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#fff", fontSize:16,}} onPress={() => Linking.openURL('http://t.me/thekinokaif')}>t.me/thekinokaif</Text>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    headerText: {
        fontWeight: 'bold',
        fontSize: 28,
        color: '#fff',
        letterSpacing: 1,
    }
});

export default CustomMenu;
