import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {View, Text, ImageBackground, ScrollView, StyleSheet, StatusBar} from 'react-native'
import WebView from 'react-native-webview';
import { useKeepAwake } from 'expo-keep-awake';

import { BarIndicator } from 'react-native-indicators';

import { useScreenOrientation } from '@use-expo/screen-orientation';
import * as ScreenOrientation from 'expo-screen-orientation';

 


 function Pleer(props, {navigation}) {
  let counterForLoading = 0;
  useKeepAwake();
    const [infKino, setInfKino] = useState([]);
    const [infKinoActors, setInfKinoActors] = useState('');
    const [infKinoRJ, setInfKinoRJ] = useState('');
    const [linkPleer, setLinkPleer] = useState('');
    const [isLoading, setIsLoading] = useState(0);
    
   
    const { Orientation } = ScreenOrientation
  const [orientation] = useScreenOrientation();
 
      
    


    useEffect(() => {
        setIsLoading(0);
        let getInfoKino = [];
      
        axios
          .get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${props.route.params.filmId}?append_to_response=RATING`,
                 {headers: {
                   'X-API-KEY': '28205e94-58cc-4655-96df-b2b5d0e377b8'
                 }} )
    
          .then((response) => {
                let forGenres = JSON.stringify(response.data.data.genres);
                let replaceMode = forGenres.replace(/genre/g, ',');
                let replaceModeX2 =  replaceMode.replace (/[^a-zа-я0-9]+/g, ', ');
                let forSliceFilmLength = JSON.stringify(response.data.data.filmLength).replace(/['"]+/g, '') 
                let sliceH = forSliceFilmLength.slice(1, -3)
                let sliceM = forSliceFilmLength.slice(-2, 5)
                let getFilmsId = JSON.stringify(response.data.data.filmId);
                let getName = JSON.stringify(response.data.data.nameRu).replace(/['"]+/g, '')
                let getYear = JSON.stringify(response.data.data.year).replace(/['"]+/g, '')
                let getRatingKn = JSON.stringify(response.data.rating.rating).replace(/['"]+/g, '') 
                let getRatingImdb = JSON.stringify(response.data.rating.ratingImdb).replace(/['"]+/g, '') 
                let getMinKino =  (Number(sliceH) * 60) + Number(sliceM);
                
               
                let getCountry = JSON.stringify(response.data.data.countries[0].country).replace(/['"]+/g, '')
                let getDescription = JSON.stringify(response.data.data.description).replace(/['"]+/g, '').replace(/\\n/g, '')

                let getPosterURL = JSON.stringify(response.data.data.posterUrl).replace(/['"]+/g, '')
                let getGenres = replaceModeX2.slice(2,-2);
                let getType = JSON.stringify(response.data.data.type).replace(/['"]+/g, '')

                getInfoKino = [getName, getYear, getPosterURL, getGenres, getRatingKn, getRatingImdb, getMinKino,
                               getCountry, getDescription, getType, getFilmsId ];
              
                setInfKino(getInfoKino);
                getStaffKino(getFilmsId, getType)
                getLinkPleer(getFilmsId)
                counterForLoading++;
                setIsLoading(counterForLoading);
           
          })
          .catch(function (error) {
            // handle error
            console.log(error.message);
          })
          .finally(function () {
            
            console.log('Finally called');
          });
       
    }, [props.route.params.filmId] )
    console.log(infKino);

    const getStaffKino = (filmId, typeKino) => {
        console.log('typeKino', typeKino)
        let actr = [];
        let rjc = [];
        let cntActr = 0;
        let cntRjc = 0;
        axios
        .get(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${filmId}`,
               {headers: {
                 'X-API-KEY': '28205e94-58cc-4655-96df-b2b5d0e377b8'
               }} )
  
        .then((response) => {
            let iEv;
            typeKino == 'TV_SHOW' ? iEv = 50 : iEv = 20
            
            console.log(iEv);

           for(let i = 0; i < iEv; i++){
            let getNameStaff = JSON.stringify(response.data[i].nameRu).replace(/['"]+/g, '')
            let getProffStaff = JSON.stringify(response.data[i].professionText).replace(/['"]+/g, '') 
            if(getProffStaff.indexOf('Режиссеры') >= 0){
               
                cntRjc++;
                if(cntRjc <= 4){
                rjc[i] = [getNameStaff]
                }
            }else if(getProffStaff.indexOf('Актеры') >= 0){
               ;
                cntActr++;
                if(cntActr <= 10){
                actr[i] = [getNameStaff];
                }
            }
            
           }

           let filteredActr = actr.filter(function(el) { return el; });
            let filteredRjc = rjc.filter(function(el) { return el; });
           
          setInfKinoActors(filteredActr.join(', '));
          setInfKinoRJ(filteredRjc.join(', '));
        
          counterForLoading++;
          setIsLoading(counterForLoading);
           
         
        })
        .catch(function (error) {
        
          counterForLoading++;
          setIsLoading(counterForLoading);
        })
        .finally(function () {
          
          console.log('Finally called');
        });
    }

   const getLinkPleer = (filmId) => {
    axios
    .get(`https://bazon.cc/api/search?token=156138140e9e997d600961ff7c1c043e&kp=${filmId}`,)

    .then((response) => {
      let getLink = JSON.stringify(response.data.results[0].link).replace(/['"]+/g, '')
      setLinkPleer(getLink)
     
      counterForLoading++;
      setIsLoading(counterForLoading);
        
   
       
     
    })
    .catch(function (error) {
      setLinkPleer('')
      counterForLoading++;
      setIsLoading(counterForLoading);
    })
    .finally(function () {
      
      console.log('Finally called');
    });

   }

   let trans = [];
   for(let m = 0; m <= 99; m++){
    trans.push(m);
   }
let strTrans = trans.join(',')
    const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `
    
   console.log('isLoading',isLoading);
if(isLoading <= 2){
     return(
    <View style={{backgroundColor:'#040114', height:'100%', flex:1,}}>
    <BarIndicator color='#e91e63' size={50} /> 
    </View>)
 }
    return (
     
     
        <ImageBackground
        source={{uri: infKino[2]}}
        style={{flex: 1,    }}
        >
          
           <ScrollView 
  style={{backgroundColor:'rgba(18,6,64,0.85)',
  position:'absolute',
  left:0,
  right:0,
  top:0,
  bottom:0,
  }} >
       
            {Orientation[orientation?.orientation] != 'PORTRAIT_UP' ? (<StatusBar hidden />) : (<StatusBar
       
       style="light"
       animated={true}
       backgroundColor="#000000"
       translucent={true}
        />) }

          
      

            <View style={{backgroundColor:'rgba(0,0,0,0.60)', height:280, paddingTop:5,   }}>
              {linkPleer == '' ? (<Text style={{color:'#fff', fontSize:16, padding:'23%'}}>В данный момент в плеере нет этого контента, надеемся, что он появится.</Text>) : (
              <>
              <WebView
               
          scalesPageToFit={true}
          javaScriptEnabled={true}
          scrollEnabled={false}
          allowsFullscreenVideo={true}
          sharedCookiesEnabled={true}
          thirdPartyCookiesEnabled={true}
          useWebKit={true}
          incognito={false}
          StatusBar={false}
          userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36"
          mediaPlaybackRequiresUserAction={true}

    injectedJavaScript={INJECTEDJAVASCRIPT}
                
     style={{  flex:1, backgroundColor:'#050114', height:200, width:'100%',  zIndex:9999,  }}

        source={{ html: `
        
        <iframe src='${linkPleer}' trans='${strTrans}' showinfo="0" autohide="1"  frameborder="0" scrolling="no" allowfullscreen="1" referrerpolicy="origin" width="100%" height="540"></iframe>`
         }}
      /></>)}      
            
            </View>
            <View style={{justifyContent:'center', alignItems:'center',backgroundColor:'#080224'}} >
          <Text style={{color:'#fff', padding:10, fontWeight:'bold', fontSize:17.5, }}>Смотреть онлайн</Text>
        </View>
            <View style={{backgroundColor:'rgba(5, 1, 4,0.75)',  padding:10, }}>
            <Text style={{color:'#fff', fontSize:22, backgroundColor: 
                '#080224', width:59, padding:3, borderRadius:5, fontWeight:'bold'  }}>{infKino[1]}</Text>
                <Text style={{color:'#fff', fontSize: 24, width:350, fontWeight:'bold', }}>{infKino[0]}</Text>
                <Text style={{color:'#fff', fontSize:15, marginTop:5,}}>{infKino[3]} ○ {infKino[7]}</Text>


                </View>
               
                <View style={{backgroundColor:'rgba(5, 1, 4,0.70)',   width:'100%', flex:3, padding:10,   }}>
                <View style={{flexDirection: 'row',
                    justifyContent: 'space-between', }}>
                    <Text style={{color:'#fff'}}>Актеры: </Text>
                    <Text style={{color:'#fff', width:'60%'}}>{infKinoActors}</Text>
            
            </View>
            <View style={{flexDirection: 'row',
                    justifyContent: 'space-between', marginTop:10,}}>
                    <Text style={{color:'#fff'}}>Режиссеры: </Text>
                    <Text style={{color:'#fff', width:'60%'}}>{infKinoRJ}</Text>
            
            </View>
            <View style={{flexDirection: 'row',
                    justifyContent: 'space-between', marginTop:10,}}>
                        
                        {infKino[9] == 'FILM' ? (<Text style={{color:'#fff'}}>Время: </Text>) 
                        : (<Text style={{color:'#fff'}}>~Время серии: </Text>)}
                    {isNaN(infKino[6]) == true ? (<Text style={{color:'#fff', width:'60%'}}>Неизвестно</Text>) : (<Text style={{color:'#fff', width:'60%'}}>{infKino[6]} мин.</Text>)}
                    
            
            </View>
            <View style={{flexDirection: 'column',
                    justifyContent: 'space-between', marginTop:20, }}>
                        
                        <Text style={{color:'#fff', fontSize:16, marginBottom:5,}}>СЮЖЕТ:</Text>
                    {infKino[8] == "null" ? (<Text style={{color:'#e91e63', width:'98%', fontSize:15.5,  lineHeight:23,}}>На постпродакшене</Text>):
                    (<Text style={{color:'#fff', width:'98%', fontSize:14.5, lineHeight:23,}}>{infKino[8]}</Text>)}
                    
            
            </View>

            <View style={{flexDirection: 'row',
                    justifyContent: 'space-around', marginTop:20, }}>
                      {infKino[4] != 0 ? ( <View style={{flexDirection:'row'}}>
                          <Text style={styles.rating}>Рейтинг КП</Text>
                          {infKino[4] >= 7 ? (<Text style={styles.ratingNMR}>{infKino[4]}</Text>) : (<Text style={styles.ratingFall}>{infKino[4]}</Text>)}
                        </View>) : (null)}

                        {infKino[5] != 0 ? (<View style={{flexDirection:'row'}}>
                        <Text style={styles.rating}>Рейтинг IMDB</Text>
                        {infKino[5] >= 7 ? (<Text style={styles.ratingNMR}>{infKino[5]}</Text>) : (<Text style={styles.ratingFall}>{infKino[5]}</Text>)}
                        
                        </View>) : (null)}
                       
                       
            
            
            </View>
            
            <View style={{marginTop:20, marginBottom:'7%', justifyContent:'center', alignItems:'center', }}>
            <View style={{justifyContent:'center', alignItems:'center', }}>
              <Text style={styles.txtBlock}>В плеере присутствует реклама, пользуясь нашим приложением, вы помогаете сделать наш сервис в будущем без нее.</Text>
            </View>
            </View>
            </View>
          
            </ScrollView>
        </ImageBackground>
    
        
      
            
        
    )
        
        
      }
       
      

const styles = StyleSheet.create({
  rating:{
  color:'#fff',
  fontSize:17,
  marginTop:4,
 
  },
  ratingNMR:{
    color:'#fff',
    padding: 4,
    fontSize:17,
    fontWeight:'bold',
    marginLeft:7,
    borderColor:'#2d9141',
    borderWidth:1.8,
    borderRadius:32,
    width: 37,
    textAlign:'center',
  },
  ratingFall:{
    color:'#fff',
    padding: 4,
    fontSize:17,
    fontWeight:'bold',
    marginLeft:7,
    borderColor:'orange',
    borderWidth:1.8,
    borderRadius:32,
    width: 37,
    textAlign:'center',
  },
txtBlock:{
  color:'#fff', justifyContent:'center', alignItems:'center',
  backgroundColor:'#080224',
  borderRadius:7,
  paddingLeft:12,
  padding: 5,
  fontSize:16,
 
}
  })

export default Pleer