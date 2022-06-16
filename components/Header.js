import React from 'react'
import {StyleSheet, Text, View, Pressable} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'



export default function Header({navigation}) {
    
    return (
        <View style={styles.header}>
         
            
                <Pressable style={{ flexDirection: 'row', marginLeft: '5%'}}
                            onPress={() => navigation.navigate("Главная")}>
                <Text style={styles.headerText}>КИНО</Text>
                <Text style={{color:'#e91e63', fontSize: 30, fontWeight: 'bold' }}>КАЙФ</Text>
                </Pressable>
                
                <Pressable style={{marginLeft: '23%'}}
                            onPress={() => navigation.navigate("Поиск")}>
                <MaterialCommunityIcons name="magnify" color={"#d0cce6"} size={30} />

                </Pressable>
               
                <Pressable
        onPress={() => navigation.openDrawer() }
        style={{ marginRight:'7%' }}
      >
                  <MaterialCommunityIcons name="menu" color={"#d0cce6"} size={34} />
      </Pressable>

    
        </View>
    )
}
const styles = StyleSheet.create({
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '11%',
        backgroundColor:'#080224',
        paddingTop: '5.5%',
        borderBottomColor: '#1b1633',
        borderBottomWidth: 1,
        
        
        
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#fff',
        letterSpacing: 1,
        
    }
})
