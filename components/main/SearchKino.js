import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native'
import { Searchbar } from 'react-native-paper'

export default function SearchKino(props) {
    const [search, setSearch] = useState('');
    const [searchList, setSearchList] = useState([]);
    console.log(search);


    const searchFilterFunction = (text) => {
        if (text) {
          setSearch(text);
        }else{
            setSearch('');
        }
    }
    useEffect(() => {
        let getListSearch = [];
        let optionFilm;
      axios
          .get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(search)}&page=1`,
                 {headers: {
                   'X-API-KEY': '28205e94-58cc-4655-96df-b2b5d0e377b8'
                 }} )
    
          .then((response) => {
            for(let i = 0; i <= 19; i++) {
                
                let forGenres = JSON.stringify(response.data.films[i].genres);
                let replaceMode = forGenres.replace(/genre/g, ',');
                let replaceModeX2 =  replaceMode.replace (/[^a-zа-я0-9]+/g, ', ');
                let getFilmsId = JSON.stringify(response.data.films[i].filmId);
                let getName = JSON.stringify(response.data.films[i].nameRu).replace(/['"]+/g, '')
                let getYear = JSON.stringify(response.data.films[i].year).replace(/['"]+/g, '')
                let getRating = JSON.stringify(response.data.films[i].rating).replace(/['"]+/g, '')
                let getPosterURL = JSON.stringify(response.data.films[i].posterUrlPreview).replace(/['"]+/g, '')
                let getGenres = replaceModeX2.slice(2,-2);
                let getType = JSON.stringify(response.data.films[i].type).replace(/['"]+/g, '')

                if(getGenres.indexOf('мультфильм,') >= 0 && getGenres.indexOf('аниме') <= -1 ) {
                    optionFilm = "Мультфильм"
                   }else if(getGenres.indexOf('аниме') >= 0){
                    optionFilm = "Аниме"
                   }else if(getType.indexOf('TV_SERIES') >= 0){
                    optionFilm = "Сериал"
                   }
                   else{
                    optionFilm = "Фильм"
                   }

                getListSearch[i] = [getName, getYear, getRating, getPosterURL, getGenres, optionFilm, getFilmsId ];
            
            }
            console.log(getListSearch);
            let filtered = getListSearch.filter(function (el) {
                return el != null;
              });
              if(getListSearch !== undefined){
              setSearchList(filtered);
              }
          })
          .catch(function (error) {
            // handle error
            console.log(error.message);
          })
          .finally(function () {
            
            console.log('Finally called');
          });
      
       
    }, [search]);

    
       
  

    console.log(searchList);
    return (
        
        <View style={{flex: 1, backgroundColor:'#040114'}}>
            <Text style={{fontSize: 24, color:'#fff', margin:10, fontWeight: 'bold', letterSpacing: 0.5}}>Поиск </Text>
            <Searchbar 
            style={{fontSize:9, height:40,}}
            lightTheme
              fontColor="#fff"
              iconColor='#040114'
              onChangeText={(text) => searchFilterFunction(text)}

              shadowColor="#282828"
                fontSize={17}
              placeholder="Фильмы, сериалы, мультфильмы"
              value={search}
            />

        <View style={styles.containerGallery}>
        <FlatList 
               
               keyExtractor={(item, index) => 'key'+index}

                numColumns={2}
                horizontal={false}
                data={searchList}
                renderItem={({item}) => (
                  <TouchableOpacity style = {styles.containerFilms}  onPress={() => props.navigation.navigate('Pleers', {
                    screen: 'Pleer',
                    params: { filmId: item[6] }
            })}>
                    <View style = {styles.containerFilms}>
                        <View style={styles.contFilms}></View>
                    <Image 
                    style = {styles.image}
                    source={{uri: item[3]}}
                    />
                    <View style={styles.itemRating}>
          {item[2] > 7 ? (
            <Text style={ styles.goodRating}>{item[2]}</Text>
          ) : (<Text style={ styles.fallRating}>{item[2]}</Text>)}
        </View>
        <View style={styles.typeKino}>
            <Text style={styles.nameTypeKino}>{item[5]}</Text>
        </View>
                    <Text numberOfLines={1} style={styles.nameFilm}>{item[0]}</Text>
                    <Text numberOfLines={1} style={styles.GenrsFilm}>{item[1]} ○ {item[4]}</Text>
                    </View>
                    </TouchableOpacity>
                )
                
                
            }
            
            />
             
               
        </View>
         
        </View>
    )
}

const styles = StyleSheet.create({
        containerGallery:{
        marginTop:20,
        marginBottom: 102,
        },
        containerFilms: {
        flex: 1/2,
        marginLeft: 5,
        marginBottom:3,
       },
       contFilms: {
           marginTop: '6%',
       },
       image: {
        marginRight: 5,
        opacity: 0.7,
       flex: 1,
       aspectRatio: 3/4,
       },
       nameFilm:{
           color:'#fff',
           fontSize: 13,
            fontWeight:'700'    
           
       },
       GenrsFilm:{
        color:'#fff',
        fontSize: 13,
          
       },
       itemRating:{
position: 'absolute',
       },
       goodRating:{
        right: 2,
        color:'#fff',
         top:"12%",
         backgroundColor:'#2d9141', 
        padding:2, 
        borderRadius:1, 
        fontWeight:'700', 
       },
       fallRating:{
           right: 2,
        color:'#fff',
        top:'12%',
        backgroundColor:'orange', 
       padding:2, 
       borderRadius:1, 
       fontWeight:'700',
       },
       typeKino:{
        position: 'absolute',
        
        },
        nameTypeKino:{
          right: 2,
          top:32,
        color:'#fff',
        fontSize: 13.3,
        fontWeight: 'bold',
        backgroundColor: '#008fcc',
        letterSpacing:0.5,
        padding: 1.5,
        borderRadius: 1,
        },
       
});
