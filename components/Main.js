import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './main/Home';
import Header from './Header'
import Films from './main/Films'
import CustomMenu from './CustomMenu';
import SearchKino from './main/SearchKino';
import Pleer from './main/Pleer';
import Serials from './main/Serials';
import Mult from './main/Mult';





const Drawer = createDrawerNavigator(
  
);
const Stack = createStackNavigator(
  

);



export class Main extends Component {
  constructor(props){
    super(props);
  }


  homeStack({ navigation }){
 
    return(
      <Stack.Navigator initialRouteName="Home" 
    
      >
        
        <Stack.Screen 
        name="Home"
        component={Home}
        options={{ headerShown: false,     
        }}
        />
        <Stack.Screen 
        name="Search"
        component={SearchKino}
        options={{ headerShown: false,

        }}/>
      
         

      </Stack.Navigator>
    )
  }
  
  FilmsStack({ navigation }){
    return(
      <Stack.Navigator initialRouteName="Films"
      >
        
        <Stack.Screen 
        name="Films"
        component={Films}
        options={{ headerShown: false,

        }}   
         
  
        />
        


      </Stack.Navigator>
    )
  }

  SearchStack({ navigation }){
    return(
      <Stack.Navigator initialRouteName="Search"
      
      >
        
        <Stack.Screen 
        name="Search"
        component={SearchKino}
        options={{ headerShown: false,
          backgroundColor:'black',
          overlayColor:'black',
        }}
       
        />
        
      </Stack.Navigator>
    )
  }


  SerialsStack({ navigation }){
    return(
      <Stack.Navigator initialRouteName="Serials"
      
      >
        
        <Stack.Screen 
        name="Serials"
        component={Serials}
        options={{ headerShown: false,
          backgroundColor:'black',
          overlayColor:'black',
        }}
       
        />
        
      </Stack.Navigator>
    )
  }


  MultStack({ navigation }){
    return(
      <Stack.Navigator initialRouteName="Mult"
      
      >
        
        <Stack.Screen 
        name="Mult"
        component={Mult}
        options={{ headerShown: false,
          backgroundColor:'black',
          overlayColor:'black',
        }}
       
        />
        
      </Stack.Navigator>
    )
  }

  



 PleerStack({ navigation }){
    return(
      <Stack.Navigator initialRouteName="Pleer"
      
      >
        
        <Stack.Screen 
        name="Pleer"
        component={Pleer}
       
        options={{ headerShown: false,
          backgroundColor:'black',
          overlayColor:'black',
          
        }}
        
        />
        
      </Stack.Navigator>
    )
  }


    render() {
        return (
           
          <NavigationContainer
          >
      <Drawer.Navigator 
      overlayColor='black'
      drawerStyle={{
        backgroundColor: 'black'
      }}
      drawerContent={(props) => <CustomMenu {...props} />}
      screenOptions={({ navigation, route }) => ({
        headerShown: true,
        fontSize:26,
        
        header: () => <Header navigation={navigation} />,
      })}
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        inactiveTintColor:"#fff",
        backgroundColor:'#080224',

      }}
      
      
     
      >
        <Drawer.Screen name="Главная" component={this.homeStack}
           
        />
         <Drawer.Screen name="Фильмы" component={this.FilmsStack}

        />

        <Drawer.Screen name="Сериалы" component={this.SerialsStack}

         />
         <Drawer.Screen name="Мультфильмы" component={this.MultStack}

          />

           <Drawer.Screen name="Поиск" component={this.SearchStack}
            />
             


            <Drawer.Screen name="Pleers" component={this.PleerStack}
             options={{
              drawerLabel: () => null,
              title: null,
              drawerIcon: () => null
          }}
            />
            

      </Drawer.Navigator>
     
      </NavigationContainer>
     
        )
    }
}

export default Main
